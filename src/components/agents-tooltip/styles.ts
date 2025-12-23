import { SxStyleProp } from '@vtex/brand-ui'

const container: SxStyleProp = {
  position: 'absolute',
  top: 'calc(100% + 12px)',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'white',
  border: '1px solid #E7E9EE',
  borderRadius: '8px',
  padding: '12px 16px',
  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
  width: '285px',
  height: '76px',
  zIndex: 1000,
  animation: 'fadeIn 0.3s ease-in',
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateX(-50%) translateY(-8px)',
    },
    to: {
      opacity: 1,
      transform: 'translateX(-50%) translateY(0)',
    },
  },
}

const content: SxStyleProp = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  height: '100%',
}

const icon: SxStyleProp = {
  minWidth: '20px',
  minHeight: '20px',
  width: '20px',
  height: '20px',
  color: '#D71D55',
  flexShrink: 0,
}

const text: SxStyleProp = {
  fontSize: '14px',
  fontWeight: '400',
  color: '#4A596B',
  lineHeight: '1.5',
}

const arrow: SxStyleProp = {
  position: 'absolute',
  top: '-6px',
  left: '50%',
  transform: 'translateX(-50%) rotate(45deg)',
  width: '12px',
  height: '12px',
  backgroundColor: 'white',
  border: '1px solid #E7E9EE',
  borderRight: 'none',
  borderBottom: 'none',
}

export default {
  container,
  content,
  icon,
  text,
  arrow,
}
