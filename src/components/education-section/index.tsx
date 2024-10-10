import { Box, Flex, Text } from '@vtex/brand-ui'

import EducationChannel from 'components/education-channel'
import HelpCenterIcon from 'components/icons/helpcenter-icon'

import { getSlackChannelURL } from 'utils/get-url'

import { useIntl } from 'react-intl'
import styles from './styles'

const EducationSection = () => {
  const intl = useIntl()

  const educationChannels = [
    {
      title: intl.formatMessage({ id: 'get_in_touch_subtitle' }),
      description: intl.formatMessage({
        id: 'get_in_touch_text',
      }),
      textLink: intl.formatMessage({
        id: 'channel_link',
      }),
      link: getSlackChannelURL(),
      icon: HelpCenterIcon,
    },
    // {
    //   title: intl.formatMessage({
    //     id: 'landing_page_education_community.title',
    //   }),
    //   description: intl.formatMessage({
    //     id: 'landing_page_education_community.description',
    //   }),
    //   textLink: intl.formatMessage({
    //     id: 'landing_page_education_community.textLink',
    //   }),
    //   link: getCommunityURL(),
    //   icon: CommunityIcon,
    // },
  ]
  return (
    <Box sx={styles.container}>
      <Text sx={styles.title}>
        {intl.formatMessage({ id: 'get_in_touch_title' })}
      </Text>
      <Flex sx={styles.channelsContainer}>
        {educationChannels.map((channel) => (
          <EducationChannel
            title={channel.title}
            description={channel.description}
            textLink={channel.textLink}
            link={channel.link}
            Icon={channel.icon}
            key={channel.title}
          />
        ))}
      </Flex>
    </Box>
  )
}

export default EducationSection
