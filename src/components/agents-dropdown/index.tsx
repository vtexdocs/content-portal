import { Box, Flex, Text, Link as VtexLink } from '@vtex/brand-ui'
import { useIntl, FormattedMessage } from 'react-intl'
import GptIcon from 'components/icons/gpt'
import LongArrowIcon from 'components/icons/long-arrow-icon'
import { agentsDropdownData } from 'utils/constants'

import styles from './styles'

interface AgentsDropdownProps {
  onLinkClick?: () => void
}

const AgentsDropdown = ({ onLinkClick }: AgentsDropdownProps) => {
  const intl = useIntl()
  const { description, options, channelLink } = agentsDropdownData(intl)

  return (
    <Box sx={styles.outerContainer}>
      <Box sx={styles.innerContainer}>
        <Box sx={styles.contentContainer}>
          <Text sx={styles.descriptionText}>{description}</Text>

          <Box sx={styles.optionsContainer}>
            {options.map((option) => (
              <VtexLink
                key={option.id}
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={styles.optionLink}
                onClick={onLinkClick}
              >
                <Flex sx={styles.optionContent}>
                  <GptIcon size={24} sx={styles.gptIcon} />
                  <Text sx={styles.optionLabel}>{option.title}</Text>
                  <LongArrowIcon className="arrow-icon" sx={styles.arrowIcon} />
                </Flex>
              </VtexLink>
            ))}
          </Box>

          <Box sx={styles.footerContainer}>
            <Text sx={styles.footerText}>
              <FormattedMessage
                id="agents_dropdown_footer.text"
                values={{
                  channel: (
                    <Box
                      as="a"
                      href={channelLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={styles.channelLink}
                      onClick={onLinkClick}
                    >
                      #product-localization
                    </Box>
                  ),
                }}
              />
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AgentsDropdown
