async function getCityByCep(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            method: 'GET'
        });

        const { localidade, logradouro, bairro, erro } = await response.json();

        if (erro) {
            return false;
        }

        return {localidade, logradouro, bairro};
    } catch (error) {
        return false;
    }
}

module.exports = { getCityByCep }