import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import remarkGFM from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import hljsCurl from 'highlightjs-curl'
import remarkBlockquote from 'utils/remark_plugins/rehypeBlockquote'

import remarkImages from 'utils/remark_plugins/plaiceholder'
import { getLogger } from 'utils/logging/log-util'

import { Box, Flex, Text } from '@vtex/brand-ui'

import DocumentContextProvider from 'utils/contexts/documentContext'

import { Item, MarkdownRenderer } from '@vtexdocs/components'
import FeedbackSection from 'components/feedback-section'
import OnThisPage from 'components/on-this-page'
import { TableOfContents } from '@vtexdocs/components'

import { removeHTML } from 'utils/string-utils'
import {
  flattenJSON,
  getKeyByValue,
  getParents,
  localeType,
} from 'utils/navigation-utils'
import getNavigation from 'utils/getNavigation'
// import getGithubFile from 'utils/getGithubFile'
import { getDocsPaths as getNewsPaths } from 'utils/getDocsPaths'
import replaceMagicBlocks from 'utils/replaceMagicBlocks'
import escapeCurlyBraces from 'utils/escapeCurlyBraces'
import replaceHTMLBlocks from 'utils/replaceHTMLBlocks'
import { getReleaseDate } from 'components/release-note/functions'
import { ActionType, getAction } from 'components/announcement-card/functions'

import styles from 'styles/documentation-page'
import { PreviewContext } from 'utils/contexts/preview'
// import { ParsedUrlQuery } from 'querystring'

const docsPathsGLOBAL = await getNewsPaths('announcements')

interface Props {
  content: string
  serialized: MDXRemoteSerializeResult
  sidebarfallback: any //eslint-disable-line
  branch: string
}

const NewsPage: NextPage<Props> = ({ serialized, branch }) => {
  const [headings, setHeadings] = useState<Item[]>([])
  const { setBranchPreview } = useContext(PreviewContext)
  setBranchPreview(branch)
  useEffect(() => {
    if (headings) setHeadings([])
    document.querySelectorAll('h2, h3').forEach((heading) => {
      const item = {
        title: removeHTML(heading.innerHTML).replace(':', ''),
        slug: heading.id,
      }

      setHeadings((headings) => {
        if (heading.tagName === 'H2') {
          return [...headings, { ...item, children: [] }]
        }

        const { title, slug, children } = headings[headings.length - 1] || {
          title: '',
          slug: '',
          children: [],
        }

        return [
          ...headings.slice(0, -1),
          { title, slug, children: [...children, item] },
        ]
      })
    })
  }, [])
  const actionType: ActionType = serialized.frontmatter?.type as ActionType
  const actionValue = actionType ? getAction(actionType) : null

  return (
    <>
      <Head>
        <title>{serialized.frontmatter?.title as string}</title>
        <meta name="docsearch:doctype" content="News" />
      </Head>
      <DocumentContextProvider headings={headings}>
        <Flex sx={styles.innerContainer}>
          <Box sx={styles.articleBox}>
            <Box sx={styles.contentContainer}>
              <article>
                {actionValue ? (
                  <Box sx={styles.releaseAction}>
                    <actionValue.Icon />
                    <Text>{actionValue?.title}</Text>
                  </Box>
                ) : null}
                <Text sx={styles.documentationTitle}>
                  {serialized.frontmatter?.title}
                </Text>
                <Text sx={{ marginTop: '10px' }}>
                  {getReleaseDate(
                    (serialized.frontmatter?.createdAt as string) || ''
                  )}
                </Text>
                <Box sx={styles.divider}></Box>
                <MarkdownRenderer serialized={serialized} />
              </article>
            </Box>
            <FeedbackSection suggestEdits={false} />
          </Box>
          <Box sx={styles.rightContainer}>
            <TableOfContents />
          </Box>
          <OnThisPage />
        </Flex>
      </DocumentContextProvider>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const slugs: { [slug: string]: { locale: string; path: string }[] } =
  //   await getNewsPaths('announcements')

  // const paths: (
  //   | string
  //   | {
  //       params: ParsedUrlQuery
  //       locale?: string | undefined
  //     }
  // )[] = []
  // Object.entries(slugs).forEach(([slug, locales]) => {
  //   locales.forEach(({ locale }) => {
  //     paths.push({ params: { slug }, locale })
  //   })
  // })

  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  preview,
  previewData,
}) => {
  const previewBranch =
    preview && JSON.parse(JSON.stringify(previewData)).hasOwnProperty('branch')
      ? JSON.parse(JSON.stringify(previewData)).branch
      : 'main'
  const branch = preview ? previewBranch : 'main'
  const slug = params?.slug as string
  const currentLocale: localeType = locale
    ? (locale as localeType)
    : ('en' as localeType)
  const docsPaths =
    process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD
      ? docsPathsGLOBAL
      : await getNewsPaths('announcements', branch)

  const path = docsPaths[slug].find((e) => e.locale === locale)?.path
  if (!path) {
    return {
      notFound: true,
    }
  }

  // let documentationContent = await getGithubFile(
  //   'vtexdocs',
  //   'help-center-content',
  //   branch,
  //   path
  // )

  let documentationContent =
    (await fetch(
      `https://raw.githubusercontent.com/vtexdocs/help-center-content/${branch}/${path}`
    )
      .then((res) => res.text())
      .catch((err) => console.log(err))) || ''

  const logger = getLogger('News')

  try {
    if (path.endsWith('.md')) {
      documentationContent = escapeCurlyBraces(documentationContent)
      documentationContent = replaceHTMLBlocks(documentationContent)
      documentationContent = await replaceMagicBlocks(documentationContent)
    }

    let serialized = await serialize(documentationContent, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGFM, remarkImages, remarkBlockquote],
        rehypePlugins: [
          [rehypeHighlight, { languages: { hljsCurl }, ignoreMissing: true }],
        ],
        format: 'mdx',
      },
    })

    const sidebarfallback = await getNavigation()
    serialized = JSON.parse(JSON.stringify(serialized))

    const sectionSelected = 'News'
    const flattenedSidebar = flattenJSON(sidebarfallback)
    const keyPath = getKeyByValue(flattenedSidebar, slug)
    const parentsArray: string[] = []
    if (keyPath) {
      getParents(keyPath, 'slug', flattenedSidebar, currentLocale, parentsArray)
      parentsArray.push(slug)
    }
    return {
      props: {
        parentsArray,
        serialized,
        sidebarfallback,
        sectionSelected,
        branch,
      },
      revalidate: 600,
    }
  } catch (error) {
    logger.error(`Error while processing ${path}\n${error}`)

    return {
      notFound: true,
    }
  }
}

export default NewsPage
