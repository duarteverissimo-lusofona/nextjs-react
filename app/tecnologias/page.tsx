// app/tecnologias/page.tsx
import TecnologiaCard from '@/components/TecnologiaCard/TecnologiaCard';
import tecnologiasData from '@/app/data/tecnologias.json';

// Definição da interface (é uma boa prática usar TypeScript)
interface Tecnologia {
  title: string;
  image: string;
  description: string;
  rating: number;
}

export default function TecnologiasPage() {
  const tecnologias: Tecnologia[] = tecnologiasData;
  
  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-600">
        Tecnologias Exploradas
      </h2>
      
      {/* Container para os cards */}
      <div className="flex flex-wrap justify-center items-center">
        {tecnologias.map((tec, index) => (
          <TecnologiaCard 
            key={index}
            index={index}
            title={tec.title}
            image={tec.image}
          />
        ))}
      </div>
    </div>
  );
}