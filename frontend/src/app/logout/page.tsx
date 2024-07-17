import { redirect } from "next/navigation";
import { getSession, login, logout } from "@/lib/libauth";

export default async function Page() {
  const session = await getSession();
  return (
    <section className="flex min-h-screen flex-col items-center p-24">
      <form
        action={async () => {
          "use server";
          await logout();
          redirect("/");
        }}
      >
        <button type="submit">Logout</button> 
      </form>
      <div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </section>
  );
}




// https://nextjs.org/docs/app/building-your-application/authentication
