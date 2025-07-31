import PageHeader from 'components/page-header'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import { Fragment, useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { PreviewContext } from 'utils/contexts/preview'
import getNavigation from 'utils/getNavigation'
import { DocumentationTitle, UpdatesTitle } from 'utils/typings/unionTypes'
// Ajuste o caminho conforme a sua estrutura de pastas
import { glossaryData } from '../../../components/glossary-data/glossaryData'
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
}

const TracksPage: NextPage<Props> = ({ branch }) => {
  const { setBranchPreview } = useContext(PreviewContext)
  const intl = useIntl()
  const [dataTable, setDataTable] = useState<any>(null) //eslint-disable-line

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
                  <th>ID</th>
                  <th>Term en-US 🇺🇲</th>
                  <th>Term pt-BR 🇧🇷</th>
                  <th>Term es-MX 🇲🇽</th>
                  <th>Definition</th>
                  <th>Approval date</th>
                </tr>
              </thead>
              <tbody>
                {glossaryData.map((item) => {
                  // --- LÓGICA DE ESTILIZAÇÃO DINÂMICA ---
                  const statusClass =
                    item.status === 'obsolete'
                      ? styles.obsolete
                      : item.status === 'notRecommended'
                      ? styles.notRecommended
                      : ''

                  const hoverTitle =
                    item.status === 'obsolete'
                      ? 'Obsolete'
                      : item.status === 'notRecommended'
                      ? 'Not recommended'
                      : ''

                  return (
                    <tr
                      key={item.id}
                      className={statusClass}
                      title={hoverTitle}
                    >
                      <td>{item.id}</td>
                      <td>{item.term_en_US}</td>
                      <td>{item.term_pt_BR}</td>
                      <td>{item.term_es_MX}</td>
                      <td>{item.definition}</td>
                      <td>{item.approvalDate}</td>
                    </tr>
                  )
                })}
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
