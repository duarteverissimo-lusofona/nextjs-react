'use client'

import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { Produto } from '@/models/interfaces'
import ProdutoDetalhe from '@/components/ProdutoDetalhe/ProdutoDetalhe'
import { Spinner } from '@/components/ui/spinner' 


export default function ProdutoPage() {
  // Obtém o 'id' do URL (ex: /produtos/5 → id = "5")
  const params = useParams()
  const id = params.id
  
  // Fetch do produto específico
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR<Produto>(
    `/api/produtos/${id}`,  // Vais precisar criar esta API route!
    fetcher
  )
  
  if (isLoading) return <Spinner />
  if (error) return <p className="text-red-500">Erro ao carregar produto</p>
  if (!data) return <p>Produto não encontrado</p>
  
  return <ProdutoDetalhe produto={data} />
}