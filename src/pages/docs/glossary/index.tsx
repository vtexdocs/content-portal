import PageHeader from 'components/page-header'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import { Fragment, useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { PreviewContext } from 'utils/contexts/preview'
import getNavigation from 'utils/getNavigation'
import { DocumentationTitle, UpdatesTitle } from 'utils/typings/unionTypes'
import GrammarImage from '../../../../public/images/cs-grammar_desktop.png'
import GrammarImageMobile from '../../../../public/images/cs-grammar_mobile.png'
import styles from './glossary.module.css'
import { glossaryData } from './glossaryData'

declare global {
  interface Window {
    jQuery: any
    DataTable: any
  }
}

interface Props {
  sidebarfallback: any //eslint-disable-line
  sectionSelected?: DocumentationTitle | UpdatesTitle | ''
  branch: string
}


const TracksPage: NextPage<Props> = ({ branch }) => {
  const { setBranchPreview } = useContext(PreviewContext)
  const intl = useIntl()
  const [dataTable, setDataTable] = useState<any>(null)

  setBranchPreview(branch)

  const handleScriptLoad = () => {
    if (typeof window.jQuery === 'function' && !dataTable) {
      const table = window.jQuery('#glossaryTable').DataTable({
        destroy: true,
        language: {
          search: 'Search:',
          lengthMenu: 'View _MENU_ items per page',
          info: 'Viewing from _START_ to _END_ of _TOTAL_ items',
          paginate: {
            first: 'First',
            last: 'Last',
            next: 'Next',
            previous: 'Previous',
          },
        },
      })
      setDataTable(table)
    }
  }

  useEffect(() => {
    return () => {
      if (dataTable) {
        dataTable.destroy()
      }
    }
  }, [dataTable])

  return (
    <>
      <Head>
        <title>
          {intl.formatMessage({
            id: 'glossary_card_title',
          })}
        </title>
        <meta
          property="og:title"
          content={intl.formatMessage({
            id: 'glossary_card_subtitle',
          })}
          key="title"
        />
        <link
          rel="stylesheet"
          href="https://cdn.datatables.net/2.3.2/css/dataTables.dataTables.css"
        />
      </Head>
      <Fragment>
        <PageHeader
          title={intl.formatMessage({
            id: 'glossary_card_title',
          })}
          description={intl.formatMessage({
            id: 'glossary_card_subtitle',
          })}
          imageUrlDesktop={GrammarImage}
          imageUrlMobile={GrammarImageMobile}
          imageAlt={intl.formatMessage({
            id: 'glossary_card_subtitle',
          })}
        />

        <div className={styles.dataTableContainer}>
          <div className="content">
            <table
              id="glossaryTable"
              className="display"
              style={{ width: '100%' }}
            >
              <thead>
                <tr>
                  <th>Term</th>
                  <th>Definition</th>
                </tr>
              </thead>
              <tbody>
                {glossaryData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.term}</td>
                    <td>{item.definition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>

      <Script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.datatables.net/2.3.2/js/dataTables.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  preview,
  previewData,
}) => {
  const sidebarfallback = await getNavigation()
  const sectionSelected = 'Glossary'

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
