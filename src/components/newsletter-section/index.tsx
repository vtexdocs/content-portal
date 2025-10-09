import { Box, Flex, Text } from '@vtex/brand-ui'
import { useEffect, useState } from 'react'

import Image from 'next/image'
import styles from 'components/newsletter-section/styles'

import { FormattedMessage } from 'react-intl'
// import { SearchInput } from '@vtexdocs/components'

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
          alt="Image of the VTEX store environment"
          fill
          priority
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        <Flex sx={styles.contentContainer}>
          <Text sx={styles.text}>
            <FormattedMessage
              id="landing_subtitle_complete"
              values={{
                highlight: (chunks) => (
                  <span style={{ color: '#0366DD' }}>{chunks}</span>
                ),
              }}
            />
          </Text>
          <Text style={{ color: 'transparent' }}>just for spacing</Text>
          {/* <SearchInput /> */}
        </Flex>
      </Box>
    </Box>
  )
}

export default NewsletterSection
