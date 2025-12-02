import Link from 'next/link';

interface CaracteristicaProps {
  caracteristica: string;
  index: number;
}

export default function Caracteristica({ caracteristica, index }: CaracteristicaProps) {
  return (
    <Link href={`/caracteristica/${index}`}>
      <li className="bg-linear-to-r from-blue-100 to-blue-50 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 transform border-l-4 border-blue-500 mb-3">
        <span className="text-gray-800 font-medium text-lg">
          {caracteristica}
        </span>
      </li>
    </Link>
  );
}
