import Image from 'next/image';

interface TecnologiaDetailsCardProps {
  title: string;
  image: string;
  description: string;
  rating: number;
}

export default function TecnologiaDetailsCard({ 
  title, 
  image, 
  description, 
  rating 
}: TecnologiaDetailsCardProps) {
  // Função para renderizar estrelas
  const renderRating = (rating: number) => {
    const totalStars = 5;
    const fullStar = '⭐';
    const emptyStar = '☆';
    
    return (
      <span className="text-2xl">
        {fullStar.repeat(rating)}
        {emptyStar.repeat(totalStars - rating)}
      </span>
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-2xl p-8 border-2 border-blue-200">
      {/* Header com imagem e título */}
      <div className="flex items-center justify-center mb-6 pb-6 border-b-2 border-blue-200">
        <div className="mr-6">
          <Image
            src={`/tecnologias/${image}`}
            alt={`${title} Logo`}
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <h2 className="text-4xl font-bold text-gray-800">
          {title}
        </h2>
      </div>

      {/* Descrição */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Descrição:</h3>
        <p className="text-gray-600 text-lg leading-relaxed">
          {description}
        </p>
      </div>

      {/* Rating */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Avaliação / Preferência:
        </h3>
        <div className="flex items-center">
          {renderRating(rating)}
          <span className="ml-3 text-gray-600 font-medium">
            ({rating}/5)
          </span>
        </div>
      </div>
    </div>
  );
}
