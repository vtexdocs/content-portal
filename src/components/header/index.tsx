import {
  Box,
  Flex,
  Header as HeaderBrand,
  Text,
  Link as VtexLink,
} from '@vtex/brand-ui'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import DropdownMenu from 'components/dropdown-menu'
import GridIcon from 'components/icons/grid-icon'
import LongArrowIcon from 'components/icons/long-arrow-icon'
import ContentPortalIcon from 'components/icons/Contentportal-icon'
import { getFeedbackURL } from 'utils/get-url'
import { FormattedMessage } from 'react-intl'
import styles from './styles'
import CloseIcon from 'components/icons/close-icon'

const Header = () => {
  const router = useRouter()
  const lastScroll = useRef(0)
  const modalOpen = useRef(false)
  const headerElement = useRef<HTMLElement>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
    setShowDropdown((prev) => !prev) // Also toggle dropdown visibility
  }

  useEffect(() => {
    const observer = new MutationObserver(() => {
      modalOpen.current = !modalOpen.current
      if (headerElement.current) {
        headerElement.current.style.top = modalOpen.current
          ? `-${headerElement.current.children[0].clientHeight}px`
          : '0'
      }
    })
    observer.observe(document.body, { attributeFilter: ['style'] })
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setShowDropdown(false)
      if (headerElement.current && !modalOpen.current) {
        const headerHeight = headerElement.current.children[0].clientHeight
        headerElement.current.style.top =
          window.scrollY > headerHeight && window.scrollY > lastScroll.current
            ? `-${headerHeight}px`
            : '0'
        lastScroll.current = window.scrollY
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    router.events.on('routeChangeStart', () => setShowDropdown(false))
    return () =>
      router.events.off('routeChangeStart', () => setShowDropdown(false))
  }, [router.events])

  return (
    <Box ref={headerElement} sx={styles.headerContainer}>
      <HeaderBrand sx={styles.headerBrand}>
        <VtexLink
          aria-label="Go back to Home"
          href="/"
          sx={styles.headerBrandLink}
        >
          <ContentPortalIcon sx={styles.logoSize} />
        </VtexLink>

        <HeaderBrand.RightLinks sx={styles.rightLinks}>
          <Flex
            sx={styles.dropdownContainer}
            // onMouseOver={() => setShowDropdown(true)}  //Remove these events
            // onMouseLeave={() => setShowDropdown(false)}  //Remove these events
          >
            <Flex sx={styles.dropdownButton(showDropdown)} onClick={toggleMenu}>
              {menuOpen ? <CloseIcon /> : <GridIcon />}
              <Text sx={styles.rightButtonsText} data-cy="docs-dropdown">
                <FormattedMessage id="landing_page_header_docs.message" />
              </Text>
            </Flex>
            {showDropdown && <DropdownMenu />}
          </Flex>

          {!menuOpen && (
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
          )}
        </HeaderBrand.RightLinks>
      </HeaderBrand>
    </Box>
  )
}

export default Header
