import Image from 'next/image';
import Link from 'next/link';

interface TecnologiaCardProps {
  title: string;
  image: string;
  index: number;
}

export default function TecnologiaCard({ title, image, index }: TecnologiaCardProps) {
  return (
    <Link href={`/tecnologia/${index}`}>
      <div className="w-48 h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 m-4 flex flex-col items-center justify-center border border-blue-200 cursor-pointer hover:scale-105 transform transition-transform">
        <div className="mb-4 flex items-center justify-center h-20">
          <Image
            src={`/tecnologias/${image}`}
            alt={`${title} Logo`}
            width={60}
            height={60}
            className="object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          {title}
        </h3>
      </div>
    </Link>
  );
}
