// app/tecnologias/page.tsx
import Image from 'next/image';
// Importação usando o alias @ configurado pelo Next.js
import tecnologiasData from '@/app/data/tecnologias.json';

// Definição da interface (é uma boa prática usar TypeScript)
interface Tecnologia {
  title: string;
  image: string;
  description: string;
  rating: number;
}

// O componente deve estar pronto a usar o snipet rfc (React Functional Component)
export default function Tecnologias() {
  // Converte o JSON importado (que é uma string se a importação não for automática)
  // Nota: O Next.js geralmente importa .json como objeto JS automaticamente,
  // mas incluímos o JSON.parse() para seguir a instrução (o tipo é feito com <Tecnologia[]>)
  const tecnologias: Tecnologia[] = JSON.parse(JSON.stringify(tecnologiasData));
  
  // Função auxiliar para renderizar estrelas
  const renderRating = (rating: number) => {
    const totalStars = 5;
    const fullStar = '⭐'; // Ou '★'
    const emptyStar = '☆'; // Ou '☆'
    
    // Cria uma string com estrelas cheias e vazias
    return (
      <span className="text-xl">
        {fullStar.repeat(rating)}
        {emptyStar.repeat(totalStars - rating)}
      </span>
    );
  };
  
  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-600">
        Tecnologias Exploradas
      </h2>
      
      {/* Container responsivo para as cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        
        {/* Utilização do método map para criar cards dinamicamente */}
        {tecnologias.map((tec, index) => (
          
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-2xl overflow-hidden hover:shadow-blue-400 transition duration-300 ease-in-out transform hover:scale-[1.02] border-t-4 border-blue-500"
          >
            
            <div className="p-6 flex flex-col h-full">
              
              <div className="flex justify-between items-start mb-4">
                
                {/* Título da Tecnologia */}
                <h3 className="text-2xl font-semibold text-gray-900 leading-tight pr-4">
                  {tec.title}
                </h3>
                
                {/* Imagem/Logo (deve estar em /public/tecnologias/) */}
                {/* O campo image é o nome do ficheiro SVG */}
                <div className="shrink-0">
                  <Image
                    src={`/tecnologias/${tec.image}`}
                    alt={`${tec.title} Logo`}
                    width={50} // Largura obrigatória
                    height={50} // Altura obrigatória
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Descrição */}
              <p className="text-gray-600 mb-4 grow">
                {tec.description}
              </p>
              
              {/* Rating */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Avaliação / Preferência:
                </p>
                <div className="flex items-center">
                  {renderRating(tec.rating)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}