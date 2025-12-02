"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CategoriasPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://deisishop.pythonanywhere.com/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 't-shirts': return '👕';
      case 'canecas': return '☕';
      case 'meias': return '🧦';
      default: return '📦';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Categorias
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {categories.map((category) => (
          <Link href={`/categorias/${category}`} key={category} className="group">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center justify-center border border-gray-100 h-48">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {getCategoryIcon(category)}
              </div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors capitalize">
                {category}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
