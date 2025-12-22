import { Box, Flex, Text } from '@vtex/brand-ui'
import { FormattedMessage } from 'react-intl'
import AgentsIcon from 'components/icons/agents'
import styles from './styles'

interface AgentsTooltipProps {
  show: boolean
}

const AgentsTooltip = ({ show }: AgentsTooltipProps) => {
  if (!show) return null

  return (
    <Box sx={styles.container}>
      <Flex sx={styles.content}>
        <AgentsIcon sx={styles.icon} />
        <Text sx={styles.text}>
          <FormattedMessage id="agents_tooltip.message" />
        </Text>
      </Flex>
      <Box sx={styles.arrow} />
    </Box>
  )
}

export default AgentsTooltip
