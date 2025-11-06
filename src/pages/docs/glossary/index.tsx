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
  const legendRef = useRef<HTMLDivElement>(null)
  const initializationAttempted = useRef(false)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  setBranchPreview(branch)

  // Check if scripts are ready for initialization
  const checkScriptsReady = () => {
    return (
      typeof window !== 'undefined' &&
      typeof window.jQuery === 'function' &&
      typeof window.jQuery.fn.DataTable === 'function'
    )
  }

  // Initialize DataTable with retry logic
  const initializeDataTable = () => {
    // Skip if already initialized or no data
    if (dataTableInstance || glossaryData.length === 0) {
      return
    }

    console.log('Attempting to initialize DataTable...')

    if (!checkScriptsReady()) {
      console.log('Scripts not ready, will retry...')
      // Retry after a short delay
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
      retryTimeoutRef.current = setTimeout(() => {
        initializeDataTable()
      }, 200)
      return
    }

    try {
      // Clear any existing timeout
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
        retryTimeoutRef.current = null
      }

      // Check if table element exists
      const tableElement = document.getElementById('glossaryTable')
      if (!tableElement) {
        console.warn('Table element not found, retrying...')
        setTimeout(() => initializeDataTable(), 100)
        return
      }

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
          { width: '55%', targets: 3, searchable: false }, // Definition - excluded from search
        ],
        dom: '<"top"<"top-left"f><"top-right"i><"clear">rt<"bottom"lp><"clear">',
      })

      setDataTableInstance(table)
      initializationAttempted.current = true
      console.log('DataTable initialized successfully.')

      // Move legend after successful initialization
      setTimeout(() => {
        if (legendRef.current) {
          const topLeftContainer = document.querySelector('.top-left')
          if (
            topLeftContainer &&
            !topLeftContainer.contains(legendRef.current)
          ) {
            topLeftContainer.appendChild(legendRef.current)
          }
        }
      }, 100)
    } catch (error) {
      console.error('Error initializing DataTable:', error)
      // Retry once more after a delay
      if (!initializationAttempted.current) {
        console.log('Retrying DataTable initialization...')
        setTimeout(() => initializeDataTable(), 500)
      }
    }
  }

  // Effect to initialize DataTable when component mounts or data changes
  useEffect(() => {
    const timer = setTimeout(() => {
      initializeDataTable()
    }, 100) // Small delay to ensure DOM is ready

    return () => clearTimeout(timer)
  }, [glossaryData])

  // Effect to try initialization when scripts are loaded
  useEffect(() => {
    if (areScriptsLoaded || checkScriptsReady()) {
      initializeDataTable()
    }
  }, [areScriptsLoaded])

  // Effect to poll for scripts if they're not loaded yet
  useEffect(() => {
    if (!dataTableInstance && glossaryData.length > 0) {
      const pollInterval = setInterval(() => {
        if (checkScriptsReady()) {
          clearInterval(pollInterval)
          initializeDataTable()
        }
      }, 500)

      // Clear interval after 10 seconds to avoid infinite polling
      const timeout = setTimeout(() => {
        clearInterval(pollInterval)
      }, 10000)

      return () => {
        clearInterval(pollInterval)
        clearTimeout(timeout)
      }
    }

    // Always return a cleanup function or undefined
    return undefined
  }, [dataTableInstance, glossaryData])

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (dataTableInstance) {
        try {
          console.log('Destroying DataTable instance during cleanup.')
          dataTableInstance.destroy()
          setDataTableInstance(null)
        } catch (error) {
          console.warn('Error destroying DataTable:', error)
        }
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [dataTableInstance])

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
            <div ref={legendRef} className={styles.glossaryLegendInline}>
              <p>
                <span className={styles.statusCirclePreferred}></span>{' '}
                {intl.formatMessage({ id: 'glossary_status_preffered_full' })}
              </p>
              <p>
                <span className={styles.statusCircleObsolete}></span>{' '}
                {intl.formatMessage({ id: 'glossary_status_avoid_full' })}
              </p>
              <p>
                <span className={styles.statusCircleNotRecommended}></span>{' '}
                {intl.formatMessage({ id: 'glossary_status_dont_use_full' })}
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
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('jQuery script loaded.')
          jQueryLoadedRef.current = true

          // Check if DataTables is already available and trigger initialization
          if (checkScriptsReady()) {
            setAreScriptsLoaded(true)
            // Try to initialize immediately
            setTimeout(() => initializeDataTable(), 50)
          }
        }}
        onError={() => {
          console.error('Failed to load jQuery script')
        }}
      />
      <Script
        src="https://cdn.datatables.net/2.3.2/js/dataTables.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('DataTables script loaded.')

          // Wait a bit for jQuery to be fully ready if needed
          const checkAndInit = () => {
            if (checkScriptsReady()) {
              console.log('Both jQuery and DataTables are ready.')
              setAreScriptsLoaded(true)
              // Try to initialize immediately
              setTimeout(() => initializeDataTable(), 50)
            } else {
              // Retry after a short delay
              setTimeout(checkAndInit, 100)
            }
          }

          checkAndInit()
        }}
        onError={() => {
          console.error('Failed to load DataTables script')
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
