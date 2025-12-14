'use client'

import React, {useEffect, useState } from 'react'
import useSWR from 'swr'
import { Produto } from '@/models/interfaces'
import ProdutoCard from '@/components/ProdutoCard/ProdutoCard'
import { Spinner } from '@/components/ui/spinner' 

 export default function ProdutosPage() {
  
/* ================ A. Gestão de Estados ================ */
  const [produtosList, setProdutosList] = useState<string[]>([])
  // Estado para guardar o texto da pesquisa
const [search, setSearch] = useState<string>('')

// Estado para guardar os produtos filtrados
const [filteredData, setFilteredData] = useState<Produto[]>([])

// Estado para guardar a opção de ordenação
const [sortOption, setSortOption] = useState<string>('nome-asc')

// Estado para guardar os produtos no carrinho
const [cart, setCart] = useState<Produto[]>([])

// Estado para checkbox de estudante
const [isStudent, setIsStudent] = useState<boolean>(false)

// Estado para cupão de desconto
const [coupon, setCoupon] = useState<string>('')

// Estado para guardar a resposta da compra
const [buyResponse, setBuyResponse] = useState<{
  totalCost?: string
  reference?: string
  message?: string
  error?: string
} | null>(null)

/* ================ B. Fetch de Dados ================ */
  const fetcher = (url: string) => fetch(url).then(res => res.json())

  const { data, error, isLoading } = useSWR<Produto[], Error>('/api/produtos', fetcher)

/* ================ C. Transformação/Processamento de Dados ================ */

/* ================ D. Funções Utilitárias ================ */
  // Adiciona um produto ao carrinho
function addToCart(produto: Produto) {
  setCart(prevCart => [...prevCart, produto])
}
// Remove um produto do carrinho (pelo índice)
function removeFromCart(index: number) {
  setCart(prevCart => prevCart.filter((_, i) => i !== index))
}
// Calcula o total do carrinho
function getCartTotal(): number {
  return cart.reduce((sum, item) => sum + parseFloat(item.price), 0)
}

// Função para comprar os produtos
async function handleBuy() {
  // Limpa resposta anterior
  setBuyResponse(null)
  
  // Faz o pedido POST para a API
  try {
    const response = await fetch('/api/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        products: cart.map(produto => produto.id),  // Array de IDs
        student: isStudent,
        coupon: coupon,
        name: 'Duarte Veríssimo'  
      })
    })
    
    const data = await response.json()
    setBuyResponse(data)
    
    // Se a compra foi bem sucedida, limpa o carrinho
    if (!data.error) {
      setCart([])
    }
  } catch (error) {
    setBuyResponse({ error: 'Erro ao processar a compra' })
  }
}


/* ================ E. Handlers ================ */

// Função que atualiza o estado search quando o utilizador escreve
function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
  setSearch(event.target.value)
}
  
  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
  setSortOption(event.target.value)
}

/* ================ F. Efeitos ================ */

// 1. Ao carregar a página, lê o carrinho do localStorage
useEffect(() => {
  const storedCart = localStorage.getItem('cart')
  if (storedCart) {
    setCart(JSON.parse(storedCart))
  }
}, [])  // Array vazio = executa só uma vez ao montar

// 2. Sempre que o cart muda, guarda no localStorage
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart))
}, [cart])  // Executa sempre que cart muda

useEffect(() => {
  if (!data) {
    setFilteredData([])
    return
  }
  
  // 1. Primeiro filtra
  let resultado = data
  if (search !== '') {
    resultado = data.filter((produto) => 
      produto.title.toLowerCase().includes(search.toLowerCase())
    )
  }
  
  // 2. Depois ordena
  resultado = [...resultado].sort((a, b) => {
    switch (sortOption) {
      case 'nome-asc':
        return a.title.localeCompare(b.title)
      case 'nome-desc':
        return b.title.localeCompare(a.title)
      case 'preco-asc':
        return parseFloat(a.price) - parseFloat(b.price)
      case 'preco-desc':
        return parseFloat(b.price) - parseFloat(a.price)
      default:
        return 0
    }
  })
  
  setFilteredData(resultado)
  
}, [search, data, sortOption])  // ← Adiciona sortOption às dependências!


/* ================ G. Renderização ================ */
return (
  <div className="p-4 flex flex-col gap-8">
    
    {/* Secção: Catálogo de produtos */}
    <div className="w-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Produtos</h1>
      
      {/* Controlos (ordenação e pesquisa) */}
      <div className="flex gap-4 mb-4">
        <select 
          value={sortOption}
          onChange={handleSortChange}
          className="p-2 border rounded"
        >
          <option value="nome-asc">Nome (A-Z)</option>
          <option value="nome-desc">Nome (Z-A)</option>
          <option value="preco-asc">Preço (mais barato)</option>
          <option value="preco-desc">Preço (mais caro)</option>
        </select>
        
        <input 
          type="text"
          placeholder="Pesquisar produtos..."
          value={search}
          onChange={handleSearchChange}
          className="flex-1 p-2 border rounded"
        />
      </div>
      
      {isLoading && <Spinner />}
      {error && <p className="text-red-500">Erro: {error.message}</p>}
      
      {/* Grid de produtos - 4 colunas */}
      <div className="grid grid-cols-4 gap-4">
        {filteredData.map((produto) => (
          <ProdutoCard 
            key={produto.id} 
            produto={produto} 
            onAddToCart={addToCart}
            showAddButton={true}
            showRemoveButton={false}
          />
        ))}
      </div>
    </div>
    
    {/* Secção: Carrinho (no fundo) */}
    <div className="w-full bg-gray-100 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">🛒 Carrinho</h2>
      
      {/* Resposta da compra - FORA da condição! */}
      {buyResponse && (
        <div className={`mb-4 p-4 rounded ${buyResponse.error ? 'bg-red-100' : 'bg-green-100'}`}>
          {buyResponse.error ? (
            <p className="text-red-600">{buyResponse.error}</p>
          ) : (
            <>
              <p className="font-bold">{buyResponse.message}</p>
              <p>Total: {buyResponse.totalCost}€</p>
              <p>Referência: {buyResponse.reference}</p>
            </>
          )}
        </div>
      )}
      
      {cart.length === 0 ? (
        <p className="text-gray-500">O carrinho está vazio</p>
      ) : (
        <>
          {/* Grid de produtos no carrinho */}
          <div className="grid grid-cols-4 gap-4">
            {cart.map((item, index) => (
              <ProdutoCard 
                key={index} 
                produto={item} 
                onRemoveFromCart={() => removeFromCart(index)}
                showAddButton={false}
                showRemoveButton={true}
              />
            ))}
          </div>
          
          {/* Total */}
          <div className="border-t mt-4 pt-4">
            <p className="text-xl font-bold">
              Total: {getCartTotal().toFixed(2)}€
            </p>
          </div>
          
          {/* Opções de compra */}
          <div className="mt-4 space-y-3">
            {/* Checkbox Estudante */}
            <label className="flex items-center gap-2">
              <input 
                type="checkbox"
                checked={isStudent}
                onChange={(e) => setIsStudent(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Sou estudante DEISI</span>
            </label>
            
            {/* Input Cupão */}
            <input 
              type="text"
              placeholder="Código do cupão"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="p-2 border rounded w-full"
            />
            
            {/* Botão Comprar */}
            <button 
              onClick={handleBuy}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded font-bold"
            >
              Comprar
            </button>
          </div>
        </>
      )}
    </div>
    
  </div>
);
}