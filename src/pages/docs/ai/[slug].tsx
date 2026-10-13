import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'
import jp from 'jsonpath'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import remarkGFM from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import hljsCurl from 'highlightjs-curl'
import remarkBlockquote from 'utils/remark_plugins/rehypeBlockquote'
import { remarkCodeHike } from '@code-hike/mdx'
import remarkImages from 'utils/remark_plugins/plaiceholder'

import { ArticleRender, Item, LibraryContext } from '@vtexdocs/components'

import getHeadings from 'utils/getHeadings'
import getNavigation from 'utils/getNavigation'
import { getTranslatedSectionName } from 'utils/getSectionNames'
import getGithubFile from 'utils/getGithubFile'
import { getDocsPaths as getTracksPaths } from 'utils/getDocsPaths'
import replaceMagicBlocks from 'utils/replaceMagicBlocks'
import escapeCurlyBraces from 'utils/escapeCurlyBraces'
import replaceHTMLBlocks from 'utils/replaceHTMLBlocks'
import { PreviewContext } from 'utils/contexts/preview'

import getFileContributors, {
  ContributorsType,
} from 'utils/getFileContributors'

import { getLogger } from 'utils/logging/log-util'
import {
  flattenJSON,
  getKeyByValue,
  getParents,
  localeType,
} from 'utils/navigation-utils'
import { remarkReadingTime } from 'utils/remark_plugins/remarkReadingTime'

import theme from 'styles/code-hike-theme'
import { getBreadcrumbsList } from 'utils/getBreadcrumbsList'

let docsPathsGLOBAL: Record<string, { locale: string; path: string }[]> | null =
  null

interface Props {
  sectionSelected: string
  parentsArray: string[]
  breadcrumbList: { slug: string; name: string; type: string }[]
  content: string
  serialized: MDXRemoteSerializeResult
  contributors: ContributorsType[]
  path: string
  headingList: Item[]
  seeAlsoData: {
    url: string
    title: string
    category: string
  }[]
  pagination: {
    previousDoc: {
      slug: string | null
      name: string | null
    }
    nextDoc: {
      slug: string | null
      name: string | null
    }
  }
  isListed: boolean
  branch: string
  slug: string
}

const AiArticlePage: NextPage<Props> = ({
  slug,
  serialized,
  path,
  headingList,
  contributors,
  seeAlsoData,
  pagination,
  isListed,
  breadcrumbList,
  branch,
}) => {
  const { setBranchPreview } = useContext(PreviewContext)
  setBranchPreview(branch)
  const { setActiveSidebarElement } = useContext(LibraryContext)
  const router = useRouter()

  useEffect(() => {
    setActiveSidebarElement(slug)
  }, [slug, setActiveSidebarElement])

  const localePrefix =
    router.locale && router.locale !== router.defaultLocale
      ? `/${router.locale}`
      : ''
  const pageUrl = `https://contentguide.vtex.com${localePrefix}${
    router.asPath.split('#')[0].split('?')[0]
  }`

  return (
    <ArticleRender
      serialized={serialized}
      breadcrumbList={breadcrumbList}
      slug={slug}
      path={path}
      type="ai"
      pageUrl={pageUrl}
      urlToEdit={`https://github.com/vtexdocs/content-portal-content/edit/main/${path}`}
      rawContentBaseUrl="https://raw.githubusercontent.com/vtexdocs/content-portal-content/main/"
      contributors={contributors}
      headingList={headingList}
      pagination={pagination}
      seeAlso={seeAlsoData}
      showArticlePagination={isListed}
      showSeeAlso={Boolean(serialized.frontmatter?.seeAlso)}
    />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const docsPaths = await getTracksPaths('ai')
  const paths = Object.entries(docsPaths).flatMap(([slug, entries]) =>
    entries.map(({ locale }) => ({
      params: { slug },
      locale,
    }))
  )
  return {
    paths,
    fallback: 'blocking',
  }
}

interface PreviewData {
  branch?: string
}

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  preview,
  previewData,
}) => {
  const previewBranch =
    preview &&
    previewData &&
    typeof previewData === 'object' &&
    'branch' in previewData
      ? (previewData as PreviewData).branch || 'main'
      : 'main'
  const branch = preview ? previewBranch : 'main'

  const slug = params?.slug as string
  const langFromParams = params?.lang as string | undefined
  const currentLocale: localeType = (langFromParams ||
    locale ||
    'en') as localeType

  if (!docsPathsGLOBAL) {
    docsPathsGLOBAL = await getTracksPaths('ai')
  }
  const docsPaths =
    preview || process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD
      ? await getTracksPaths('ai', branch)
      : docsPathsGLOBAL

  const logger = getLogger('AiArticlePage-GetStaticProps')

  const pathEntry = docsPaths[slug]?.find((e) => e.locale === currentLocale)

  if (!pathEntry?.path) {
    logger.info(
      `Path not found for slug: ${slug}, locale: ${currentLocale}, branch: ${branch}`
    )
    return { notFound: true, revalidate: 3600 }
  }
  const resolvedPath = pathEntry.path

  let documentationContent: string | null = null
  try {
    documentationContent = await getGithubFile(
      'vtexdocs',
      'content-portal-content',
      branch,
      resolvedPath
    )
  } catch (err) {
    logger.error(
      `Error fetching content for ${resolvedPath} on branch ${branch}: ${err}`
    )
    return { notFound: true, revalidate: 3600 }
  }

  documentationContent = documentationContent || ''

  let contributors: ContributorsType[] = []
  try {
    const fetchedContributors = await getFileContributors(
      'vtexdocs',
      'content-portal-content',
      branch,
      resolvedPath
    )
    if (Array.isArray(fetchedContributors)) {
      contributors = fetchedContributors
    } else {
      logger.info(
        `Fetched contributors is not an array for ${resolvedPath} on branch ${branch}. Received: ${typeof fetchedContributors}`
      )
    }
  } catch (err) {
    logger.info(
      `Error fetching contributors for ${resolvedPath} on branch ${branch}: ${err}`
    )
  }

  let format: 'md' | 'mdx' = 'mdx'

  try {
    const headingList: Item[] = []
    let serialized = await serialize(documentationContent, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          [remarkCodeHike, theme],
          remarkGFM,
          remarkImages,
          [getHeadings, { headingList }],
          remarkBlockquote,
          remarkReadingTime,
        ],
        useDynamicImport: true,
        rehypePlugins: [
          [rehypeHighlight, { languages: { hljsCurl }, ignoreMissing: true }],
        ],
        format,
      },
    })

    const allowedStatuses = ['PUBLISHED', 'CHANGED']
    const status = serialized.frontmatter?.status as string

    if (status && !allowedStatuses.includes(status)) {
      logger.info(
        `Document status is not allowed for ${resolvedPath}. Status: ${status}, Allowed: ${allowedStatuses.join(
          ', '
        )}`
      )
      return {
        notFound: true,
      }
    }

    const sidebarfallback = await getNavigation()
    serialized = JSON.parse(JSON.stringify(serialized))

    logger.info(`Processing ${slug}`)
    const seeAlsoData: {
      url: string
      title: string
      category: string
    }[] = []
    const seeAlsoUrls = serialized.frontmatter?.seeAlso
      ? JSON.parse(JSON.stringify(serialized.frontmatter.seeAlso as string))
      : []
    await Promise.all(
      seeAlsoUrls.map(async (seeAlsoUrl: string) => {
        const seeAlsoPath = docsPaths[seeAlsoUrl.split('/')[3]].find(
          (e) => e.locale === locale
        )?.path
        if (seeAlsoPath) {
          try {
            const documentationContent =
              (await fetch(
                `https://raw.githubusercontent.com/vtexdocs/content-portal-content/main/${seeAlsoPath}`
              )
                .then((res) => res.text())
                .catch((err) => console.log(err))) || ''

            const serialized = await serialize(documentationContent, {
              parseFrontmatter: true,
            })
            seeAlsoData.push({
              url: seeAlsoUrl,
              title: serialized.frontmatter?.title
                ? (serialized.frontmatter.title as string)
                : seeAlsoUrl.split('/')[3],
              category: serialized.frontmatter?.category
                ? (serialized.frontmatter.category as string)
                : seeAlsoUrl.split('/')[2],
            })
          } catch (error) {}
        } else if (seeAlsoUrl.startsWith('/docs')) {
          seeAlsoData.push({
            url: seeAlsoUrl,
            title: seeAlsoUrl.split('/')[3],
            category: seeAlsoUrl.split('/')[2],
          })
        }
      })
    )

    const docsListSlugObjects = jp.query(
      sidebarfallback,
      `$..[?(@.type=='markdown')]..slug`
    )
    const docsListNameObjects = jp.query(
      sidebarfallback,
      `$..[?(@.type=='markdown')]..name`
    )

    const docsListSlug = docsListSlugObjects
      .map((slugObj: Record<string, string> | string) => {
        if (typeof slugObj === 'object' && slugObj[currentLocale]) {
          return slugObj[currentLocale]
        } else if (typeof slugObj === 'string') {
          return slugObj
        }
        return (slugObj as Record<string, string>)?.en || null
      })
      .filter(Boolean)

    const docsListName = docsListNameObjects.map(
      (nameObj: Record<string, string> | string) => {
        if (typeof nameObj === 'object') {
          return nameObj
        }
        return { [currentLocale]: nameObj as string }
      }
    )

    const indexOfSlug = docsListSlug.indexOf(slug)

    logger.info(
      `Slug matching for ${slug}: found at index ${indexOfSlug} in ${docsListSlug.length} total docs`
    )

    const pagination = {
      previousDoc: {
        slug:
          indexOfSlug > 0 && docsListSlug[indexOfSlug - 1]
            ? docsListSlug[indexOfSlug - 1]
            : null,
        name:
          indexOfSlug > 0 && docsListName[indexOfSlug - 1]
            ? docsListName[indexOfSlug - 1][currentLocale] ||
              docsListName[indexOfSlug - 1]['en']
            : null,
      },
      nextDoc: {
        slug:
          indexOfSlug >= 0 &&
          indexOfSlug < docsListSlug.length - 1 &&
          docsListSlug[indexOfSlug + 1]
            ? docsListSlug[indexOfSlug + 1]
            : null,
        name:
          indexOfSlug >= 0 &&
          indexOfSlug < docsListSlug.length - 1 &&
          docsListName[indexOfSlug + 1]
            ? docsListName[indexOfSlug + 1][currentLocale] ||
              docsListName[indexOfSlug + 1]['en']
            : null,
      },
    }

    const flattenedSidebar = flattenJSON(sidebarfallback)
    const isListed: boolean = getKeyByValue(flattenedSidebar, slug)
      ? true
      : false
    const keyPath = getKeyByValue(flattenedSidebar, slug)
    const parentsArray: string[] = []
    const parentsArrayName: string[] = []
    const parentsArrayType: string[] = []
    let sectionSelected = ''
    if (keyPath) {
      const englishSectionName = flattenedSidebar[`${keyPath[0]}.documentation`]
      sectionSelected = getTranslatedSectionName(
        sidebarfallback,
        englishSectionName,
        currentLocale
      )
      getParents(
        keyPath,
        'name',
        flattenedSidebar,
        currentLocale,
        parentsArrayName
      )
      getParents(keyPath, 'slug', flattenedSidebar, currentLocale, parentsArray)
      if (indexOfSlug >= 0 && docsListName[indexOfSlug]) {
        const currentDocName =
          docsListName[indexOfSlug][currentLocale] ||
          docsListName[indexOfSlug]['en']
        if (currentDocName) {
          parentsArrayName.push(currentDocName)
          logger.info(
            `Added document name to breadcrumbs: ${currentDocName} for slug: ${slug}`
          )
        } else {
          logger.warn(
            `Document name not found for slug: ${slug} in locale: ${currentLocale}. Available locales: ${Object.keys(
              docsListName[indexOfSlug] || {}
            ).join(', ')}`
          )
        }
      } else {
        logger.warn(
          `Document not found in navigation for slug: ${slug} (index: ${indexOfSlug})`
        )
      }
    }

    try {
      if (resolvedPath.endsWith('.md')) {
        documentationContent = escapeCurlyBraces(documentationContent)
        documentationContent = replaceHTMLBlocks(documentationContent)
        documentationContent = await replaceMagicBlocks(documentationContent)
      }
    } catch (error) {
      logger.error(`Error processing markdown for ${resolvedPath}: ${error}`)
      format = 'md'
    }

    parentsArray.push(slug)
    const sanitizedParentsArray = parentsArray.map((item) =>
      item === undefined ? null : item
    )

    const breadcrumbList: { slug: string; name: string; type: string }[] =
      getBreadcrumbsList(
        parentsArray,
        parentsArrayName,
        parentsArrayType,
        'tracks'
      )

    return {
      props: {
        sectionSelected,
        parentsArray: sanitizedParentsArray,
        slug,
        serialized,
        headingList,
        contributors,
        path: resolvedPath,
        seeAlsoData,
        pagination,
        isListed,
        breadcrumbList,
        branch,
        locale: currentLocale,
      },
      revalidate: 3600,
    }
  } catch (error) {
    logger.error(`Error while processing ${resolvedPath}\n${error}`)
    return {
      notFound: true,
      revalidate: 3600,
    }
  }
}

export default AiArticlePage
