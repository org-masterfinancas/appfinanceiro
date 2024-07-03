import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <p>
        Projeto Financeiro - FrontEnd
      </p>
      <div>
        <Image
          className=""
          src="/logo.png"
          alt="logo.png Logo"
          width={360}
          height={74}
          priority
        />
      </div>
      <div><p>Lançamento Financeiros</p></div>
    </main>
  );
}

