import { Box, Flex, Text } from '@vtex/brand-ui'
import PageHeader from 'components/page-header'
import WhatsNextCard from 'components/whats-next-card'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Fragment, useContext } from 'react'
import { useIntl } from 'react-intl'
import styles from 'styles/documentation-landing-page'
import { PreviewContext } from 'utils/contexts/preview'
import getNavigation from 'utils/getNavigation'
import { DocumentationTitle, UpdatesTitle } from 'utils/typings/unionTypes'
import GuidesImage from '../../../../public/images/cs-guides_desktop.png'
import GuidesImageMobile from '../../../../public/images/cs-guides_mobile.png'

interface Props {
  sidebarfallback: any //eslint-disable-line
  sectionSelected?: DocumentationTitle | UpdatesTitle | ''
  branch: string
}

const ContentSection = ({ id, length }: { id: string; length: number }) => {
  const intl = useIntl()

  return (
    <>
      <Text sx={styles.contentTitle}>
        {intl.formatMessage({ id: `${id}.title` })}
      </Text>
      <Flex sx={styles.cardsContainer}>
        {Array(length)
          .fill('')
          .map((_, index) => {
            if (!intl.messages[`${id}.content.${index}.title`]) return <></>
            return (
              <WhatsNextCard
                title={intl.formatMessage({
                  id: `${id}.content.${index}.title`,
                })}
                description={intl.formatMessage({
                  id: `${id}.content.${index}.description`,
                })}
                linkTitle={intl.formatMessage({
                  id: 'start_here_see_more',
                })}
                linkTo={intl.formatMessage({
                  id: `${id}.content.${index}.link`,
                })}
                key={intl.formatMessage({ id: `${id}.content.${index}.title` })}
              />
            )
          })}
      </Flex>
    </>
  )
}

const TracksPage: NextPage<Props> = ({ branch }) => {
  const { setBranchPreview } = useContext(PreviewContext)
  const intl = useIntl()
  setBranchPreview(branch)
  return (
    <>
      <Head>
        <title>
          {intl.formatMessage({
            id: 'guides_card_title',
          })}
        </title>
        <meta
          property="og:title"
          content={intl.formatMessage({
            id: 'guides_card_subtitle',
          })}
          key="title"
        />
      </Head>
      <Fragment>
        <PageHeader
          title={intl.formatMessage({
            id: 'guides_card_title',
          })}
          description={intl.formatMessage({
            id: 'guides_card_subtitle',
          })}
          imageUrlDesktop={GuidesImage}
          imageUrlMobile={GuidesImageMobile}
          imageAlt={intl.formatMessage({
            id: 'guides_card_subtitle',
          })}
        />
        <Box sx={styles.contentContainer}>
          <ContentSection id={'guides_page_section'} length={5} />
        </Box>
      </Fragment>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  preview,
  previewData,
}) => {
  const sidebarfallback = await getNavigation()
  const sectionSelected = 'Guides'

  const previewBranch =
    preview && JSON.parse(JSON.stringify(previewData)).hasOwnProperty('branch')
      ? JSON.parse(JSON.stringify(previewData)).branch
      : 'main'
  const branch = preview ? previewBranch : 'main'

  return {
    props: {
      sidebarfallback,
      sectionSelected,
      branch,
    },
  }
}

export default TracksPage
