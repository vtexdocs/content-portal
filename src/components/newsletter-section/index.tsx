import { Box, Flex, Text } from '@vtex/brand-ui'
import styles from 'components/newsletter-section/styles'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

const NewsletterSection = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 600)
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <Box sx={styles.section}>
      <Box sx={styles.imageContainer}>
        <Image
          src={
            isMobile
              ? '/images/content-style-guide_mobile.png'
              : '/images/content-style-guide_desktop.png'
          }
          alt="Image of alphabetical characters, symbolizing the textual content of the portal"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </Box>
      <Flex sx={styles.contentContainer}>
        <Text sx={styles.text}>
          <FormattedMessage id="landing_subtitle_1" />{' '}
          <span style={{ color: '#0366DD' }}>
            <FormattedMessage id="landing_subtitle_2" />
          </span>{' '}
          <FormattedMessage id="landing_subtitle_3" />
        </Text>
      </Flex>
    </Box>
  )
}

export default NewsletterSection
