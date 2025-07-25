import { getMessages } from 'utils/get-messages'
import {
  getCommunityURL,
  getLearningCenterURL,
  getDeveloperPortalURL,
  getSupportURL,
  getFeedbackURL,
} from 'utils/get-url'

import {
  DocDataElement,
  WhatsNextDataElement,
  ResourceDataElement,
  FaqDataElement,
} from './typings/types'
import { IntlShape } from 'react-intl'
import libraryConfig from './libraryConfig'
import DeveloperPortalIcon from 'components/icons/developer-portal-icon'
import PaperIcon from 'components/icons/paper-icon'
import WarningIcon from 'components/icons/warning-icon'
import GraphIcon from 'components/icons/graph-icon'
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
      link: 'https://docs.google.com/spreadsheets/d/1vSSg5CrimqSxvWjBoXLE5P7ATJCdRnPT/edit?gid=722394202#gid=722394202',
      isExternalLink: true,
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
      link: 'https://docs.google.com/spreadsheets/d/1vSSg5CrimqSxvWjBoXLE5P7ATJCdRnPT/edit?gid=722394202#gid=722394202',
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

export const whatsNextData = (intl: IntlShape) => {
  const data: WhatsNextDataElement[] = [
    {
      title: intl.formatMessage({
        id: 'app_development_page_new_to_app_development.title',
      }),
      description: intl.formatMessage({
        id: 'app_development_page_new_to_app_development.description',
      }),
      linkTitle: intl.formatMessage({
        id: 'app_development_page_new_to_app_development.link',
      }),
      linkTo: '/docs/guides/vtex-io-getting-started',
    },
    {
      title: intl.formatMessage({
        id: 'app_development_page_solve_real_world_issues.title',
      }),
      description: intl.formatMessage({
        id: 'app_development_page_solve_real_world_issues.description',
      }),
      linkTitle: intl.formatMessage({
        id: 'app_development_page_solve_real_world_issues.link',
      }),
      linkTo: '/docs/guides/app-development-guides',
    },
    {
      title: intl.formatMessage({
        id: 'app_development_page_build_foundations.title',
      }),
      description: intl.formatMessage({
        id: 'app_development_page_build_foundations.description',
      }),
      linkTitle: intl.formatMessage({
        id: 'app_development_page_build_foundations.link',
      }),
      linkTo: '/docs/guides/concepts',
    },
    {
      title: intl.formatMessage({
        id: 'app_development_page_go_further.title',
      }),
      description: intl.formatMessage({
        id: 'app_development_page_go_further.description',
      }),
      linkTitle: intl.formatMessage({
        id: 'app_development_page_go_further.link',
      }),
      linkTo:
        '/docs/guides/vtex-io-documentation-homologation-requirements-for-vtex-app-store',
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
        id: 'No_Fix',
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

export const TroubleshootingFilters = (intl: IntlShape) => {
  const data = {
    name: intl.formatMessage({ id: 'troubleshooting_filter_tags.title' }),
    options: [
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.orders' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.orders' }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.integration',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.integration',
        }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.marketplace',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.marketplace',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.amazon' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.amazon' }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.sku' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.sku' }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.inventory' }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.inventory',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.pricing' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.pricing' }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.redirects' }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.redirects',
        }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.master_data_v1',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.master_data_v1',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.customer' }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.customer',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.address' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.address' }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.multistore',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.multistore',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.catalog' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.catalog' }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.spreadsheet',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.spreadsheet',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.import' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.import' }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.b2b' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.b2b' }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.schema' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.schema' }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.master_data',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.master_data',
        }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.spreadsheet_import',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.spreadsheet_import',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.index' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.index' }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.product' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.product' }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.trade_policy',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.trade_policy',
        }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.message_center',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.message_center',
        }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.email_templates',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.email_templates',
        }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.authentication_token',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.authentication_token',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.ean' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.ean' }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.search' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.search' }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.intelligent_search',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.intelligent_search',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.rewriter' }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.rewriter',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.report' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.report' }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.export' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.export' }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.dashboard' }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.dashboard',
        }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.vtex_admin',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.vtex_admin',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.overview' }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.overview',
        }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.user_roles',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.user_roles',
        }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.reservation',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.reservation',
        }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.xml_integration',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.xml_integration',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.stock' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.stock' }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.order_status',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.order_status',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.invoice' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.invoice' }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.site_editor',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.site_editor',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.cms' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.cms' }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.store_framework',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.store_framework',
        }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.promotions',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.promotions',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.affiliate' }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.affiliate',
        }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.request_headers',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.request_headers',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.utm' }),
        name: intl.formatMessage({ id: 'troubleshooting_filter_tags.utm' }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.custom_javascript',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.custom_javascript',
        }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.separate_deliveries',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.separate_deliveries',
        }),
      },
      {
        id: intl.formatMessage({
          id: 'troubleshooting_filter_tags.order_split',
        }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.order_split',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.packages' }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.packages',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.shipping' }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.shipping',
        }),
      },
      {
        id: intl.formatMessage({ id: 'troubleshooting_filter_tags.pre_sale' }),
        name: intl.formatMessage({
          id: 'troubleshooting_filter_tags.pre_sale',
        }),
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
