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
}

const PageHeader = ({
  title,
  description,
  imageAlt,
  imageUrlDesktop,
  imageUrlMobile,
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
          <Box sx={{ ...styles.welcomeHeader, mt: ['-100px', 'initial'] }}>
            <Text sx={styles.welcomeText}>{title}</Text>
            <Text sx={styles.welcomeSubtitle}>{description}</Text>
          </Box>
          <Box sx={styles.welcomeImageOuterContainer}>
            <Box sx={styles.welcomeImageInnerContainer}>
              <Box sx={styles.welcomeImageGradient}></Box>
              <Image
                alt={imageAlt}
                src={isMobile ? imageUrlMobile : imageUrlDesktop}
                style={{
                  maxWidth: '100%',
                  height: isMobile ? '264px' : '250px',
                  width: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  margin: '0 auto',
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
