export default function SobrePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Sobre o Projeto
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Este projeto foi desenvolvido para demonstrar as capacidades do React e Next.js 
          no desenvolvimento de aplicações web modernas. Através de exemplos práticos, 
          você pode ver como estas tecnologias funcionam.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Por que React e Next.js?
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          React mudou a forma como pensamos sobre interfaces web. Em vez de manipular 
          diretamente o HTML, criamos componentes reutilizáveis que tornam o código 
          mais organizado e fácil de manter.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Next.js adiciona funcionalidades importantes como renderização no servidor, 
          roteamento automático e otimizações de performance, tornando o desenvolvimento 
          mais rápido e eficiente.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Principais Características
        </h3>
        <ul className="space-y-3 list-none">
          <li className="border-l-4 border-blue-500 pl-4 py-2">
            <strong className="text-gray-800">Componentes Reutilizáveis:</strong>
            <span className="text-gray-700"> Código modular que pode ser usado em diferentes partes da aplicação.</span>
          </li>
          <li className="border-l-4 border-blue-500 pl-4 py-2">
            <strong className="text-gray-800">Performance:</strong>
            <span className="text-gray-700"> Atualizações eficientes que mantêm a aplicação rápida.</span>
          </li>
          <li className="border-l-4 border-blue-500 pl-4 py-2">
            <strong className="text-gray-800">SEO Amigável:</strong>
            <span className="text-gray-700"> Renderização no servidor melhora a indexação nos motores de busca.</span>
          </li>
          <li className="border-l-4 border-blue-500 pl-4 py-2">
            <strong className="text-gray-800">TypeScript:</strong>
            <span className="text-gray-700"> Tipagem estática que ajuda a prevenir erros durante o desenvolvimento.</span>
          </li>
          <li className="border-l-4 border-blue-500 pl-4 py-2">
            <strong className="text-gray-800">Roteamento Simples:</strong>
            <span className="text-gray-700"> Sistema baseado em arquivos que facilita a organização do projeto.</span>
          </li>
        </ul>
      </div>

      <div className="bg-gray-50 p-5 rounded border border-gray-200">
        <p className="text-gray-700 leading-relaxed">
          Este projeto serve como exemplo prático de como estas tecnologias podem ser 
          aplicadas para criar aplicações web modernas, escaláveis e fáceis de manter.
        </p>
      </div>
    </div>
  );
}