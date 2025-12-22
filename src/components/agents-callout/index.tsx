import { Box, Flex, Text } from '@vtex/brand-ui'
import { FormattedMessage } from 'react-intl'
import AgentsIcon from 'components/icons/agents'
import styles from './styles'

const AgentsCallout = () => {
  return (
    <Box sx={styles.container}>
      <Flex sx={styles.content}>
        <AgentsIcon sx={styles.icon} />
        <Text sx={styles.text}>
          <FormattedMessage id="agents_callout.message" />
        </Text>
      </Flex>
    </Box>
  )
}

export default AgentsCallout
