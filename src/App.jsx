import React, { useState, useEffect } from "react";
import { getExchangeRates } from "./services/currencyService";

export default function App() {
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currencies, setCurrencies] = useState([]);

  // Buscar lista de moedas quando a app carrega
  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const rates = await getExchangeRates("EUR");
        setCurrencies(Object.keys(rates));
      } catch {
  setError("Erro ao carregar moedas");}
    }

    fetchCurrencies();
  }, []);

  async function convertCurrency() {
    try {
      setLoading(true);
      setError("");

      const rates = await getExchangeRates(fromCurrency);
      const convertedValue = amount * rates[toCurrency];

      setResult(convertedValue.toFixed(2));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
<div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
<div className="bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-6 w-full max-w-md flex flex-col gap-5">

        
<h1 className="text-3xl font-extrabold text-center text-slate-900 tracking-tight">
          Currency API Tester
        </h1>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 bg-gray-50 p-3 rounded-xl 
text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

          placeholder="Valor"
        />

        <div className="flex items-center justify-between gap-3">
          {/* FROM */}
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg text-center"
>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>

          <span className="text-xl font-bold text-gray-600">→</span>

          {/* TO */}
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg text-center"


          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={convertCurrency}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "A converter..." : "Converter"}
        </button>

        {error && (
          <p className="text-red-600 text-center text-sm">{error}</p>
        )}

        {result && (
          <div className="bg-green-100 border border-green-300 text-green-800 text-center py-3 rounded-lg font-semibold">
            {amount} {fromCurrency} = {result} {toCurrency}
          </div>
        )}
      </div>
    </div>
  );
}
