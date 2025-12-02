"use client";

import React, { useState, useEffect } from 'react';

interface ContadorPersonalizadoProps {
  title: string;
}

export default function ContadorPersonalizado({ title }: ContadorPersonalizadoProps) {
  const [likes, setLikes] = useState(0);
  const [mounted, setMounted] = useState(false);
  const storageKey = `likes-${title}`;

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setLikes(parseInt(stored, 10));
    }
  }, [storageKey]);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // Previne navegação se estiver dentro de um Link
    e.stopPropagation(); // Previne propagação de eventos
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(storageKey, newLikes.toString());
  };

  if (!mounted) {
    return (
      <button className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg font-medium text-sm cursor-wait">
        Carregando...
      </button>
    );
  }

  return (
    <button 
      onClick={handleLike}
      className="group flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg font-medium text-sm hover:bg-blue-50 hover:border-blue-300 transition-all active:scale-95 shadow-sm"
    >
      <span className="group-hover:scale-110 transition-transform">👍</span>
      <span>{likes} Likes</span>
    </button>
  );
}
