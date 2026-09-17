import Head from 'next/head'
import { useContext } from 'react'
import { Box, Flex, Text } from '@vtex/brand-ui'
import { GetStaticProps } from 'next'
import type { Page } from 'utils/typings/types'
import { PreviewContext } from 'utils/contexts/preview'
import getNavigation from 'utils/getNavigation'
import { getTranslatedSectionName } from 'utils/getSectionNames'
import {
  flattenJSON,
  getKeyByValue,
  getParents,
  localeType,
} from 'utils/navigation-utils'

import styles from 'styles/documentation-page'

interface Props {
  branch: string
}

// This page currently has no body/content. It exists so that the Agents
// callout and header label can link somewhere meaningful, and so that it can
// be listed alongside the other sections in the left navigation sidebar,
// under the "AI" section. The full article about the VTEX Localization
// Agent (rendered from markdown, with its table of contents and
// contributors) will be added here later.
const AgentPage: Page<Props> = ({ branch }) => {
  const { setBranchPreview } = useContext(PreviewContext)
  setBranchPreview(branch)

  return (
    <>
      <Head>
        <title>VTEX Localization Agent</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Flex sx={styles.innerContainer}>
        <Box sx={styles.articleBox}>
          <Box sx={styles.contentContainer}>
            <Box sx={styles.textContainer}>
              <article>
                <header>
                  <Text sx={styles.documentationTitle} className="title">
                    VTEX Localization Agent
                  </Text>
                </header>
                {/* TODO: Content about the VTEX Localization Agent will be added here. */}
              </article>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  locale,
  preview,
  previewData,
}) => {
  const previewBranch =
    preview &&
    previewData &&
    typeof previewData === 'object' &&
    'branch' in previewData
      ? (previewData as { branch?: string }).branch || 'main'
      : 'main'
  const branch = preview ? previewBranch : 'main'
  const currentLocale = (locale || 'en') as localeType

  const sidebarfallback = await getNavigation()
  const sectionSelected = getTranslatedSectionName(
    sidebarfallback,
    'AI',
    currentLocale
  )

  const slug = 'vtex-localization-agent'
  const flattenedSidebar = flattenJSON(sidebarfallback)
  const keyPath = getKeyByValue(flattenedSidebar, slug)
  const parentsArray: string[] = []
  if (keyPath) {
    getParents(keyPath, 'slug', flattenedSidebar, currentLocale, parentsArray)
  }
  parentsArray.push(slug)

  return {
    props: {
      sectionSelected,
      parentsArray,
      branch,
    },
  }
}

export default AgentPage
