import { Box, Flex, Link } from '@vtex/brand-ui'
import VtexLogoFooter from 'components/icons/vtexLogoFooter'
import { useIntl } from 'react-intl'
import { getCommunityURL, getFeedbackURL, getGithubURL } from 'utils/get-url'
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
        id: 'footer_comunity',
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
          <Link
            sx={{ color: '#CCCED8' }}
            key={index}
            href={link.to()}
            target="_blank"
          >
            {link.message}
          </Link>
        ))}
      </Flex>
    </Box>
  )
}

export default Footer
