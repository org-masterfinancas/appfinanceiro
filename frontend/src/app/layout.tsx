import ProvedorToken from './data/contexts/ContextoToken'
import ProvedorUsuario from './data/contexts/ContextoUsuario'
import { Inter } from "next/font/google";
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'App - Financeiro',
  description: 'Lancamento Financeiros',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <ProvedorToken>
      <ProvedorUsuario>
        <html lang="en"> {/*  className='h-screen'  */}
          <body className={inter.className}>
            {children}
          </body>
        </html>
      </ProvedorUsuario>
    </ProvedorToken>
  )
}
