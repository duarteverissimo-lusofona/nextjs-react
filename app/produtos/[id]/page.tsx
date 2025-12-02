"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/models/interfaces';
import { use } from 'react';

interface ProdutoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProdutoPage({ params }: ProdutoPageProps) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetch('https://deisishop.pythonanywhere.com/products')
      .then((res) => res.json())
      .then((data: Product[]) => {
        const found = data.find((p) => p.id === parseInt(resolvedParams.id));
        setProduct(found || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [resolvedParams.id]);

  const handleBuy = async () => {
    if (!product) return;
    setBuying(true);
    setMessage(null);

    try {
      const response = await fetch('https://deisishop.pythonanywhere.com/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.title,
          cost: product.price
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ text: `Compra realizada com sucesso! Referência: ${result.reference || 'N/A'}`, type: 'success' });
      } else {
        setMessage({ text: 'Erro ao realizar a compra.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Erro de conexão.', type: 'error' });
    } finally {
      setBuying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Produto não encontrado</h2>
        <Link href="/produtos" className="text-blue-600 hover:underline">
          Voltar para produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <Link 
        href="/produtos"
        className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
      >
        ← Voltar para Produtos
      </Link>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 bg-gray-50 flex items-center justify-center min-h-[300px]">
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              className="object-contain max-w-full h-auto drop-shadow-lg"
            />
          </div>

          <div className="p-8 flex flex-col">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-2 capitalize">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400 text-xl">★</span>
                <span className="font-medium text-gray-700">{product.rating.rate}</span>
                <span className="text-gray-400 text-sm">({product.rating.count} avaliações)</span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 grow">
              {product.description}
            </p>

            <div className="mt-auto space-y-4">
              <div className="text-3xl font-bold text-blue-600">
                {product.price.toFixed(2)} €
              </div>

              {message && (
                <div className={`p-4 rounded-lg text-sm font-medium ${
                  message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {message.text}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleBuy}
                  disabled={buying}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                >
                  {buying ? 'Processando...' : 'Adicionar ao Carrinho'}
                </button>
                <button
                  onClick={() => window.history.back()} // Simula "Remover" (sair da vista)
                  className="px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all active:scale-95 border border-red-200"
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
