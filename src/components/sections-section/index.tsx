import { Box, Flex, Text } from '@vtex/brand-ui'

import DocumentationSectionCard from '../sections-section-card'

import { sectionsData } from 'utils/constants'

import styles from './styles'
import { useIntl } from 'react-intl'

const SectionsSection = () => {
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
        {sectionsData(intl).map((card) => (
          <DocumentationSectionCard key={card.title} {...card} />
        ))}
      </Flex>
    </Box>
  )
}

export default SectionsSection
