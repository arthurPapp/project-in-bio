import { Metadata } from "next";
import FAQ from "../components/landing-page/faq";
import Header from "../components/landing-page/header";
import Hero from "../components/landing-page/hero";
import Pricing from "../components/landing-page/pricing";
import VideoExplanation from "../components/landing-page/video-explanation";
import { trackServerEvent } from "../lib/mixpanel";
import { getSEOTags } from "../lib/seo";

export const metadata: Metadata = getSEOTags({
  appName: "ProjectInBio",
  appDescription: "ProjectInBio - A plataforma de criação de links para o seu projeto",
  keywords: ["projectinbio", "projectinbio.com", "links", "projetos", "dev", "desenvilvimento"],
  appDomain: "https://projectinbio.com.br",
  canonicalUrlRelative: "/criar/perfil/upgrade",
});


export default function Home() {
  trackServerEvent("page_view", {
    page: "home",
  });
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Hero />
      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  );
}

