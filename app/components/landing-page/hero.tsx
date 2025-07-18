import ProjectCard from "../commons/project-card";
import { TotalVisits } from "../commons/total-visits";
import UserCard from "../commons/user-card/user-card";
import Button from "../ui/button";
import CreateNow from "../ui/create-now";
import TextInput from "../ui/text-input";

export default function Hero({
  texts
}: {
  texts?: {
    title: string;
    description: string;
  }
}) {
  return (
    <div className="flex h-screen">
      <div className="w-full flex flex-col gap-2 mt-[35vh]">
        <h1 className="text-5xl font-bold text-white leading-[64px]">
          {texts?.title || "Seus projetos e redes sociais em um único link"}
        </h1>
        <h2 className="text-xl text-white landing-6">
          {texts?.description
            || "Crie sua própria página de projetos e compartilhe ele com o mundo."}
          <br />
          Acompanhe o engajamento com Analytics de cliques.
        </h2>
        
        <CreateNow/>
      </div>
      <div className="w-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#4B2DBB,transparent_55%)]">
        <div className="relative">
          <UserCard />
          <div className="absolute -buttom[7%] -right-[45%]">
             <TotalVisits totalVisits={134}/>
          </div>
          <div className="absolute top-[20%] -left-[45%] -z-10">
            <ProjectCard name="Projeto 1" description="Poject 1" img="/project1.jpg" />
          </div>
          <div className="absolute -top-[5%] -left-[55%] -z-10">
            <ProjectCard name="Projeto 2" description="Poject 2" img="/project2.jpg"/> 
          </div>
        </div>
      </div>
    </div>
  )
}
