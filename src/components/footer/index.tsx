import { Box, Flex, Link } from '@vtex/brand-ui'
import styles from './styles'
import {
  getDeveloperPortalURL,
  getGithubURL,
  getCommunityURL,
  getFeedbackURL,
} from 'utils/get-url'
import { useIntl } from 'react-intl'
import LocaleSwitcherFooter from 'components/locale-switcher-footer'
import VtexLogoFooter from 'components/icons/vtexLogoFooter'

const Footer = () => {
  const intl = useIntl()

  const links = [
    {
      message: intl.formatMessage({
        id: 'landing_page_footer_github.message',
      }),
      to: () => getGithubURL(),
    },
    {
      message: intl.formatMessage({
        id: 'landing_page_footer_community.message',
      }),
      to: () => getCommunityURL(),
    },
    {
      message: intl.formatMessage({
        id: 'landing_page_footer_feedback.message',
      }),
      to: () => getFeedbackURL(),
    },
  ]

  return (
    <Box sx={styles.outerBox}>
      <VtexLogoFooter sx={{ width: '61px', height: '22px' }} />
      <Flex sx={styles.textLinkItems}>
        {links.map((link, index) => (
          <Link sx={{ color: '#CCCED8' }} key={index} href={link.to()}>
            {link.message}
          </Link>
        ))}
        <LocaleSwitcherFooter sx={styles.localeSwitchLanding} />
      </Flex>
    </Box>
  )
}

export default Footer
