export async function GET() {
  try {
    const res = await fetch('https://deisishop.pythonanywhere.com/categories/')
    
    if (!res.ok) {
      return new Response('Erro ao buscar categorias', { status: res.status })
    }
    
    const data = await res.json()
    return Response.json(data)
  } catch (error) {
    return new Response(`Erro: ${error}`, { status: 500 })
  }
}