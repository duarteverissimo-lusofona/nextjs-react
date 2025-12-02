"use client";

import React, { useState, useEffect } from 'react';

export default function Contador() {
  const [valor, setValor] = useState<number>(0);
  const [historico, setHistorico] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedValor = localStorage.getItem('contadorValor');
    const storedHistorico = localStorage.getItem('contadorHistorico');

    if (storedValor) {
      setValor(parseInt(storedValor, 10));
    }
    if (storedHistorico) {
      setHistorico(JSON.parse(storedHistorico));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('contadorValor', valor.toString());
      localStorage.setItem('contadorHistorico', JSON.stringify(historico));
    }
  }, [valor, historico, isLoaded]);

  const atualizarValor = (novoValor: number) => {
    if (novoValor >= 0 && novoValor <= 10) {
      setValor(novoValor);
      setHistorico((prev) => [...prev, novoValor]);
    }
  };

  const incrementar = () => atualizarValor(valor + 1);
  const decrementar = () => atualizarValor(valor - 1);
  const reset = () => atualizarValor(0);

  const getCorValor = () => {
    if (valor >= 0 && valor <= 3) return 'text-red-500';
    if (valor >= 4 && valor <= 7) return 'text-yellow-500';
    if (valor >= 8 && valor <= 10) return 'text-green-500';
    return 'text-gray-800';
  };

  if (!isLoaded) return null; // Evita hydration mismatch

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
      <h2 className="text-2xl font-bold text-gray-700">Componente Contador</h2>
      
      <div className={`text-9xl font-black transition-colors duration-300 ${getCorValor()}`}>
        {valor}
      </div>

      <div className="flex gap-4">
        <button
          onClick={decrementar}
          disabled={valor <= 0}
          className="px-6 py-3 bg-red-500 text-white rounded-lg font-bold text-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          -
        </button>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg font-bold text-xl hover:bg-gray-600 transition-all active:scale-95"
        >
          Reset
        </button>
        <button
          onClick={incrementar}
          disabled={valor >= 10}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-bold text-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          +
        </button>
      </div>

      <div className="w-full mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Histórico de Valores:</h3>
        <div className="max-h-40 overflow-y-auto bg-gray-50 rounded-lg p-4 border border-gray-200">
          {historico.length === 0 ? (
            <p className="text-gray-400 italic">Nenhum histórico ainda.</p>
          ) : (
            <ul className="flex flex-wrap gap-2 list-none">
              {historico.map((val, index) => (
                <li key={index} className="m-0 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 shadow-sm block">
                  {val}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
