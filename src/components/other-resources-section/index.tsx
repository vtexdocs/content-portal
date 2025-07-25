import { Flex, Text } from '@vtex/brand-ui'

import styles from './styles'
import { FormattedMessage, useIntl } from 'react-intl'
import { otherPortals } from 'utils/constants'
import OtherResourcesCard from 'components/other-resources-section-card'

const OtherResources = () => {
  const intl = useIntl()

  return (
    <Flex sx={styles.sectionContainer}>
      <Text sx={styles.title}>
        <FormattedMessage id="other_resources_title" />
      </Text>
      <Flex sx={styles.contentCards}>
        {otherPortals(intl).map((support) => (
          <OtherResourcesCard {...support} key={support.title} />
        ))}
      </Flex>
    </Flex>
  )
}

export default OtherResources
