export default function ProjectCard() {
  return (
    <div className="w-[430px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secundary">
      <div className="size-24 rounded-md overflow-hidden flex items-shrink-0">
        <img
          src="https://ortogonalprojetos.com.br/wp-content/uploads/2016/01/Program-Management-01.jpg"
          alt="Projeto"
          className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="uppercase text-xs font-bold text-accent-green">10 cliques</span>
      </div>
      <div className="flex flex-col">
        <span className="text-white font-bold">Projeto 1</span>
        <span className="text-content-body text-bold">Descrição do detalhada do projeto</span>
      </div>
    </div>
  )
}