import Image, { StaticImageData } from 'next/image'
import { Box, Flex, Text } from '@vtex/brand-ui'
import styles from './styles'
import { Fragment, useEffect, useState } from 'react'

interface IPageHeader {
  title: string
  description: string
  imageUrlDesktop: StaticImageData
  imageUrlMobile: StaticImageData
  imageAlt: string
  priority?: boolean
}

const PageHeader = ({
  title,
  description,
  imageUrlDesktop,
  imageUrlMobile,
  imageAlt,
  priority = false,
}: IPageHeader) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 600)
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])
  return (
    <Fragment>
      <Box sx={styles.welcomeOuterContainer}>
        <Flex sx={styles.welcomeInnerContainer}>
          <Box sx={styles.welcomeHeader}>
            <Text sx={styles.welcomeText}>{title}</Text>
            <Text sx={styles.welcomeSubtitle}>{description}</Text>
          </Box>
          <Box sx={styles.welcomeImageOuterContainer}>
            <Box sx={styles.welcomeImageInnerContainer}>
              <Box sx={styles.welcomeImageGradient}></Box>
              <Image
                alt={imageAlt}
                src={isMobile ? imageUrlMobile : imageUrlDesktop}
                priority={priority}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Box>
          </Box>
        </Flex>
      </Box>
      <Box sx={styles.divider}></Box>
    </Fragment>
  )
}

export default PageHeader
