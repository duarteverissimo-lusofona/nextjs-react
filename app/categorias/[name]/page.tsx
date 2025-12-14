'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import useSWR from 'swr'
import { Produto } from '@/models/interfaces'
import ProdutoCard from '@/components/ProdutoCard/ProdutoCard'
import { Spinner } from '@/components/ui/spinner'

export default function CategoriaProdutosPage() {
  // Obtém o nome da categoria do URL
  const params = useParams()
  const categoryName = decodeURIComponent(params.name as string)
  
  // Fetch de todos os produtos
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR<Produto[]>('/api/produtos', fetcher)
  
  // Filtra produtos pela categoria
  const filteredProducts = data?.filter(
    produto => produto.category.toLowerCase() === categoryName.toLowerCase()
  ) || []
  
  if (isLoading) return <Spinner />
  if (error) return <p className="text-red-500">Erro ao carregar produtos</p>
  
  return (
    <div className="p-4">
      {/* Botão voltar */}
      <Link href="/categorias">
        <button className="mb-4 text-blue-600 hover:underline">
          ← Voltar às categorias
        </button>
      </Link>
      
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        {categoryName}
      </h1>
      
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">Nenhum produto encontrado nesta categoria</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {filteredProducts.map((produto) => (
            <ProdutoCard 
              key={produto.id} 
              produto={produto}
              showAddButton={false}
              showRemoveButton={false}
            />
          ))}
        </div>
      )}
    </div>
  )
}