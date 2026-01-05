import React, { useState, useEffect } from "react";
import { getExchangeRates } from "./services/currencyService";

export default function App() {
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("1");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const currencyNames = {
    EUR: "Euro",
    USD: "Dólar Americano",
    GBP: "Libra Esterlina",
    JPY: "Iene Japonês",
    AUD: "Dólar Australiano",
    CAD: "Dólar Canadiano",
    CHF: "Franco Suíço",
    CNY: "Yuan Chinês",
    BRL: "Real Brasileiro",
    MXN: "Peso Mexicano",
  };

  // Buscar moedas
  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const rates = await getExchangeRates("EUR");
        setCurrencies(Object.keys(rates));
      } catch {
        setError("Erro ao carregar moedas");
      }
    }

    fetchCurrencies();
  }, []);

  // Ler tema guardado
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  // Aplicar e guardar tema
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  async function convertCurrency() {
    if (!amount || Number(amount) <= 0) {
      setError("Insere um valor maior que zero");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const rates = await getExchangeRates(fromCurrency);
      const convertedValue = Number(amount) * rates[toCurrency];

      setResult(convertedValue.toFixed(2));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        min-h-screen flex items-center justify-center p-4
        bg-gradient-to-br
        from-slate-100 via-slate-200 to-slate-100
        dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
        transition-colors
      "
    >
      <div
        className="
          bg-white/90 dark:bg-slate-800/90 backdrop-blur
          shadow-2xl rounded-2xl p-6 w-full max-w-md
          flex flex-col gap-5
          text-slate-900 dark:text-slate-100
        "
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Currency API Tester
          </h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl"
            title="Alternar tema"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d*$/.test(value)) {
              setAmount(value);
            }
          }}
          className="
            border border-slate-300 dark:border-slate-600
            bg-slate-50 dark:bg-slate-700
            p-3 rounded-xl text-center
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
          placeholder="Valor"
        />

        <div className="flex items-center justify-between gap-3">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="
              border border-slate-300 dark:border-slate-600
              bg-slate-50 dark:bg-slate-700
              p-3 rounded-xl w-full text-sm truncate text-center
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}{" "}
                {currencyNames[currency] && `(${currencyNames[currency]})`}
              </option>
            ))}
          </select>

          <span className="text-xl font-bold text-slate-500 dark:text-slate-300">
            →
          </span>

          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="
              border border-slate-300 dark:border-slate-600
              bg-slate-50 dark:bg-slate-700
              p-3 rounded-xl w-full text-sm truncate text-center
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}{" "}
                {currencyNames[currency] && `(${currencyNames[currency]})`}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={convertCurrency}
          disabled={loading}
          className="
            bg-blue-600 hover:bg-blue-700
            text-white font-semibold py-3 rounded-lg
            transition disabled:opacity-50
          "
        >
          {loading ? "A converter..." : "Converter"}
        </button>

        {error && (
          <p className="text-red-600 text-center text-sm">{error}</p>
        )}

        {result && (
          <div
            className="
              bg-green-100 dark:bg-green-900
              border border-green-300 dark:border-green-700
              text-green-800 dark:text-green-200
              text-center py-3 rounded-lg font-semibold
            "
          >
            {amount} {fromCurrency} = {result} {toCurrency}
          </div>
        )}
      </div>
    </div>
  );
}
