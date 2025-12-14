import Link from 'next/link'
import { Produto } from '@/models/interfaces'

interface ProdutoDetalheProps {
  produto: Produto
}

export default function ProdutoDetalhe({ produto }: ProdutoDetalheProps) {

  // Função para obter o URL correto da imagem
  function getImageUrl(image: string): string {
    // Se já começa com http, usa diretamente (mas corrige "https//" para "https://")
    if (image.startsWith('http')) {
      return image.replace('https//', 'https://')
    }
    // Se é relativo, adiciona o domínio
    return `https://deisishop.pythonanywhere.com${image}`
  }


  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Botão voltar */}
      <Link href="/produtos">
        <button className="mb-4 text-blue-600 hover:underline">
          ← Voltar à lista
        </button>
      </Link>
      
      {/* Imagem */}
      <img 
        src={getImageUrl(produto.image)} 
        alt={produto.title} 
        className="w-32 h-32 object-contain" 
      />
      
      {/* Informações */}
      <h1 className="text-3xl font-bold mb-2">{produto.title}</h1>
      <p className="text-gray-500 mb-2">{produto.category}</p>
      <p className="text-2xl text-green-600 font-bold mb-4">{produto.price}€</p>
      
      {/* Descrição (agora mostrada!) */}
      <p className="text-gray-700 mb-4">{produto.description}</p>
      
      {/* Rating (agora mostrado!) */}
      <div className="flex items-center gap-2">
        <span className="text-yellow-500">⭐ {produto.rating.rate}</span>
        <span className="text-gray-400">({produto.rating.count} avaliações)</span>
      </div>
    </div>
  )
}