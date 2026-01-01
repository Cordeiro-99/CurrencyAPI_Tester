const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
const BASE_URL = "https://v6.exchangerate-api.com/v6";

export async function getExchangeRates(baseCurrency) {
  const response = await fetch(
    `${BASE_URL}/${API_KEY}/latest/${baseCurrency}`
  );

  if (!response.ok) {
    throw new Error("Erro ao obter taxas de câmbio");
  }

  const data = await response.json();

  if (data.result !== "success") {
    throw new Error(data["error-type"] || "Erro na API");
  }

  return data.conversion_rates;
}
