import { getMessages } from 'utils/get-messages'
import {
  getCommunityURL,
  getLearningCenterURL,
  getDeveloperPortalURL,
  getSupportURL,
  getFeedbackURL,
} from 'utils/get-url'

import { DocDataElement, ResourceDataElement } from './typings/types'
import { IntlShape } from 'react-intl'
import libraryConfig from './libraryConfig'
import DeveloperPortalIcon from 'components/icons/developer-portal-icon'
import LongArrowIcon from 'components/icons/long-arrow-icon'
import GuidesIcon from 'components/icons/guides-icon'
import FormattingIcon from 'components/icons/formatting-icon'
import InterfacesIcon from 'components/icons/interface-copy-icon'
import EducationIcon from 'components/icons/education-icon'
import GlossaryIcon from 'components/icons/glossary-icon'
import GrammarIcon from 'components/icons/grammar-icon'

libraryConfig
export const messages = getMessages()

export const sectionsData = (intl: IntlShape) => {
  const data: DocDataElement[] = [
    {
      id: 'Guides',
      Icon: GuidesIcon,
      title: intl.formatMessage({
        id: 'guides_card_title',
      }),
      description: intl.formatMessage({
        id: 'guides_card_subtitle',
      }),
      link: '/docs/guides',
      isExternalLink: false,
    },
    {
      id: 'Grammar',
      Icon: GrammarIcon,
      title: intl.formatMessage({
        id: 'grammar_card_title',
      }),
      description: intl.formatMessage({
        id: 'grammar_card_subtitle',
      }),
      link: '/docs/grammar',
      isExternalLink: false,
    },
    {
      id: 'Formatting',
      Icon: FormattingIcon,
      title: intl.formatMessage({
        id: 'formatting_card_title',
      }),
      description: intl.formatMessage({
        id: 'formatting_card_subtitle',
      }),
      link: '/docs/formatting',
      isExternalLink: false,
    },
    {
      id: 'Interface copy',
      Icon: InterfacesIcon,
      title: intl.formatMessage({
        id: 'user_interfaces_card_title',
      }),
      description: intl.formatMessage({
        id: 'user_interfaces_card_subtitle',
      }),
      link: '/docs/interface-copy',
      isExternalLink: false,
    },
    {
      id: 'Documentation',
      Icon: EducationIcon,
      title: intl.formatMessage({
        id: 'documentation_card_title',
      }),
      description: intl.formatMessage({
        id: 'documentation_card_subtitle',
      }),
      link: '/docs/documentation',
      isExternalLink: false,
    },
    {
      id: 'Glossary',
      Icon: GlossaryIcon,
      title: intl.formatMessage({
        id: 'glossary_card_title',
      }),
      description: intl.formatMessage({
        id: 'glossary_card_subtitle',
      }),
      link: '/docs/glossary',
      isExternalLink: false,
    },
  ]
  return data
}

export const menuSectionData = (intl: IntlShape) => {
  const data: DocDataElement[] = [
    {
      id: 'Guides',
      Icon: GuidesIcon,
      title: intl.formatMessage({
        id: 'guides_card_title',
      }),
      description: intl.formatMessage({
        id: 'guides_card_subtitle',
      }),
      link: '/docs/guides',
      isExternalLink: false,
    },
    {
      id: 'Grammar',
      Icon: GrammarIcon,
      title: intl.formatMessage({
        id: 'grammar_card_title',
      }),
      description: intl.formatMessage({
        id: 'grammar_card_subtitle',
      }),
      link: '/docs/grammar',
      isExternalLink: false,
    },
    {
      id: 'Formatting',
      Icon: FormattingIcon,
      title: intl.formatMessage({
        id: 'formatting_card_title',
      }),
      description: intl.formatMessage({
        id: 'formatting_card_subtitle',
      }),
      link: '/docs/formatting',
      isExternalLink: false,
    },
    {
      id: 'Interface copy',
      Icon: InterfacesIcon,
      title: intl.formatMessage({
        id: 'user_interfaces_card_title',
      }),
      description: intl.formatMessage({
        id: 'user_interfaces_card_subtitle',
      }),
      link: '/docs/interface-copy',
      isExternalLink: false,
    },
    {
      id: 'Documentation',
      Icon: EducationIcon,
      title: intl.formatMessage({
        id: 'documentation_card_title',
      }),
      description: intl.formatMessage({
        id: 'documentation_card_subtitle',
      }),
      link: '/docs/documentation',
      isExternalLink: false,
    },
    {
      id: 'Glossary',
      Icon: GlossaryIcon,
      title: intl.formatMessage({
        id: 'glossary_card_title',
      }),
      description: intl.formatMessage({
        id: 'glossary_card_subtitle',
      }),
      link: '/docs/glossary',
      isExternalLink: false,
    },
  ]
  return data
}

export const feedbackSectionData = (intl: IntlShape) => {
  const data: DocDataElement[] = [
    {
      id: 'Feedback',
      Icon: LongArrowIcon,
      title: intl.formatMessage({
        id: 'landing_page_header_feedback.message',
      }),
      description: '',
      link: getFeedbackURL(),
      isExternalLink: true,
    },
  ]

  return data
}

export const menuSupportData = (intl: IntlShape) => {
  const data: DocDataElement[] = [
    {
      id: 'FastStore',
      Icon: DeveloperPortalIcon,
      title: intl.formatMessage({
        id: 'faststore_card_title',
      }),
      description: intl.formatMessage({
        id: 'faststore_card_subtitle',
      }),
      link: 'https://developers.vtex.com/docs/guides/faststore/',
      isExternalLink: true,
    },
    {
      id: 'Brand',
      Icon: DeveloperPortalIcon,
      title: intl.formatMessage({
        id: 'brand_card_title',
      }),
      description: intl.formatMessage({
        id: 'brand_card_subtitle',
      }),
      link: 'https://brand.vtex.com/',
      isExternalLink: true,
    },
    {
      id: 'Developer Portal',
      Icon: DeveloperPortalIcon,
      title: intl.formatMessage({
        id: 'developer_portal_card_title',
      }),
      description: intl.formatMessage({
        id: 'developer_portal_card_subtitle',
      }),
      link: 'https://developers.vtex.com/',
      isExternalLink: true,
    },
    {
      id: 'Help Center',
      Icon: DeveloperPortalIcon,
      title: intl.formatMessage({
        id: 'help_center_card_title',
      }),
      description: intl.formatMessage({
        id: 'help_center_card_subtitle',
      }),
      link: 'https://help.vtex.com/en/',
      isExternalLink: true,
    },
  ]

  return data
}

export const otherPortals = (intl: IntlShape) => {
  const data: DocDataElement[] = [
    {
      id: 'FastStore',
      Icon: DeveloperPortalIcon,
      title: intl.formatMessage({
        id: 'faststore_card_title',
      }),
      description: intl.formatMessage({
        id: 'faststore_card_subtitle',
      }),
      isExternalLink: true,
      link: 'https://developers.vtex.com/docs/guides/faststore/',
    },
    {
      id: 'Brand',
      Icon: DeveloperPortalIcon,
      title: intl.formatMessage({
        id: 'brand_card_title',
      }),
      description: intl.formatMessage({
        id: 'brand_card_subtitle',
      }),
      isExternalLink: true,
      link: 'https://brand.vtex.com/',
    },
    {
      id: 'Developer Portal',
      Icon: DeveloperPortalIcon,
      title: intl.formatMessage({
        id: 'developer_portal_card_title',
      }),
      description: intl.formatMessage({
        id: 'developer_portal_card_subtitle',
      }),
      isExternalLink: true,
      link: 'https://developers.vtex.com/',
    },
    {
      id: 'Help Center',
      Icon: DeveloperPortalIcon,
      title: intl.formatMessage({
        id: 'help_center_card_title',
      }),
      description: intl.formatMessage({
        id: 'help_center_card_subtitle',
      }),
      isExternalLink: true,
      link: 'https://help.vtex.com/en/',
    },
  ]
  return data
}

export const getIcon = (doc: string, intl: IntlShape) => {
  return sectionsData(intl).find((icon) => icon.title === doc)?.Icon
}

export const resources = (intl: IntlShape) => {
  const data: ResourceDataElement[] = [
    {
      title: 'Community',
      description: intl.formatMessage({
        id: 'app_development_page_other_resources_community.description',
      }),
      link: getCommunityURL(),
    },
    {
      title: 'Learning Center',
      description: intl.formatMessage({
        id: 'app_development_page_other_resources_learning_center.description',
      }),
      link: getLearningCenterURL(),
    },
    {
      title: 'Developer Portal',
      description: intl.formatMessage({
        id: 'app_development_page_other_resources_github.description',
      }),
      link: getDeveloperPortalURL(),
    },
    {
      title: 'Support',
      description: intl.formatMessage({
        id: 'app_development_page_other_resources_support.description',
      }),
      link: getSupportURL(),
    },
  ]

  return data
}

export const sortBy = (intl: IntlShape) => {
  const data = [
    {
      value: 'recently_updated',
      content: intl.formatMessage({ id: 'sort.recently_updated' }),
    },
    {
      value: 'newest',
      content: intl.formatMessage({ id: 'sort.newest' }),
    },
  ]

  return data
}
