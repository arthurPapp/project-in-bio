"use server";

import { Timestamp } from "firebase-admin/firestore";
import { db } from "../lib/firebase";
import { auth } from "../lib/auth";

export async function createSocialLinks({
  profileId,
  gitHub,
  instagram,
  linkedin,
  twitter,
}: {
    profileId: string;
    gitHub: string;
    instagram: string;
    linkedin: string;
    twitter: string;
  }) {
      const session = await auth()
      if (!session){
        return false;
      }
      try {
        await db.collection("profiles").doc(profileId).update({
          socialMedias: {
            gitHub,
            instagram,
            linkedin,
            twitter
          },
          updatedAt: Timestamp.now().toMillis(),
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
   }