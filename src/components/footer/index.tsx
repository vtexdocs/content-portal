import { Box, Flex, Link } from '@vtex/brand-ui'
import FacebookCircleIcon from 'components/icons/facebook-circle-icon'
import InstagramIcon from 'components/icons/instagram-icon'
import LinkedinCircleIcon from 'components/icons/linkedin-circle-icon'
import TwitterCircleIcon from 'components/icons/twitter-circle-icon'
import VtexLogoFooter from 'components/icons/vtexLogoFooter'
import YoutubeIcon from 'components/icons/youtube-icon'
import LocaleSwitcherFooter from 'components/locale-switcher-footer'
import { useIntl } from 'react-intl'
import {
  getCommunityURL,
  getFacebookURL,
  getFeedbackURL,
  getGithubURL,
  getInstagramURL,
  getLinkedinURL,
  getSiteMapURL,
  getTwitterURL,
  getYoutubeURL
} from 'utils/get-url'
import styles from './styles'

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
    {
      message: intl.formatMessage({
        id: 'landing_page_footer_site_map.message',
      }),
      to: () => getSiteMapURL(),
    },
  ]

  const socialIcons = [
    {
      to: () => getFacebookURL(),
      component: <FacebookCircleIcon sx={styles.icon} />,
    },
    {
      to: () => getInstagramURL(),
      component: <InstagramIcon sx={styles.icon} />,
    },
    {
      to: () => getYoutubeURL(),
      component: <YoutubeIcon sx={styles.icon} />,
    },
    {
      to: () => getLinkedinURL(),
      component: <LinkedinCircleIcon sx={styles.icon} />,
    },
    {
      to: () => getTwitterURL(),
      component: <TwitterCircleIcon sx={styles.icon} />,
    },
  ]
  return (
    <Box sx={styles.outerBox}>
      <VtexLogoFooter sx={{ width: '61px', height: '22px' }} />
      <Flex sx={styles.socialMediaIcons}>
        {socialIcons.map((icon, index) => (
          <Link key={index} href={icon.to()}>
            {icon.component}
          </Link>
        ))}
      </Flex>
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
