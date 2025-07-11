"use client";

import TextInput from "./text-input"
import Button from "../ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function CreateNow() {

  const [link, setLink] = useState("");

  return (
    <div className="flex items-center gap-2 w-full mt-[10vh]">
          <span className="text-white text-xl">projectinbio.com/</span>
      <TextInput
        placeholder="Seu link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <Button onClick={() => {
        signIn("google", {
          redirectTo: `/criar?link=${link}`
        });
      }}
      >
        Criar Agora
      </Button>
     </div>
  )
}