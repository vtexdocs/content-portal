import { Box, Flex, Text } from '@vtex/brand-ui'

import DocumentationSectionCard from '../documentation-section-card'

import { documentationData } from 'utils/constants'

import { useIntl } from 'react-intl'
import styles from './styles'

const DocumentationSection = () => {
  const intl = useIntl()
  return (
    <Box sx={styles.sectionContainer}>
      <Text sx={styles.title}>
        {intl.formatMessage({
          id: 'sections_title',
        })}
      </Text>
      <Flex
        sx={styles.cardsContainer}
        data-cy="documentation-section-card-list"
      >
        {documentationData(intl).map((card) => (
          <DocumentationSectionCard key={card.title} {...card} />
        ))}
      </Flex>
    </Box>
  )
}

export default DocumentationSection
