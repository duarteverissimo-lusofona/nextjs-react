export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await dos params (Next.js 16+)
    const { id } = await params
    
    // Template string correta com ${id}
    const res = await fetch(`https://deisishop.pythonanywhere.com/products/${id}`)
    
    if (!res.ok) {
      return new Response('Produto não encontrado', { status: 404 })
    }
    
    const data = await res.json()
    return Response.json(data)
  } catch (error) {
    return new Response(`Erro: ${error}`, { status: 500 })
  }
}