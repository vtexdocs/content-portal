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

import GlossaryImage from '../../../../public/images/cs-glossary_desktop.png'
import GlossaryImageMobile from '../../../../public/images/cs-glossary_mobile.png'
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
  const isPreferred = term.status === 'preferred'

  if (!isObsolete && !isNotRecommended && !isPreferred) {
    return <>{term.text}</>
  }

  let statusCircleClass = ''
  let statusTooltipText = ''

  if (isObsolete) {
    statusCircleClass = styles.statusCircleObsolete
    statusTooltipText = intl.formatMessage({ id: 'glossary_status_avoid' })
  } else if (isNotRecommended) {
    statusCircleClass = styles.statusCircleNotRecommended
    statusTooltipText = intl.formatMessage({ id: 'glossary_status_dont_use' })
  } else if (isPreferred) {
    statusCircleClass = styles.statusCirclePreferred
    statusTooltipText = intl.formatMessage({ id: 'glossary_status_preffered' })
  }

  return (
    <div className={styles.termWithStatus}>
      <span>{term.text}</span>{' '}
      <span className={statusCircleClass} title={statusTooltipText}></span>
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
          stripeClasses: [], // Prevent default striping to avoid conflicts with custom styles. Not working yet.
          language: {
            searchPlaceholder: intl.formatMessage({
              id: 'glossary_datatable_search',
            }),
            search: '_INPUT_',
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
          columnDefs: [
            { width: '15%', targets: 0 }, // Term_en_US
            { width: '15%', targets: 1 }, // Term_es_MX
            { width: '15%', targets: 2 }, // Term_pt_BR
            { width: '55%', targets: 3 }, // Definition
          ],
          dom: ' <"top"fi><"clear">rt<"bottom"lp><"clear">',
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
          imageUrlDesktop={GlossaryImage}
          imageUrlMobile={GlossaryImageMobile}
          imageAlt={intl.formatMessage({
            id: 'glossary_card_subtitle',
          })}
        />

        <div className={styles.dataTableContainer}>
          <div className="content">
            <div className={styles.glossaryLegend}>
              <h3>{intl.formatMessage({ id: 'glossary_legend_title' })}</h3>
              <p>
                <span className={styles.statusCircleObsolete}></span>{' '}
                {intl.formatMessage({ id: 'glossary_status_avoid_full' })}
              </p>
              <p>
                <span className={styles.statusCircleNotRecommended}></span>{' '}
                {intl.formatMessage({ id: 'glossary_status_dont_use_full' })}
              </p>
              <p>
                <span className={styles.statusCirclePreferred}></span>{' '}
                {intl.formatMessage({ id: 'glossary_status_preffered_full' })}
              </p>
            </div>

            {glossaryData && glossaryData.length > 0 ? (
              <table
                id="glossaryTable"
                className="display"
                style={{ width: '100%' }}
              >
                <thead>
                  <tr>
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

export const getStaticProps: GetStaticProps = async ({}) => {
  const sidebarfallback = await getNavigation()
  const sectionSelected = 'Glossary'

  const glossaryData = await getCrowdinGlossaryData()
  console.log(`getStaticProps fetched ${glossaryData.length} entries.`)

  return {
    props: {
      sidebarfallback,
      sectionSelected,
      glossaryData,
    },
    revalidate: 3600,
  }
}

export default GlossaryPage
