import type { SxStyleProp } from '@vtex/brand-ui'

const container: SxStyleProp = {
  mt: '16px',
  padding: '16px',
  borderRadius: '4px',
  border: '1px solid #E7E9EE',
  width: ['100%', '49%'],
  transition: 'all 0.3s ease-out',
  ':hover': {
    cursor: 'pointer',
  },
  ':active, :hover': {
    borderColor: 'muted.2',
    boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3 ease-out',

    '.title, .description': {
      transition: 'all 0.3s ease-out',
      color: '#000711',
    },

    '.arrow': {
      transition: 'all 0.3s ease-out',
      color: '#000711',
    },
  },
}

const titleContainer: SxStyleProp = {
  mb: '8px',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  color: 'muted.0',
}

const title: SxStyleProp = {
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: ['22px', '18px'],
  flex: 1,
}

const description: SxStyleProp = {
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '16px',
  color: 'muted.0',
}

export default { container, titleContainer, title, description }
