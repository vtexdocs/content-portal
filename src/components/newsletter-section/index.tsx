import { Box, Flex, Text } from '@vtex/brand-ui'
import styles from 'components/newsletter-section/styles'
import Image from 'next/image'
import { FormattedMessage } from 'react-intl'

const NewsletterSection = () => {
  return (
    <Box sx={{ ...styles.section, position: 'relative' }}>
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
      <Flex
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '90%',
        }}
      >
        <Text
          sx={{
            fontSize: ['32px', '40px', '52.8px'],
            fontWeight: 'bold',
            color: '#4A4A4A',
          }}
        >
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
