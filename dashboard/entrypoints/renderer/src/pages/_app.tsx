import React             from 'react'
import { IntlProvider }  from 'react-intl'

import { ThemeProvider } from '@ui/theme'

const App = ({ Component, pageProps, ...props }) => (
  <IntlProvider locale='en' defaultLocale='en' messages={{}}>
    <ThemeProvider>
      <Component {...pageProps} {...props} />
    </ThemeProvider>
  </IntlProvider>
)

export default App
