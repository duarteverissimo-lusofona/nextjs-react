
"use client";

import React from 'react';
import Contador from '@/components/Contador/Contador';

export default function ContadorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Página do Contador</h1>
      <Contador />
    </div>
  );
}
