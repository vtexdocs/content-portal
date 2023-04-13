import type { AppProps } from 'next/app'
import type { Page } from 'utils/typings/types'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl'
import { getMessages } from 'utils/get-messages'

import 'styles/global.css'
import 'styles/rapidoc.css'

import Layout from 'components/layout'

type Props = AppProps & {
  Component: Page
}

import TrackerProvider from 'utils/contexts/trackerContext'
import PreviewContextProvider from 'utils/contexts/preview'

function MyApp({ Component, pageProps }: Props) {
  const { locale } = useRouter()
  const currentLocale = locale ?? 'en'
  const messages = getMessages()

  return (
    <TrackerProvider>
      <IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
        <Head>
          <meta
            property="og:image"
            content="https://cdn.jsdelivr.net/gh/vtexdocs/devportal@main/public/images/meta-image.png"
          />
        </Head>
        <PreviewContextProvider>
          <Layout
            sidebarfallback={pageProps.sidebarfallback}
            hideSidebar={Component.hideSidebar}
            isPreview={pageProps.isPreview ?? false}
            sectionSelected={pageProps.sectionSelected}
            parentsArray={pageProps.parentsArray}
          >
            <Component {...pageProps} />
          </Layout>
        </PreviewContextProvider>
      </IntlProvider>
    </TrackerProvider>
  )
}

export default MyApp
