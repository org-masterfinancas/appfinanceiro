import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';


import ProvedorToken from './data/contexts/ContextoToken'
import ProvedorUsuario from './data/contexts/ContextoUsuario'


import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from './mantineTheme'
import { Notifications } from '@mantine/notifications';



export const metadata = {
  title: 'App - Financeiro',
  description: 'Lancamento Financeiros',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <ProvedorToken>
      <ProvedorUsuario>
        <html lang="pt-br">
          <head>
            <link rel="shortcut icon" href="/next.svg" />
            <meta
              charSet="UTF-8"
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <ColorSchemeScript />
          </head>
          <body>
            <MantineProvider theme={theme}>
              <Notifications />
              {children}
            </MantineProvider>
          </body>
        </html>
      </ProvedorUsuario>
    </ProvedorToken>
  )
}
