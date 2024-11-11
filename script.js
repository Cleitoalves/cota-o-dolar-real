const API_URL = 'https://api.exchangerate-api.com/v4/latest/';
const DEFAULT_CURRENCY = 'USD';

async function convert() {
    const value = parseFloat(document.getElementById('value').value);
    const currency = document.getElementById('currency').value;
    const resultElement = document.getElementById('result');

    if (isNaN(value) || value <= 0) {
        resultElement.textContent = "Por favor, insira um valor válido.";
        return;
    }

    try {
        const response = await fetch(`${API_URL}${DEFAULT_CURRENCY}`);
        const data = await response.json();

        const rateBRL = data.rates.BRL;
        const rateUSD = data.rates.USD;

        let convertedValue;
        if (currency === 'BRL') {
            convertedValue = value / rateBRL;
            resultElement.textContent = `R$${value} é aproximadamente $${convertedValue.toFixed(2)} USD.`;
        } else if (currency === 'USD') {
            convertedValue = value * rateBRL;
            resultElement.textContent = `$${value} é aproximadamente R$${convertedValue.toFixed(2)} BRL.`;
        }
    } catch (error) {
        resultElement.textContent = "Erro ao obter as taxas de câmbio. Tente novamente mais tarde.";
        console.error("Erro na conversão:", error);
    }
}
