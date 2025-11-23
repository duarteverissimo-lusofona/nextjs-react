import Caracteristica from '@/components/Caracteristica/Caracteristica';

export default function CaracteristicasPage() {
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

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-600">
        Características do React e Next.js
      </h2>
      
      <ul className="max-w-3xl mx-auto space-y-3">
        {caracteristicas.map((item, index) => (
          <Caracteristica 
            key={index}
            caracteristica={item}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
}