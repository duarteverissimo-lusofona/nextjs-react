import Link from 'next/link';
import TecnologiaDetailsCard from '@/components/TecnologiaDetailsCard/TecnologiaDetailsCard';

interface Tecnologia {
  title: string;
  image: string;
  description: string;
  rating: number;
}

interface TecnologiaPageProps {
  params: {
    id: string;
  };
}

// Função para carregar os dados
async function getTecnologias(): Promise<Tecnologia[]> {
  const tecnologiasData = await import('@/app/data/tecnologias.json');
  return tecnologiasData.default as Tecnologia[];
}

export default async function TecnologiaPage({ params }: TecnologiaPageProps) {
  const tecnologias = await getTecnologias();
  const resolvedParams = await params;
  const index = parseInt(resolvedParams.id);
  
  // Verificar se o índice é válido
  if (isNaN(index) || index < 0 || index >= tecnologias.length) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Tecnologia não encontrada
        </h2>
        <Link 
          href="/tecnologias"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          ← Voltar para Tecnologias
        </Link>
      </div>
    );
  }

  const tecnologia = tecnologias[index];

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-6">
        <Link 
          href="/tecnologias"
          className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          <span className="mr-2">←</span>
          Voltar
        </Link>
      </div>

      <TecnologiaDetailsCard
        title={tecnologia.title}
        image={tecnologia.image}
        description={tecnologia.description}
        rating={tecnologia.rating}
      />
    </div>
  );
}
