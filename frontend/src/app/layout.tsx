import ProvedorToken from './data/contexts/ContextoToken'
import ProvedorUsuario from './data/contexts/ContextoUsuario'
import './globals.css'

export const metadata = {
  title: 'App - Financeiro',
  description: 'Lancamento Financeiros',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <ProvedorToken>
      <ProvedorUsuario>
        <html lang="pt-BR">
          <body>{children}</body>
        </html>
      </ProvedorUsuario>
    </ProvedorToken>
  )
}
