import PageHeader from 'components/page-header'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import { Fragment, useContext, useEffect, useState, useRef } from 'react'
import { useIntl } from 'react-intl'
import { PreviewContext } from 'utils/contexts/preview'
import getNavigation from 'utils/getNavigation'
import { DocumentationTitle, UpdatesTitle } from 'utils/typings/unionTypes'
import {
  getCrowdinGlossaryData,
  FormattedGlossaryEntry,
} from 'utils/crowdin-apis/crowdinController'

import GrammarImage from '../../../../public/images/cs-grammar_desktop.png'
import GrammarImageMobile from '../../../../public/images/cs-grammar_mobile.png'
import styles from './glossary.module.css'

declare global {
  interface Window {
    jQuery: any //eslint-disable-line
    DataTable: any //eslint-disable-line
  }
}

interface Props {
  sidebarfallback: any //eslint-disable-line
  sectionSelected?: DocumentationTitle | UpdatesTitle | ''
  branch: string
  glossaryData: FormattedGlossaryEntry[]
}

const TermCell = ({ term }: { term: FormattedGlossaryEntry['term_en_US'] }) => {
  const intl = useIntl()

  if (!term || !term.text) {
    return <></>
  }

  const isObsolete = term.status === 'obsolete'
  const isNotRecommended = term.status === 'not_recommended'

  if (!isObsolete && !isNotRecommended) {
    return <>{term.text}</>
  }

  const badgeClass = isObsolete
    ? styles.badgeObsolete
    : styles.badgeNotRecommended
  const badgeTextId = isObsolete
    ? 'glossary_status_obsolete'
    : 'glossary_status_not_recommended'

  return (
    <div>
      <span>{term.text}</span>
      <br />
      <span className={`${styles.badge} ${badgeClass}`}>
        {intl.formatMessage({ id: badgeTextId })}
      </span>
    </div>
  )
}

const GlossaryPage: NextPage<Props> = ({ branch, glossaryData }) => {
  const { setBranchPreview } = useContext(PreviewContext)
  const intl = useIntl()
  const [dataTableInstance, setDataTableInstance] = useState<any>(null) //eslint-disable-line
  const [areScriptsLoaded, setAreScriptsLoaded] = useState(false)
  const jQueryLoadedRef = useRef(false)

  setBranchPreview(branch)

  const initializeDataTable = () => {
    if (
      areScriptsLoaded &&
      window.jQuery &&
      window.jQuery.fn.DataTable &&
      glossaryData.length > 0 &&
      !dataTableInstance
    ) {
      console.log('Attempting to initialize DataTable...')
      try {
        const table = window.jQuery('#glossaryTable').DataTable({
          destroy: true,
          paging: true,
          searching: true,
          info: true,
          language: {
            search: intl.formatMessage({ id: 'glossary_datatable_search' }),
            lengthMenu: intl.formatMessage({
              id: 'glossary_datatable_length_menu',
            }),
            info: intl.formatMessage({ id: 'glossary_datatable_info' }),
            paginate: {
              first: intl.formatMessage({
                id: 'glossary_datatable_paginate_first',
              }),
              last: intl.formatMessage({
                id: 'glossary_datatable_paginate_last',
              }),
              next: intl.formatMessage({
                id: 'glossary_datatable_paginate_next',
              }),
              previous: intl.formatMessage({
                id: 'glossary_datatable_paginate_previous',
              }),
            },
          },
        })
        setDataTableInstance(table)
        console.log('DataTable initialized successfully.')
      } catch (error) {
        console.error('Error initializing DataTable:', error)
      }
    } else if (glossaryData.length === 0) {
      console.warn('No glossary data available to initialize DataTable.')
    } else if (dataTableInstance) {
      console.log(
        'DataTable instance already exists, skipping re-initialization.'
      )
    } else if (!areScriptsLoaded) {
      console.log('Scripts not yet loaded, deferring DataTable initialization.')
    }
  }

  useEffect(() => {
    initializeDataTable()

    return () => {
      if (dataTableInstance) {
        console.log('Destroying DataTable instance during cleanup.')
        dataTableInstance.destroy()
        setDataTableInstance(null)
      }
    }
  }, [glossaryData, areScriptsLoaded])

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
            {glossaryData && glossaryData.length > 0 ? (
              <table
                id="glossaryTable"
                className="display"
                style={{ width: '100%' }}
              >
                <thead>
                  <tr>
                    <th>
                      {intl.formatMessage({ id: 'glossary_table_header_id' })}
                    </th>
                    <th>
                      {intl.formatMessage({
                        id: 'glossary_table_header_term_en_us',
                      })}
                    </th>
                    <th>
                      {intl.formatMessage({
                        id: 'glossary_table_header_term_es_mx',
                      })}
                    </th>
                    <th>
                      {intl.formatMessage({
                        id: 'glossary_table_header_term_pt_br',
                      })}
                    </th>
                    <th>
                      {intl.formatMessage({
                        id: 'glossary_table_header_definition',
                      })}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {glossaryData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        <TermCell term={item.term_en_US} />
                      </td>
                      <td>
                        <TermCell term={item.term_es_MX} />
                      </td>
                      <td>
                        <TermCell term={item.term_pt_BR} />
                      </td>
                      <td>{item.definition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>{intl.formatMessage({ id: 'glossary_no_data_available' })}</p>
            )}
          </div>
        </div>
      </Fragment>

      <Script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window.jQuery === 'function') {
            console.log('jQuery script loaded.')
            jQueryLoadedRef.current = true
          }
        }}
      />
      <Script
        src="https://cdn.datatables.net/2.3.2/js/dataTables.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (
            jQueryLoadedRef.current &&
            typeof window.jQuery.fn.DataTable === 'function'
          ) {
            console.log(
              'DataTables script loaded and jQuery is ready. Setting scripts loaded state.'
            )
            setAreScriptsLoaded(true)
          } else {
            console.error(
              'DataTables script loaded but jQuery or DataTable function not found, or jQuery not fully initialized.'
            )
            if (!jQueryLoadedRef.current)
              console.error('jQuery was not marked as loaded.')
            if (typeof window.jQuery !== 'function')
              console.error('window.jQuery is not a function.')
            if (typeof window.jQuery.fn.DataTable !== 'function')
              console.error('window.jQuery.fn.DataTable is not a function.')
          }
        }}
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

  const glossaryData = await getCrowdinGlossaryData()
  console.log(`getStaticProps fetched ${glossaryData.length} entries.`)

  return {
    props: {
      sidebarfallback,
      sectionSelected,
      branch,
      glossaryData,
    },
    revalidate: 3600,
  }
}

export default GlossaryPage
