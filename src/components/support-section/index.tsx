import { Flex, Text } from '@vtex/brand-ui'

import SupportSectionCard from 'components/support-section-card'
import { FormattedMessage, useIntl } from 'react-intl'
import { supportData } from 'utils/constants'
import styles from './styles'

const SupportSection = () => {
  const intl = useIntl()

  return (
    <Flex sx={styles.sectionContainer}>
      <Text sx={styles.title}>
        <FormattedMessage id="other_resources_title" />
      </Text>
      <Flex sx={styles.contentCards}>
        {supportData(intl).map((support) => (
          <SupportSectionCard {...support} key={support.title} />
        ))}
      </Flex>
    </Flex>
  )
}

export default SupportSection
