"use client";

import { Github, Instagram, Linkedin, Plus, Twitter } from "lucide-react";
import { startTransition, useState } from "react"
import Modal from "../../ui/modal";
import Button from "../../ui/button";
import { useParams, useRouter } from "next/navigation";
import { createSocialLinks } from "../../../actions/create-socials-links";
import TextInput from "../../ui/text-input";


export default function EditSocialLinks({
  socialMedias,
}: {
    socialMedias?: {
      gitHub: string;
      instagram: string;
      linkedin: string;
      twitter: string;
    };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingSocilaLinks, setIsSavingSocilaLinks] = useState(false);

  const [gitHub, setGithub] = useState(socialMedias?.gitHub || "");
  const [instagram, setInstagram] = useState(socialMedias?.instagram || "");
  const [linkedin, setLinkedin] = useState(socialMedias?.linkedin || "");
  const [twitter, setTwitter] = useState(socialMedias?.twitter || "");
    //como usar o useParams
  const { profileId } = useParams();
  const router = useRouter();

  async function handleAddSocialLinks() {
    setIsSavingSocilaLinks(true);
    
    if (!profileId) return;

    await createSocialLinks({
      profileId: profileId as string,
      gitHub,
      instagram,
      linkedin,
      twitter,
    });

    startTransition(() => {
      setIsModalOpen(false);
      setIsSavingSocilaLinks(false);
      router.refresh()
    })
  }
  return (
    <>
      <button
      onClick={() => setIsModalOpen(true)}
      className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
    >
      <Plus />
      </button>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}> 
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
          <p className="text-white font-bold text-xl">
            Adicionar redes sociais
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 w-full">
              <Github />
              <TextInput
                type="text"
                placeholder="Link GitHub"
                value={gitHub}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Linkedin />
              <TextInput
                type="text"
                placeholder="Link Linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Instagram />
              <TextInput
                type="text"
                placeholder="Link Instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Twitter />
              <TextInput
                type="text"
                placeholder="Link Twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="font-bold text-white"
            >
              Voltar
            </button>
            <Button onClick={handleAddSocialLinks} disabled={isSavingSocilaLinks}>Salvar</Button>

          </div>
        </div>
      </Modal>
    </>
    )
}