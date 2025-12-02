"use client";

import React, { useState, useEffect } from 'react';

export default function Relogio() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    // Função para atualizar o tempo
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('pt-PT'));
    };

    // Atualiza imediatamente
    updateTime();

    // Configura o intervalo para atualizar a cada segundo
    const intervalId = setInterval(updateTime, 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  // Evita renderização no servidor (hydration mismatch)
  if (!time) return null;

  return (
    <div className="font-mono text-sm bg-gray-800 text-white px-3 py-1 rounded-md shadow-inner inline-block ml-4">
      {time}
    </div>
  );
}
