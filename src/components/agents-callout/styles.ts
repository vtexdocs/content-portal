import { SxStyleProp } from '@vtex/brand-ui'

const container: SxStyleProp = {
  width: '100vw',
  height: '61px',
  borderBottom: '1px solid #E7E9EE',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFF6F9',
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',

  '&:hover': {
    backgroundColor: '#FFE7F0',
  },
}

const content: SxStyleProp = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  px: ['16px', '32px', '64px'],
}

const icon: SxStyleProp = {
  minWidth: '24px',
  minHeight: '24px',
  color: '#D71D55',
  flexShrink: 0,
}

const text: SxStyleProp = {
  fontSize: ['14px', '16px', '16px'],
  fontWeight: '600',
  color: '#D71D55',
  lineHeight: '1.5',
  textAlign: 'center',
}

export default {
  container,
  content,
  icon,
  text,
}
