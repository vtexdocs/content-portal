import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl'
import { getMessages } from 'utils/get-messages'
import type { Page } from 'utils/typings/types'

import '@vtexdocs/components/dist/index.css'
import 'styles/global.css'
import 'styles/rapidoc.css'

import { ErrorBoundary, SuspenseFallback } from 'components/error-boundary'
import Layout from 'components/layout'
import { Suspense } from 'react'

type Props = AppProps & {
  Component: Page
}

import PreviewContextProvider from 'utils/contexts/preview'
import TrackerProvider from 'utils/contexts/trackerContext'

function MyApp({ Component, pageProps }: Props) {
  const { locale } = useRouter()
  const currentLocale = locale ?? 'en'
  const messages = getMessages()
  const defaultMessages = messages['en']
  const currentMessages = messages[currentLocale] ?? defaultMessages

  return (
    <TrackerProvider>
      <IntlProvider locale={currentLocale} messages={currentMessages}>
        <Head>
          <meta
            property="og:image"
            content="https://cdn.jsdelivr.net/gh/vtexdocs/devportal@main/public/images/meta-image.png"
          />
          <meta
            name="docsearch:language"
            content={pageProps.locale || currentLocale}
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
            <ErrorBoundary>
              <Suspense
                fallback={<SuspenseFallback branch={pageProps.branch} />}
              >
                <Component {...pageProps} />
              </Suspense>
            </ErrorBoundary>
          </Layout>
        </PreviewContextProvider>
      </IntlProvider>
    </TrackerProvider>
  )
}

export default MyApp
