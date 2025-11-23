interface ProjetoProps {
  nome: string;
  url: string;
}

export default function Projeto({ nome, url }: ProjetoProps) {
  return (
    <div className="mb-3">
      <p>
        Confira o meu projeto <strong>{nome}</strong>:{" "}
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {url}
        </a>
      </p>
    </div>
  );
}
