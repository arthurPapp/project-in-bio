import { Rocket } from "lucide-react";
import Header from "../../components/landing-page/header";
import TextInput from "../../components/ui/text-input";
import Button from "../../components/ui/button";
import CreateLinkForm from "./create-link-form";
import { trackServerEvent } from "../../lib/mixpanel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProjectInBio - Criar",
  description: "ProjectInBio - A plataforma de criação de links para o seu projeto",
};

export default function CriarPage() {
  trackServerEvent("page_view", {
    page: "criar",
  });
  return (
    <div>
      <Header />
      <div className="h-screen flex flex-col gap-10 items-center justify-center max-w-xl mx-auto">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-white">Escolha seu link</h1>
          <Rocket className="size-10" />
        </div> 
        <CreateLinkForm />
      </div>
    </div>
  )
}