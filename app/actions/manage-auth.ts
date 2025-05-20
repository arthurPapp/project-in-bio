"use server";
 
 import { auth, signIn, signOut } from "../lib/auth";
 
 export async function manageAuth() {
   const session = await auth();
 
   //redireciona para apagina de loggin do google, depois de logar ele vai para pagina criar
   if (!session) {
     return await signIn("google", { redirectTo: "/criar" });
   }
 
   //retorna para pagina inicial
   return await signOut({ redirectTo: "/" });
 }