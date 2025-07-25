import Link from 'next/link'
import { Flex, Text } from '@vtex/brand-ui'

import type { DocDataElement } from 'utils/typings/types'
import styles from './styles'
import { useRef } from 'react'
import { useIntl } from 'react-intl'
import LongArrowIcon from 'components/icons/long-arrow-icon'

const OtherResourcesCard = ({
  title,
  description,
  link,
  isExternalLink = false,
}: DocDataElement) => {
  const intl = useIntl()
  const descriptionRef = useRef<HTMLElement>()

  return (
    <Link href={link}>
      <Flex sx={styles.cardContainer}>
        <Flex className="titleContainer" sx={styles.titleContainer}>
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
          {!isExternalLink ? (
            <Text className="learnMoreText" sx={styles.learnMoreText}>
              {intl.formatMessage({
                id: 'landing_page_card.acess',
              })}
            </Text>
          ) : (
            <Flex sx={styles.accessPortal}>
              <Text className="accessPortal" sx={styles.learnMoreText}>
                {intl.formatMessage({
                  id: 'landing_page_card_link_caption',
                })}
              </Text>
              <LongArrowIcon size={18} />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Link>
  )
}

export default OtherResourcesCard
