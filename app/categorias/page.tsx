'use client'

import Link from 'next/link'
import useSWR from 'swr'
import { Spinner } from '@/components/ui/spinner' 


// Interface para a categoria
interface Categoria {
  name: string
}

// Ícones para cada categoria da DEISI Shop
const categoryIcons: { [key: string]: string } = {
  "T-shirts": "👕",
  "Canecas": "☕",
  "Meias": "🧦"
}

export default function CategoriasPage() {
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR<Categoria[]>('/api/categorias', fetcher)
  
  if (isLoading) return <Spinner />
  if (error) return <p className="text-red-500">Erro ao carregar categorias</p>
  
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Categorias</h1>
      
      <div className="grid grid-cols-4 gap-4">
        {data?.map((categoria) => (
          <Link 
            key={categoria.name} 
            href={`/categorias/${encodeURIComponent(categoria.name)}`}
          >
            <div className="border p-6 rounded-lg text-center hover:bg-gray-100 cursor-pointer transition">
              <span className="text-6xl block mb-4">
                {categoryIcons[categoria.name]}
              </span>
              <h2 className="font-bold text-lg capitalize">{categoria.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}