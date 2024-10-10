import { Box, Flex, Text } from '@vtex/brand-ui'

import styles from 'components/newsletter-section/styles'
import Image from 'next/image'

import { SearchInput } from '@vtexdocs/components'
import { FormattedMessage } from 'react-intl'

const NewsletterSection = () => {
  return (
    <Box sx={styles.section}>
      <Box sx={styles.imageContainer}>
        <Image
          src={'/images/landing.png'}
          alt="Image of the VTEX store environment"
          fill
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
      <Flex sx={styles.newsletterBox}>
        {/* <Text sx={styles.newsletterTitle}>
          <FormattedMessage id="landing_page_newsletter.title" />
        </Text> */}
        <Text sx={styles.newsletterDescription}>
          <FormattedMessage id="landing_subtitle" />
        </Text>
        <SearchInput />
      </Flex>
    </Box>
  )
}

export default NewsletterSection
