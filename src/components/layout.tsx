import { Flex, Box } from '@vtex/brand-ui'
import type { ReactElement } from 'react'
import { useContext, useEffect, useMemo } from 'react'
import { TrackerContext } from 'utils/contexts/trackerContext'
import { useClientNavigation } from 'utils/useClientNavigation'
import { ThemeProvider } from '@vtex/brand-ui'

import styles from 'styles/documentation-page'
import Header from 'components/header'
import Footer from 'components/footer'

import { DocumentationTitle, UpdatesTitle } from 'utils/typings/unionTypes'
import Script from 'next/script'
import {
  CookieBar,
  LibraryContextProvider,
  Sidebar,
} from '@vtexdocs/components'
import {
  sectionsData,
  feedbackSectionData,
  menuSupportData,
  agentsSectionData,
} from 'utils/constants'
import { useIntl } from 'react-intl'
import { localizeNavigationDocumentation } from 'utils/getSectionNames'

interface Props {
  children: ReactElement
  hideSidebar?: boolean
  isPreview: boolean
  sectionSelected?: DocumentationTitle | UpdatesTitle | ''
  parentsArray?: string[]
}

export default function Layout({
  children,
  hideSidebar,
  isPreview = false,
  sectionSelected,
  parentsArray,
}: Props) {
  const { initTracker, startTracking } = useContext(TrackerContext)
  const { navigation } = useClientNavigation()
  const intl = useIntl()

  const localizedNavigation = useMemo(() => {
    if (!navigation) return null
    const localized = localizeNavigationDocumentation(
      navigation,
      intl.locale as 'en' | 'pt' | 'es'
    )
    return localized
  }, [navigation, intl.locale])

  useEffect(() => {
    console.log(sectionSelected)
  }, [sectionSelected])

  useEffect(() => {
    const timer = setTimeout(() => {
      initTracker()
      startTracking()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      <LibraryContextProvider
        sections={[sectionsData(intl)]}
        hamburguerMenuSections={[
          sectionsData(intl),
          agentsSectionData(intl),
          menuSupportData(intl),
          feedbackSectionData(intl),
        ]}
        sectionSelected={sectionSelected ?? ''}
        fallback={localizedNavigation}
        isPreview={isPreview}
        locale={intl.locale as 'en' | 'pt' | 'es'}
      >
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KZ58QQP5"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
        <div className="container">
          <Script id="GTM-init" strategy="lazyOnload">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer','GTM-KZ58QQP5')
					`}
          </Script>
        </div>
        <CookieBar
          onAccept={() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const window2 = window as any
            if (typeof window2.gtag === 'function') {
              window2.gtag('consent', 'update', {
                ad_storage: 'granted',
                analytics_storage: 'granted',
              })
            } else {
              setTimeout(() => {
                if (typeof window2.gtag === 'function') {
                  window2.gtag('consent', 'update', {
                    ad_storage: 'granted',
                    analytics_storage: 'granted',
                  })
                }
              }, 1000)
            }
          }}
        />
        <Header />
        <Flex sx={styles.container}>
          {!hideSidebar && <Sidebar parentsArray={parentsArray} />}
          <Box sx={styles.mainContainer}>{children}</Box>
        </Flex>
        <Footer />
      </LibraryContextProvider>
    </ThemeProvider>
  )
}
