"use server";

import { Timestamp } from "firebase-admin/firestore";
import { db } from "../lib/firebase";
import { auth } from "../lib/auth";

export type Link = {
  title: string;
  url: string;
};
export default async function addCustomLink({
  profileId,
  link1,
  link2,
  link3,
 }
  :{
  profileId: string
  link1: Link;
  link2: Link;
  link3: Link;
  }) {
    const session = await auth();
    if (!session) return false;
  try {
    await db.collection("profiles").doc(profileId).update({
      link1,
      link2,
      link3,
      updatedAt: Timestamp.now().toMillis(),
    })
  } catch (error) {
    console.log(error)
  }
}