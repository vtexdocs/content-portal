import { Box, Flex, IconCaret, Link, Text } from '@vtex/brand-ui'

import type { WhatsNextDataElement } from 'utils/typings/types'

import styles from './styles'

const WhatsNextCard = ({
  title,
  linkTitle,
  linkTo,
  description,
}: WhatsNextDataElement) => {
  return (
    <Link href={linkTo} sx={styles.container}>
      <Box>
        <Text sx={styles.title} className="title">
          {title}
        </Text>
        <Text sx={styles.description} className="description">
          {description}
        </Text>
        <Flex sx={styles.linkContainer}>
          <Text sx={styles.link} className="link">
            {linkTitle}
          </Text>
          <IconCaret
            className="caret"
            color="#A1A8B3"
            direction="right"
            size={16}
          />
        </Flex>
      </Box>
    </Link>
  )
}

export default WhatsNextCard
