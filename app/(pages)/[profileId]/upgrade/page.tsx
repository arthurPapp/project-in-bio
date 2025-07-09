import { Metadata } from "next";
import Header from "../../../components/landing-page/header";
import PlanButtons from "./plan-buttons";
import { getSEOTags } from "../../../lib/seo";

export default async function UpgradPage() {
  return (
    <div>
      <Header />
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Escolha o plano</h2>
        <PlanButtons/>
        </div>
      </div>
  );
}