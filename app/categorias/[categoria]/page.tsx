"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/models/interfaces';
import { use } from 'react';

interface CategoriaPageProps {
  params: Promise<{
    categoria: string;
  }>;
}

export default function CategoriaPage({ params }: CategoriaPageProps) {
  const resolvedParams = use(params);
  const categoryName = decodeURIComponent(resolvedParams.categoria);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://deisishop.pythonanywhere.com/products')
      .then((res) => res.json())
      .then((data: Product[]) => {
        const filtered = data.filter(
          (p) => p.category.toLowerCase() === categoryName.toLowerCase()
        );
        setProducts(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, [categoryName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      <Link 
        href="/categorias"
        className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
      >
        ← Voltar para Categorias
      </Link>

      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center capitalize">
        {categoryName}
      </h2>

      {products.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          Nenhum produto encontrado nesta categoria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link href={`/produtos/${product.id}`} key={product.id} className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100">
                <div className="relative h-48 w-full p-4 bg-gray-50 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={150}
                    height={150}
                    className="object-contain max-h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col grow">
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-600">
                      {product.price.toFixed(2)} €
                    </span>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
