"use client"
import { ArrowUpFromLine, UserPen } from "lucide-react"
import Modal from "../../ui/modal"
import { startTransition, useState } from "react";
import TextInput from "../../ui/text-input";
import TextArea from "../../ui/text-area";
import Button from "../../ui/button";
import { useParams, useRouter } from "next/navigation";
import { compressFiles, handleImageInput, triggerImageInput } from "../../../lib/utils";
import { saveProfile } from "../../../actions/save-profile";
import { ProfileData } from "../../../server/get-profile-data";

export default function EditUserCar(
  {
    profileData,

  }: {
    profileData?: ProfileData
  }) {
  const router = useRouter();

  const {profileId} = useParams();  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profilePic, serProfilePic] = useState<string | null>(null);
  const [yourName, setYourName] = useState(profileData?.name || "");
  const [yourDescrpition, setYourDescription] = useState(profileData?.description || "");

  async function handleSaveProfile() {
    setIsSavingProfile(true);


    const imagesInput = document.getElementById("profile-pic-input") as HTMLInputElement; 
    if (!imagesInput.files) return; 

    const compressedFile = await compressFiles(Array.from(imagesInput.files));

    if (!profileId) return;

    const formData = new FormData();
    formData.append("profileId", profileId as string);
    formData.append("profilePic", compressedFile[0]);
    formData.append("yourName", yourName);
    formData.append("yourDescription", yourDescrpition);

    await saveProfile(formData)

    startTransition(() => {
      setIsModalOpen(false);
      setIsSavingProfile(false);
      router.refresh()
    })
  }
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
      <UserPen />
      </button>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
        <p className="text-white font-bold text-xl">Editar Perfil</p>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                {profilePic ?(
                  <img
                    src={profilePic}
                    alt="sua imagem"
                    className="object-cover object-center"
                  />
                ) : (
                    <button
                      onClick={() => triggerImageInput("profile-pic-input")}
                      className="w-full h-full"
                    >
                      100X100
                    </button>
                )}
              </div>
              <button  onClick={() => triggerImageInput("profile-pic-input")} className="text-wite flex items-center gap-2">
                <ArrowUpFromLine className="size-4"/>
                <span>Adicionar foto</span>
              </button>
              <input
                id="profile-pic-input"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => serProfilePic(handleImageInput(e))}
              />
            </div>
            <div className="flex flex-col gap-4 w-[293px]">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="your-name"
                  className="text-white font-bold"
                >
                  Seu Nome
                </label>
                <TextInput
                  id="your-name"
                  placeholder="Digite seu nome"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
              <label htmlFor="your-description">Descrição</label>
              <TextArea
              id="your-description"
              placeholder="Fale um pouco sobre voce"
              className="h-36"
              value={yourDescrpition}
              onChange={(e) => setYourDescription(e.target.value)}
            />
            </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button className="font-bold text-white">Voltar</button>
            <Button onClick={handleSaveProfile} disabled={isSavingProfile}>Salvar</Button>

          </div>
        </div>
      </Modal>
    </>
  )
}