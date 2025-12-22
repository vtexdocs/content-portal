import {
  Header as HeaderBrand,
  Link as VtexLink,
  Flex,
  Text,
  Box,
} from '@vtex/brand-ui'
import { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { HamburgerMenu } from '@vtexdocs/components'
import { SearchInput } from '@vtexdocs/components'
import DropdownMenu from 'components/dropdown-menu'
import AgentsDropdown from 'components/agents-dropdown'
import AgentsTooltip from 'components/agents-tooltip'
import GridIcon from 'components/icons/grid-icon'
import AgentsIcon from 'components/icons/agents'
import LongArrowIcon from 'components/icons/long-arrow-icon'
import { getFeedbackURL } from 'utils/get-url'
import { getCookie, setCookie, AGENTS_INTERACTED_COOKIE } from 'utils/cookies'
import { listenToToggleAgentsDropdown } from 'utils/events'

import AnnouncementBar from 'components/announcement-bar'
import LocaleSwitcher from 'components/locale-switcher'

import styles from './styles'
import { PreviewContext } from 'utils/contexts/preview'
import { FormattedMessage } from 'react-intl'
import ContentPortalIcon from 'components/icons/Contentportal-icon'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Header = () => {
  const router = useRouter()
  const isBranchPreview = router.isPreview

  const { branchPreview } = useContext(PreviewContext)

  const lastScroll = useRef(0)
  const modalOpen = useRef(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showAgentsDropdown, setShowAgentsDropdown] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const headerElement = useRef<HTMLElement>()

  // Check if user has interacted with Agents menu and if on internal page
  useEffect(() => {
    const hasInteracted = getCookie(AGENTS_INTERACTED_COOKIE)
    const isHomePage = router.pathname === '/'

    // Show tooltip only if user hasn't interacted and is NOT on home page
    setShowTooltip(!hasInteracted && !isHomePage)
  }, [router.pathname])

  const handleAgentsClick = () => {
    // Set cookie when user interacts with Agents menu
    setCookie(AGENTS_INTERACTED_COOKIE, 'true', 365)
    setShowTooltip(false)
  }

  // Listen to toggle event from AgentsCallout
  useEffect(() => {
    const cleanup = listenToToggleAgentsDropdown(() => {
      setShowAgentsDropdown(true)
      // Scroll to top to ensure dropdown is visible
      window.scrollTo({ top: 0, behavior: 'smooth' })
      // Auto-close after 10 seconds
      setTimeout(() => {
        setShowAgentsDropdown(false)
      }, 10000)
    })

    return cleanup
  }, [])

  useEffect(() => {
    const body = document.body

    const observer = new MutationObserver(() => {
      modalOpen.current = !modalOpen.current
      if (headerElement.current) {
        if (modalOpen.current) {
          const headerHeight = headerElement.current.children[0].clientHeight
          headerElement.current.style.top = `-${headerHeight}px`
        } else {
          headerElement.current.style.top = '0'
        }
      }
    })
    observer.observe(body, {
      attributeFilter: ['style'],
    })
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setShowDropdown(false)
      setShowAgentsDropdown(false)
      if (headerElement.current && !modalOpen.current) {
        const headerHeight = headerElement.current.children[0].clientHeight
        if (
          window.scrollY > headerHeight &&
          window.scrollY > lastScroll.current
        ) {
          headerElement.current.style.top = `-${headerHeight}px`
        } else {
          headerElement.current.style.top = '0'
        }
        lastScroll.current = window.scrollY
      }
    }

    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [headerElement.current])

  useEffect(() => {
    const hideDropdowns = () => {
      setShowDropdown(false)
      setShowAgentsDropdown(false)
    }

    router.events.on('routeChangeStart', hideDropdowns)
    return () => router.events.off('routeChangeStart', hideDropdowns)
  }, [])

  return (
    <Box ref={headerElement} sx={styles.headerContainer}>
      {!isBranchPreview ? null : (
        <AnnouncementBar
          closable={false}
          type="warning"
          label={`🚧 You are currently using branch ${branchPreview} in preview mode. This content may differ from the published version.`}
          action={{
            button: 'EXIT PREVIEW MODE',
            href: '/api/disable-preview',
          }}
        ></AnnouncementBar>
      )}
      <HeaderBrand sx={styles.headerBrand}>
        <VtexLink
          aria-label="Go back to Home"
          href="/"
          sx={styles.headerBrandLink}
        >
          <ContentPortalIcon sx={styles.logoSize} />
        </VtexLink>

        <Box sx={styles.searchContainer}>
          <SearchInput />
        </Box>

        <HeaderBrand.RightLinks sx={styles.rightLinks}>
          <Flex
            sx={styles.dropdownContainer}
            onMouseOver={() => setShowAgentsDropdown(true)}
            onMouseLeave={() => setShowAgentsDropdown(false)}
            onClick={handleAgentsClick}
          >
            <Flex sx={styles.dropdownButton(showAgentsDropdown)}>
              <AgentsIcon />
              <Text sx={styles.rightButtonsText} data-cy="agents-dropdown">
                <FormattedMessage id="landing_page_header_agents.message" />
              </Text>
            </Flex>

            {showAgentsDropdown && (
              <AgentsDropdown onLinkClick={handleAgentsClick} />
            )}
            <AgentsTooltip show={showTooltip && !showAgentsDropdown} />
          </Flex>

          <Flex
            sx={{ ...styles.dropdownContainer, marginLeft: '32px' }}
            onMouseOver={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <Flex sx={styles.dropdownButton(showDropdown)}>
              <GridIcon />
              <Text sx={styles.rightButtonsText} data-cy="docs-dropdown">
                {' '}
                {/*TODO: mudar data-cy no teste */}
                <FormattedMessage id="landing_page_header_docs.message" />
              </Text>
            </Flex>

            {showDropdown && <DropdownMenu />}
          </Flex>

          <VtexLink
            sx={styles.rightLinksItem}
            href={getFeedbackURL()}
            target="_blank"
          >
            <LongArrowIcon />
            <Text sx={styles.rightButtonsText}>
              <FormattedMessage id="landing_page_header_feedback.message" />
            </Text>
          </VtexLink>
          <Flex sx={styles.containerHamburguerLocale}>
            <HamburgerMenu />
            <Box sx={styles.splitter}></Box>
            <Box sx={styles.localeSwitcherContainer}>
              <LocaleSwitcher />
            </Box>
          </Flex>
        </HeaderBrand.RightLinks>
      </HeaderBrand>
    </Box>
  )
}

export default Header
