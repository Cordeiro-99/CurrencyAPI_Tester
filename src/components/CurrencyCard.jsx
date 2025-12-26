import CurrencySelect from "./CurrencySelect";
import Result from "./Result";

export default function CurrencyCard() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Currency Swap 💱</h1>
        <p className="text-gray-500 mt-1">Converte moedas em tempo real</p>
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Amount
        </label>
        <input
          type="number"
          placeholder="100.00"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Selects */}
      <div className="flex items-center justify-between gap-4">
        <CurrencySelect />
        <button className="p-3 rounded-full bg-indigo-100 hover:bg-indigo-200 transition">
          🔁
        </button>
        <CurrencySelect />
      </div>

      {/* Result */}
      <Result />

      {/* Action */}
      <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition active:scale-95">
        Swap Currencies
      </button>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400">
        Última atualização: --:--
      </div>
    </div>
  );
}
