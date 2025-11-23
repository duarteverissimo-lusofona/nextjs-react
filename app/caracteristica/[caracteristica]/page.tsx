import Link from 'next/link';

interface CaracteristicaPageProps {
  params: {
    caracteristica: string;
  };
}

export default async function CaracteristicaPage({ params }: CaracteristicaPageProps) {
  const caracteristicas = [
    'JSX, sintaxe que mistura HTML e JS.',
    'Componentes, funções que retornam JSX.',
    'Componentes Reutilizáveis e Modulares.',
    'Roteamento Automático e APIs.',
    'Hooks: useState, useEffect e useSWR.',
    'Renderização Rápida e SEO Friendly.',
    'TypeScript Seguro e Escalável.',
    'Comunidade Ativa e Popularidade.'
  ];

  // Await params para compatibilidade com Next.js 15
  const resolvedParams = await params;
  const index = parseInt(resolvedParams.caracteristica);

  // Verificar se o índice é válido
  if (isNaN(index) || index < 0 || index >= caracteristicas.length) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Característica não encontrada
          </h2>
          <Link 
            href="/caracteristicas"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            ← Voltar para Características
          </Link>
        </div>
      </div>
    );
  }

  const caracteristica = caracteristicas[index];

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-6">
        <Link 
          href="/caracteristicas"
          className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          <span className="mr-2">←</span>
          Voltar
        </Link>
      </div>

      {/* Característica centralizada usando Tailwind e Flex */}
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="max-w-2xl w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-2xl p-12 border-2 border-blue-200">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                Característica #{index + 1}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-relaxed">
              {caracteristica}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
