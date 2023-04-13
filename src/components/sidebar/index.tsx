import { useEffect, useRef, useState, useContext } from 'react'
import { Flex, Text, Box } from '@vtex/brand-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { flattenJSON, getKeysByValue, getParents } from 'utils/navigation-utils'

import styles from './styles'
import type { SidebarSectionProps } from 'components/sidebar-section'
import type { DocDataElement, UpdatesDataElement } from 'utils/typings/types'
import { DocumentationTitle, UpdatesTitle } from 'utils/typings/unionTypes'
import {
  documentationData as docsIcons,
  updatesData as notesIcons,
} from 'utils/constants'

import SidebarSection from 'components/sidebar-section'
import Tooltip from 'components/tooltip'
import { iconTooltipStyle } from './functions'

import { SidebarContext } from 'utils/contexts/sidebar'
import useNavigation from 'utils/hooks/useNavigation'
import { useIntl } from 'react-intl'

interface SideBarSectionState {
  sectionSelected?: DocumentationTitle | UpdatesTitle | ''
  parentsArray?: string[]
}

const Sidebar = ({
  sectionSelected = 'API Reference',
  parentsArray = [],
}: SideBarSectionState) => {
  const [activeSectionName, setActiveSectionName] = useState(sectionSelected)
  const [expandDelayStatus, setExpandDelayStatus] = useState(true)
  const {
    activeSidebarElement,
    sidebarDataMaster,
    setSidebarDataMaster,
    setActiveSidebarElement,
    openSidebarElement,
    closeSidebarElements,
    isEditorPreview,
  } = useContext(SidebarContext)

  const sidebarNavigation = useNavigation().data

  useEffect(() => {
    if (!isEditorPreview) setSidebarDataMaster(sidebarNavigation)
  }, [sidebarNavigation])
  const intl = useIntl()

  const router = useRouter()
  const flattenedSidebar = flattenJSON(sidebarNavigation)
  let activeSlug = ''
  let keyPath: string[] = []
  const querySlug = router.query.slug
  if (querySlug && router.pathname === '/docs/api-reference/[slug]') {
    activeSlug = router.asPath.replace('/docs/api-reference/', '')
    const docPath = activeSlug.split('/')
    const endpoint = '/' + docPath.splice(1, docPath.length).join('/')
    keyPath = getKeysByValue(flattenedSidebar, endpoint)
    if (endpoint == '/') {
      activeSlug = docPath[0].split('#')[0]
    }
    parentsArray.push(activeSlug)
    keyPath.forEach((key: string) => {
      if (key.length > 0)
        getParents(
          key,
          'slug',
          flattenedSidebar,
          parentsArray,
          activeSlug.split('#')[0]
        )
    })
  } else {
    activeSlug = parentsArray[parentsArray.length - 1]
  }

  useEffect(() => {
    const timer = setTimeout(() => setExpandDelayStatus(false), 5000)
    closeSidebarElements(parentsArray)
    setActiveSectionName(sectionSelected)
    parentsArray.forEach((slug: string) => {
      openSidebarElement(slug)
    })
    setActiveSidebarElement(activeSlug)
    return () => {
      clearTimeout(timer)
    }
  }, [activeSidebarElement, router])

  const SideBarIcon = (iconElement: DocDataElement | UpdatesDataElement) => {
    const [iconTooltip, setIconTooltip] = useState(false)
    const [tooltipLabel, setTooltipLabel] = useState(iconElement.title)
    const titleRef = useRef<HTMLElement>()

    useEffect(() => {
      const resizeObserver = new MutationObserver(function (entries) {
        const target = entries[0].target as HTMLElement
        if (target.offsetWidth < target.scrollWidth) setIconTooltip(true)
        else setIconTooltip(false)

        if (target.offsetWidth > 0)
          setTooltipLabel(target.innerText as DocumentationTitle | UpdatesTitle)
      })
      if (titleRef.current) {
        if (titleRef.current.offsetWidth < titleRef.current.scrollWidth)
          setIconTooltip(true)
        resizeObserver.observe(titleRef.current, {
          childList: true,
        })
      }
      return () => {
        resizeObserver.disconnect
      }
    }, [titleRef.current])

    return (
      <Box sx={styles.linkContainer}>
        <Tooltip
          sx={iconTooltipStyle(iconTooltip)}
          placement="right"
          label={tooltipLabel}
        >
          <Link
            href={!isEditorPreview ? iconElement.link : '/'}
            onClick={(e) => {
              if (isEditorPreview) {
                e.preventDefault()
              }
              setActiveSectionName(iconElement.title)
            }}
            passHref
            aria-label={iconElement.title}
          >
            <Flex
              sx={
                activeSectionName === iconElement.title
                  ? styles.iconBoxActive
                  : styles.iconBox
              }
            >
              <iconElement.Icon
                sx={
                  activeSectionName === iconElement.title
                    ? styles.iconActive
                    : styles.icon
                }
              />
              <Text
                className={expandDelayStatus ? 'iconDescriptionExpanded' : ''}
                ref={titleRef}
                sx={styles.iconTitle}
              >
                {iconElement.title}
              </Text>
            </Flex>
          </Link>
        </Tooltip>
      </Box>
    )
  }

  return (
    <Flex sx={styles.sidebar}>
      <Flex
        className={expandDelayStatus ? 'iconContainerExpanded' : ''}
        sx={styles.sidebarIcons}
      >
        <Flex sx={styles.sidebarIconsContainer}>
          {docsIcons(intl).map((docsIconElement) => (
            <SideBarIcon
              {...docsIconElement}
              key={`sidebar-icon-${docsIconElement.title}`}
            />
          ))}
        </Flex>
        <Box sx={styles.sectionDivider}>
          <hr />
        </Box>
        <Flex sx={styles.sidebarIconsContainer}>
          {notesIcons(intl).map((notesIconElement) => (
            <SideBarIcon
              {...notesIconElement}
              key={`sidebar-icon-${notesIconElement.title}`}
            />
          ))}
        </Flex>
      </Flex>
      {activeSectionName ? (
        <SidebarSection
          {...(Array.isArray(sidebarDataMaster)
            ? sidebarDataMaster?.find(
                (section: SidebarSectionProps) =>
                  section.documentation === activeSectionName
              )
            : null)}
        />
      ) : null}
    </Flex>
  )
}

export default Sidebar
