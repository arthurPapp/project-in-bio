 import NextAuth from "next-auth";
 import Google from "next-auth/providers/google";
 import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firebaseCert } from "./firebase";
 
 export const { auth, handlers, signIn, signOut } = NextAuth({
   adapter: FirestoreAdapter({
     credential: firebaseCert,
   }),
   providers: [Google],
   events: {},
   callbacks: {},
 });