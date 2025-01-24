import Button from "../ui/button";

export default function Header() {
  return (
    <div className="absolute left-0 right-0 max-w-7xl mx-auto flex justify-between items-center py-10">
      <div className="flex items-center gap-4">
        <img src="/logo.svg" alt="ProjectInBio Logo" />
        <h3 className="text-white text-2xl font-bold">ProjectInBio</h3>
      </div>
      <div className="flex items-center gap-4">
        <Button>Minha Pagina</Button>
        <Button>Sair</Button>
      </div>
    </div>
  );
}
