import { Box, Flex, Text, Link } from '@vtex/brand-ui'

import type { WhatsNextDataElement } from 'utils/typings/types'
import ArrowRightIcon from 'components/icons/arrow-right-icon'

import styles from './styles'

const WhatsNextCard = ({
  title,
  description,
  linkTo,
}: WhatsNextDataElement) => {
  return (
    <Link href={linkTo} sx={styles.container}>
      <Box>
        <Flex sx={styles.titleContainer}>
          <Text sx={styles.title} className="title">
            {title}
          </Text>
          <ArrowRightIcon className="arrow" size={20} />
        </Flex>
        <Text sx={styles.description} className="description">
          {description}
        </Text>
      </Box>
    </Link>
  )
}

export default WhatsNextCard
