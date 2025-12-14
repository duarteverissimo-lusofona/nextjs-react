// components/ProdutoCard/ProdutoCard.tsx
import Link from 'next/link'
import { Produto } from '@/models/interfaces'

interface ProdutoCardProps {
  produto: Produto
  onAddToCart?: (produto: Produto) => void   // Opcional
  onRemoveFromCart?: () => void               // Opcional (para o carrinho)
  showAddButton?: boolean                     // Mostra botão adicionar?
  showRemoveButton?: boolean                  // Mostra botão remover?
}

export default function ProdutoCard({ 
  produto, 
  onAddToCart, 
  onRemoveFromCart,
  showAddButton = true,      // Por defeito mostra adicionar
  showRemoveButton = false   // Por defeito não mostra remover
}: ProdutoCardProps) {
  return (
    <div className="border p-4 m-2 rounded-lg">
      <img 
        src={`https://deisishop.pythonanywhere.com${produto.image}`} 
        alt={produto.title} 
        className="w-32 h-32 object-contain" 
      />
      <h2 className="font-bold">{produto.title}</h2>
      <p className="text-gray-600">{produto.category}</p>
      <p className="text-green-600 font-bold">{produto.price}€</p>
      
      <div className="flex gap-2 mt-2">
        {/* Botão adicionar (catálogo) */}
        {showAddButton && onAddToCart && (
          <button 
            onClick={() => onAddToCart(produto)}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Adicionar
          </button>
        )}
        
        {/* Botão remover (carrinho) */}
        {showRemoveButton && onRemoveFromCart && (
          <button 
            onClick={onRemoveFromCart}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Remover
          </button>
        )}
        
        {/* Link para detalhes */}
        <Link href={`/produtos/${produto.id}`}>
          <button className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded">
            +info
          </button>
        </Link>
      </div>
    </div>
  )
}