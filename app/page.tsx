import MagiaDoJSX from "@/components/MagiaDoJSX/MagiaDoJSX";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Bem-vindo
        </h2>
        <p className="text-gray-700 text-lg mb-2">
          Esta é a minha aplicação desenvolvida com React e Next.js.
        </p>
        <p className="text-gray-600">
          Aqui você pode explorar diferentes tecnologias web modernas e ver como 
          elas funcionam na prática.
        </p>
      </div>

      <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
        <p className="text-gray-700">
          <strong>Dica:</strong> Navegue pelas páginas para conhecer as tecnologias 
          que utilizo e as características do React e Next.js.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Demonstração de JSX
        </h3>
        <MagiaDoJSX />
      </div>

      <div className="pt-4">
        <p className="text-gray-700 mb-4">
          Quer saber mais sobre o projeto?
        </p>
        <div className="flex gap-3">
          <Link 
            href="/tecnologias"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Ver Tecnologias
          </Link>
          <Link 
            href="/sobre"
            className="border border-blue-600 text-blue-600 px-5 py-2 rounded hover:bg-blue-50"
          >
            Sobre o Projeto
          </Link>
        </div>
      </div>
    </div>
  );
}
