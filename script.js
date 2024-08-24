document.getElementById('search-button').addEventListener('click', () => {
    const cep = document.getElementById('cep-input').value.trim();

    if (cep.length === 8 && !isNaN(cep)) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                const resultDiv = document.getElementById('result');
                if (data.erro) {
                    resultDiv.innerHTML = '<p>CEP não encontrado.</p>';
                } else {
                    resultDiv.innerHTML = `
                        <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                        <p><strong>Bairro:</strong> ${data.bairro}</p>
                        <p><strong>Cidade:</strong> ${data.localidade}</p>
                        <p><strong>Estado:</strong> ${data.uf}</p>
                    `;
                }
            })
            .catch(error => {
                console.error('Erro ao carregar dados do CEP:', error);
                document.getElementById('result').innerHTML = '<p>Erro ao buscar o CEP.</p>';
            });
    } else {
        document.getElementById('result').innerHTML = '<p>CEP inválido. Digite um CEP com 8 dígitos.</p>';
    }
});
