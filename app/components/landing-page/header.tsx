import { manageAuth } from "../../actions/manage-auth";
import { auth } from "../../lib/auth";
import Button from "../ui/button";
import { getProfileId } from "../../server/get-profile-data";
import Link from "next/link";

 
 export default async function Header() {
   const session = await auth();
   const profileId = await getProfileId(session?.user?.id as string);
  return (
    <div className="absolute left-0 right-0 max-w-7xl mx-auto flex justify-between items-center py-10">
      <div className="flex items-center gap-4">
        <img src="/logo.svg" alt="ProjectInBio Logo" />
        <h3 className="text-white text-2xl font-bold">ProjectInBio</h3>
      </div>
      <div className="flex items-center gap-4">
        {session && (
          <Link href={`/${profileId}`}>
            <Button>Minha Página</Button>
          </Link>
        )}
         <form action={manageAuth}>
           <Button>{session ? "Sair" : "Login"}</Button>
         </form>
      </div>
    </div>
  );
}
