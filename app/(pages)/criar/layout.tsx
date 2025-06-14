import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";
import { getProfileId } from "../../server/get-profile-data";

export default async function RootLayout({
  children,
}: {
    children: React.ReactNode;
  }) {
  
  const session = await auth();
  if (!session) redirect("/");

  const profileId = await getProfileId(session.user?.id as string);

  if(profileId) redirect(`/${profileId}`)
  
  return <> {children} </>
}