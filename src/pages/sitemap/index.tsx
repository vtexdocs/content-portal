import { Box, Flex, Text } from '@vtex/brand-ui' //eslint-disable-line
import SiteMapSection from 'components/sitemap-section' //eslint-disable-line
import { GetStaticProps } from 'next' //eslint-disable-line
import { useIntl } from 'react-intl' //eslint-disable-line
import styles from 'styles/sitemap-page' //eslint-disable-line
import { additionalResourcesSitemap } from 'utils/constants' //eslint-disable-line
import getNavigation from 'utils/getNavigation' //eslint-disable-line
import { localeType } from 'utils/navigation-utils' //eslint-disable-line
import { Page } from 'utils/typings/types' //eslint-disable-line

interface Props {
  sections: [
    {
      documentation: string
      children: { name: string; link: string; icon: boolean }[]
    }
  ]
} //eslint-disable-line

const SiteMapPage: Page<Props> = ({ sections }) => {
  const intl = useIntl()

  const documentationTitleTranslated: { [key: string]: string } = {
    'Style Guides': intl.formatMessage({ id: 'style_guides_card_title' }),
    'Use grammar, style, and formatting convertions to make your VTEX content clear and consistent.':
      intl.formatMessage({
        id: 'style_guides_subtitle',
      }),
  }

  const arr = additionalResourcesSitemap(intl)

  return (
    <>
      <Box sx={styles.outerContainer}>
        <Box sx={styles.titleContainer}>
          <Text sx={styles.pageTitle}>
            {intl.formatMessage({ id: 'sitemap_page.title' })}
          </Text>
        </Box>
        <Flex sx={styles.contentContainer}>
          {sections.map((el) => (
            <SiteMapSection
              documentation={documentationTitleTranslated[el.documentation]}
              children={el.children}
            />
          ))}
          <SiteMapSection
            documentation={arr.documentation}
            children={arr.children}
          />
        </Flex>
      </Box>
    </>
  )
}

SiteMapPage.hideSidebar = true

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale: localeType = locale
    ? (locale as localeType)
    : ('en' as localeType)

  const sectionDocumentation = ['Start here', 'Tutorials & Solutions']

  const sidebarfallback = await getNavigation()

  const filteredSections = sidebarfallback.filter((elem) =>
    sectionDocumentation.includes(elem.documentation)
  )

  const sections = filteredSections.map((el) => {
    return {
      documentation: el.documentation,
      children: el.categories.map((e) => {
        return {
          name: e.name[currentLocale],
          link: `${el.slugPrefix}/${e.slug}`,
          icon: false,
        }
      }),
    }
  })

  return {
    props: {
      sections,
    },
  }
}

export default SiteMapPage
