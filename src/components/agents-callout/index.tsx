import { Box, Flex, Text } from '@vtex/brand-ui'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import AgentsIcon from 'components/icons/agents'
import { AGENT_PAGE_PATH } from 'utils/constants'
import styles from './styles'

const AgentsCallout = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push(AGENT_PAGE_PATH)
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
