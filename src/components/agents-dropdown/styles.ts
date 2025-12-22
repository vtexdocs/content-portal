import { SxStyleProp } from '@vtex/brand-ui'

const outerContainer: SxStyleProp = {
  cursor: 'initial',
  top: 'calc(5rem - 1px)',
  position: 'absolute',
  filter: 'drop-shadow(0px 0px 16px rgba(0, 0, 0, 0.1))',
  borderRadius: '0px 0px 8px 8px',
  border: '1px solid #E7E9EE',
  background: 'white',
  padding: '8px',
  maxHeight: 'calc(100vh - 5rem)',
  zIndex: -1,
  width: '350px',
}

const innerContainer: SxStyleProp = {
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  maxHeight: 'calc(100vh - 5rem - 16px)',
  scrollbarWidth: 'thin',
  scrollbarColor: 'white white',

  '::-webkit-scrollbar': {
    width: '5px',
  },

  '::-webkit-scrollbar-thumb': {
    borderRadius: '100px',
    background: 'white',
  },

  ':hover': {
    scrollbarColor: '#CCCED8 white',

    '::-webkit-scrollbar-thumb': {
      background: '#CCCED8',
    },
  },
}

const contentContainer: SxStyleProp = {
  px: '16px',
  py: '16px',
}

const descriptionText: SxStyleProp = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#4A596B',
  marginBottom: '16px',
}

const optionsContainer: SxStyleProp = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '16px',
}

const optionLink: SxStyleProp = {
  textDecoration: 'none',
  display: 'block',
  padding: '12px',
  borderRadius: '8px',
  backgroundColor: '#F8F7FC',
  transition: 'all 0.2s ease',

  '&:hover': {
    backgroundColor: '#E7E9EE',
    textDecoration: 'none',

    '.arrow-icon': {
      color: '#000711',
    },
  },
}

const optionContent: SxStyleProp = {
  alignItems: 'center',
  gap: '12px',
}

const gptIcon: SxStyleProp = {
  color: '#4A596B',
  flexShrink: 0,
}

const optionLabel: SxStyleProp = {
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '22px',
  color: '#4A596B',
  flex: 1,
}

const arrowIcon: SxStyleProp = {
  color: '#4A596B',
  flexShrink: 0,
  transition: 'color 0.2s ease',
}

const footerContainer: SxStyleProp = {
  paddingTop: '16px',
  borderTop: '1px solid #E7E9EE',
}

const footerText: SxStyleProp = {
  fontSize: '12px',
  lineHeight: '18px',
  color: '#727786',
}

const channelLink: SxStyleProp = {
  color: '#D71D55',
  textDecoration: 'underline',
  fontSize: '12px',
  fontWeight: '500',
  cursor: 'pointer',
  display: 'inline',

  '&:hover': {
    color: '#C81E51',
    textDecoration: 'underline',
  },
}

export default {
  outerContainer,
  innerContainer,
  contentContainer,
  descriptionText,
  optionsContainer,
  optionLink,
  optionContent,
  gptIcon,
  optionLabel,
  arrowIcon,
  footerContainer,
  footerText,
  channelLink,
}
