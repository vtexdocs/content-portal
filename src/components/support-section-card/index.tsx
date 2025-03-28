import { Flex, Text } from '@vtex/brand-ui'
import Link from 'next/link'

import LongArrowIcon from 'components/icons/long-arrow-icon'
import { useRef } from 'react'
import { useIntl } from 'react-intl'
import type { DocDataElement } from 'utils/typings/types'
import styles from './styles'

const SupportSectionCard = ({
  // Icon,
  title,
  description,
  link,
  isExternalLink = false,
}: DocDataElement) => {
  const intl = useIntl()
  const descriptionRef = useRef<HTMLElement>()

  if (isExternalLink) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <Flex sx={styles.cardContainer}>
          <Flex className="titleContainer" sx={styles.titleContainer}>
            {/* <Icon sx={styles.icon} /> */}
            <Text className="title" sx={styles.title}>
              {title}
            </Text>
          </Flex>
          <Flex sx={styles.infoContainer}>
            <Text
              ref={descriptionRef}
              className="description"
              sx={styles.description}
            >
              {description}
            </Text>
          </Flex>
          <Flex
            className="quickStartedContainer"
            sx={styles.quickStartedContainer}
          >
            <Flex sx={styles.accessPortal}>
              <Text className="accessPortal" sx={styles.learnMoreText}>
                {intl.formatMessage({
                  id: 'landing_page_card_link_caption',
                })}
              </Text>
              <LongArrowIcon size={18} />
            </Flex>
          </Flex>
        </Flex>
      </a>
    )
  }

  return (
    <Link href={link}>
      <Flex sx={styles.cardContainer}>
        <Flex className="titleContainer" sx={styles.titleContainer}>
          {/* <Icon sx={styles.icon} /> */}
          <Text className="title" sx={styles.title}>
            {title}
          </Text>
        </Flex>
        <Flex sx={styles.infoContainer}>
          <Text
            ref={descriptionRef}
            className="description"
            sx={styles.description}
          >
            {description}
          </Text>
        </Flex>
        <Flex
          className="quickStartedContainer"
          sx={styles.quickStartedContainer}
        >
          <Text className="learnMoreText" sx={styles.learnMoreText}>
            {intl.formatMessage({
              id: 'landing_page_accessPortal',
            })}
          </Text>
        </Flex>
      </Flex>
    </Link>
  )
}

export default SupportSectionCard
