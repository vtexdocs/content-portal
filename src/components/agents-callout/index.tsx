import { Box, Flex, Text } from '@vtex/brand-ui'
import { FormattedMessage } from 'react-intl'
import AgentsIcon from 'components/icons/agents'
import { emitToggleAgentsDropdown } from 'utils/events'
import styles from './styles'

const AgentsCallout = () => {
  const handleClick = () => {
    emitToggleAgentsDropdown()
  }

  return (
    <Box sx={styles.container} onClick={handleClick}>
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
