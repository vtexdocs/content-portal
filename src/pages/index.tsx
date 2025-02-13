import { Grid } from '@vtex/brand-ui'
import type { Page } from 'utils/typings/types'
import DocumentationSection from 'components/documentation-section'
import NewsletterSection from 'components/newsletter-section'

import FaqSection from 'components/faq-section'
import SupportSection from 'components/support-section'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useContext } from 'react'
import styles from 'styles/landing-page'
import { PreviewContext } from 'utils/contexts/preview'
import getAnnouncementsJson from 'utils/getAnnouncementsJson'
import getNavigation from 'utils/getNavigation'
import { localeType } from 'utils/navigation-utils'

interface Props {
  branch: string
  announcementTimelineData: { title: string; date: string }[]
}

const Home: Page<Props> = ({ branch }) => {
  const { setBranchPreview } = useContext(PreviewContext)
  setBranchPreview(branch)

  return (
    <>
      <Head>
        <title>VTEX Content Style Guide</title>
        <meta
          property="og:title"
          content="VTEX Content Style Guide"
          key="title"
        />
        <meta
          property="og:description"
          content="All things language for users of words at VTEX"
          key="desc"
        />
        {/* <meta
          property="og:image"
          content="https://cdn.jsdelivr.net/gh/vtexdocs/devportal@main/public/images/meta-image.png"
        /> */}
      </Head>
      <Grid sx={styles.grid}>
        <NewsletterSection />
        <DocumentationSection />
        <FaqSection />
        <SupportSection />
      </Grid>
    </>
  )
}

Home.hideSidebar = true

export const getStaticProps: GetStaticProps = async ({
  locale,
  preview,
  previewData,
}) => {
  const sidebarfallback = await getNavigation()
  const previewBranch =
    preview && JSON.parse(JSON.stringify(previewData)).hasOwnProperty('branch')
      ? JSON.parse(JSON.stringify(previewData)).branch
      : 'main'
  const branch = preview ? previewBranch : 'main'
  const currentLocale: localeType = locale
    ? (locale as localeType)
    : ('en' as localeType)

  const announcementTimelineData: {
    title: string
    date: string
  }[] = []

  const announcementJson = await getAnnouncementsJson()

  for (let i = 0; i < announcementJson.length; i++) {
    const announcement = announcementJson[i]
    announcementTimelineData.push({
      title: announcement.title[currentLocale],
      date: String(announcement.date),
    })

    announcementTimelineData.push()
  }

  return {
    props: {
      sidebarfallback,
      branch,
      announcementTimelineData,
    },
  }
}

export default Home
