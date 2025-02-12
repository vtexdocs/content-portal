import { getMessages } from 'utils/get-messages'
import {
  getCommunityURL,
  getDeveloperPortalURL,
  getFeedbackURL,
  getLearningCenterURL,
  getSupportURL,
} from 'utils/get-url'

import DeveloperPortalIcon from 'components/icons/developer-portal-icon'
import GraphIcon from 'components/icons/graph-icon'
import LongArrowIcon from 'components/icons/long-arrow-icon'
import PaperIcon from 'components/icons/paper-icon'
import WarningIcon from 'components/icons/warning-icon'
import GuidesIcon from 'components/icons/guides-icon'
import GrammarIcon from 'components/icons/grammar-icon'
import InterfacesIcon from 'components/icons/interface-copy-icon'
import EducationIcon from 'components/icons/education-icon'
import GlossaryIcon from 'components/icons/glossary-icon'
import { IntlShape } from 'react-intl'
import libraryConfig from './libraryConfig'
import {
  DocDataElement,
  FaqDataElement,
  ResourceDataElement,
  WhatsNextDataElement,
} from './typings/types'
import InterfaceIcon from 'components/icons/interface-copy-icon'
import FormattingIcon from 'components/icons/formatting-icon'

libraryConfig
export const messages = getMessages()

export const documentationData = (intl: IntlShape) => {
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
      link: '/docs/user-interfaces',
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
      link: 'https://docs.google.com/spreadsheets/d/1vSSg5CrimqSxvWjBoXLE5P7ATJCdRnPT/edit?gid=1978438735#gid=1978438735',
      isExternalLink: true,
    }, //TODO: Fazer abrir em uma nova aba.
  ]
  return data
}

export const menuDocumentationData = (intl: IntlShape) => {
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
      Icon: InterfaceIcon,
      title: intl.formatMessage({
        id: 'user_interfaces_card_title',
      }),
      description: intl.formatMessage({
        id: 'user_interfaces_card_subtitle',
      }),
      link: '/docs/user-interfaces',
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
      isExternalLink: true,
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
      link: 'https://faststore.dev/',
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

export const faqData = (intl: IntlShape) => {
  const data: FaqDataElement[] = [
    {
      Icon: PaperIcon,
      title: intl.formatMessage({
        id: 'faq_order_error.title',
      }),
      description: intl.formatMessage({
        id: 'faq_order_error.description',
      }),
      productTeam: 'Channels',
      link: '/faq/order-errors-in-marketplace-integrations',
    },
    {
      Icon: WarningIcon,
      title: intl.formatMessage({
        id: 'faq_handling.title',
      }),
      description: intl.formatMessage({
        id: 'faq_handling.description',
      }),
      productTeam: 'Post-purchase',
      link: '/faq/why-has-my-order-stopped-on-ready-for-handling',
    },
    {
      Icon: GraphIcon,
      title: intl.formatMessage({
        id: 'faq_product_visible.title',
      }),
      description: intl.formatMessage({
        id: 'faq_product_visible.description',
      }),
      productTeam: 'Marketing & Merchandising',
      link: '/faq/why-is-the-product-not-visible-on-the-website',
    },
    {
      Icon: PaperIcon,
      title: intl.formatMessage({
        id: 'faq_carrier.title',
      }),
      description: intl.formatMessage({
        id: 'faq_carrier.description',
      }),
      productTeam: 'Post-purchase',
      link: '/faq/why-cant-i-see-my-carrier-on-checkout',
    },
  ]
  return data
}

export const supportData = (intl: IntlShape) => {
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
      link: 'https://faststore.dev/',
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
  return documentationData(intl).find((icon) => icon.title === doc)?.Icon
}

export const whatsNextData = (intl: IntlShape) => {
  const data: WhatsNextDataElement[] = [
    {
      title: intl.formatMessage({
        id: 'app_development_page_new_to_app_development.title',
      }),
      linkTitle: intl.formatMessage({
        id: 'app_development_page_new_to_app_development.link',
      }),
      linkTo: '/docs/guides/vtex-io-getting-started',
      description: 'app_development_page_new_to_app_development.description',
    },
    {
      title: intl.formatMessage({
        id: 'app_development_page_solve_real_world_issues.title',
      }),
      linkTitle: intl.formatMessage({
        id: 'app_development_page_solve_real_world_issues.link',
      }),
      linkTo: '/docs/guides/app-development-guides',
      description:
        'app_development_page_solve_real_world_issues.link.description',
    },
    {
      title: intl.formatMessage({
        id: 'app_development_page_build_foundations.title',
      }),
      linkTitle: intl.formatMessage({
        id: 'app_development_page_build_foundations.link',
      }),
      linkTo: '/docs/guides/concepts',
      description: 'pp_development_page_build_foundations.description',
    },
    {
      title: intl.formatMessage({
        id: 'app_development_page_go_further.title',
      }),
      linkTitle: intl.formatMessage({
        id: 'app_development_page_go_further.link',
      }),
      linkTo:
        '/docs/guides/vtex-io-documentation-homologation-requirements-for-vtex-app-store',
      description: 'app_development_page_go_further.description',
    },
  ]
  return data
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

export const knownIssuesStatusFilter = (intl: IntlShape) => {
  const data = {
    name: intl.formatMessage({
      id: 'known_issues_filter_status.title',
    }),
    options: [
      {
        id: 'Closed',
        name: intl.formatMessage({ id: 'known_issues_filter_status.closed' }),
      },
      {
        id: 'Fixed',
        name: intl.formatMessage({ id: 'known_issues_filter_status.fixed' }),
      },
      {
        id: 'Backlog',
        name: intl.formatMessage({ id: 'known_issues_filter_status.backlog' }),
      },
      {
        id: 'Scheduled',
        name: intl.formatMessage({
          id: 'known_issues_filter_status.scheduled',
        }),
      },
      {
        id: 'No fix',
        name: intl.formatMessage({ id: 'known_issues_filter_status.no_fix' }),
      },
    ],
  }

  return data
}

export const knownIssuesModulesFilters = (intl: IntlShape) => {
  const data = {
    name: intl.formatMessage({
      id: 'known_issues_filter_modules.title',
    }),
    options: [
      {
        id: 'Pricing & Promotions',
        name: 'Pricing & Promotions',
      },
      {
        id: 'Catalog',
        name: 'Catalog',
      },
      {
        id: 'Connections',
        name: 'Connections',
      },
      {
        id: 'CMS',
        name: 'CMS',
      },
      {
        id: 'Checkout',
        name: 'Checkout',
      },
      {
        id: 'Identity',
        name: 'Identity',
      },
      {
        id: 'Storage',
        name: 'Storage',
      },
      {
        id: 'B2B',
        name: 'B2B',
      },
      {
        id: 'VTEX Shipping Network',
        name: 'VTEX Shipping Network',
      },
      {
        id: 'Message Center',
        name: 'Message Center',
      },
      {
        id: 'Store Framework',
        name: 'Store Framework',
      },
      {
        id: 'Payments',
        name: 'Payments',
      },
      {
        id: 'Portal',
        name: 'Portal',
      },
      {
        id: 'Suggestions',
        name: 'Suggestions',
      },
      {
        id: 'Order Management',
        name: 'Order Management',
      },
      {
        id: 'Physical Stores',
        name: 'Physical Stores',
      },
      {
        id: 'Marketplace',
        name: 'Marketplace',
      },
      {
        id: 'Analytics',
        name: 'Analytics',
      },
      {
        id: 'Intelligent Search',
        name: 'Intelligent Search',
      },
      {
        id: 'Logistics',
        name: 'Logistics',
      },
      {
        id: 'Gift Card',
        name: 'Gift Card',
      },
      {
        id: 'Master Data',
        name: 'Master Data',
      },
      {
        id: 'My Orders',
        name: 'My Orders',
      },
      {
        id: 'Webservice',
        name: 'Webservice',
      },
      {
        id: 'License Manager',
        name: 'License Manager',
      },
    ],
  }

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

export const faqFilter = (intl: IntlShape) => {
  const data = {
    name: intl.formatMessage({ id: 'faq_filter.title' }),
    options: [
      {
        id: 'Shopping',
        name: 'Shopping',
      },
      {
        id: 'Post-purchase',
        name: 'Post-purchase',
      },
      {
        id: 'Marketing & Merchandising',
        name: 'Marketing & Merchandising',
      },
      {
        id: 'Financial',
        name: 'Financial',
      },
      {
        id: 'Channels',
        name: 'Channels',
      },
      {
        id: 'VTEX IO',
        name: 'VTEX IO',
      },
      {
        id: 'Master Data',
        name: 'Master Data',
      },
      {
        id: 'Identity',
        name: 'Identity',
      },
      {
        id: 'Reliability',
        name: 'Reliability',
      },
      {
        id: 'Others',
        name: 'Others',
      },
      {
        id: 'Apps',
        name: 'Apps',
      },
      {
        id: 'Billing',
        name: 'Billing',
      },
      {
        id: 'Management',
        name: 'Management',
      },
    ],
  }

  return data
}

export const additionalResourcesSitemap = (intl: IntlShape) => {
  const data: {
    documentation: string
    children: { name: string; link: string; icon: boolean }[]
  } = {
    documentation: intl.formatMessage({
      id: 'sitemap_page_section_additional_resources.title',
    }),
    children: [
      {
        name: intl.formatMessage({
          id: 'sitemap_page_section_additional_resources.faq',
        }),
        link: '/faq',
        icon: false,
      },
      {
        name: intl.formatMessage({
          id: 'sitemap_page_section_additional_resources.known_issues',
        }),
        link: '/known-issues',
        icon: false,
      },
      {
        name: intl.formatMessage({
          id: 'sitemap_page_section_additional_resources.support_rules',
        }),
        link: '#',
        icon: false,
      },
      {
        name: intl.formatMessage({
          id: 'sitemap_page_section_additional_resources.announcements',
        }),
        link: '/announcements',
        icon: false,
      },
      {
        name: intl.formatMessage({
          id: 'sitemap_page_section_additional_resources.dev_portal',
        }),
        link: getDeveloperPortalURL(),
        icon: true,
      },
      {
        name: intl.formatMessage({
          id: 'sitemap_page_section_additional_resources.support',
        }),
        link: getSupportURL(),
        icon: true,
      },
      {
        name: intl.formatMessage({
          id: 'sitemap_page_section_additional_resources.community',
        }),
        link: getCommunityURL(),
        icon: true,
      },
      {
        name: intl.formatMessage({
          id: 'sitemap_page_section_additional_resources.feedback',
        }),
        link: getFeedbackURL(),
        icon: true,
      },
    ],
  }

  return data
}
