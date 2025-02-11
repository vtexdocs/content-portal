import { SxStyleProp } from '@vtex/brand-ui'

const section: SxStyleProp = {
  width: ['375px', '100%', '100%'], // Definindo largura fixa para mobile
  maxWidth: '1440px',
  height: ['530px', 'auto', '498px'], // Altura fixa para mobile
  borderBottom: '1px solid #E7E9EE',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center',
  px: ['16px', '32px', '0px'],
  margin: '0 auto',
}

const imageContainer: SxStyleProp = {
  width: '100%',
  height: ['250px', '350px', '100%'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const contentContainer: SxStyleProp = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  width: '100%',
  px: ['16px', '32px', '0px'],
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

const text: SxStyleProp = {
  fontSize: ['24px', '32px', '52.8px'],
  fontWeight: 'bold',
  color: '#4A4A4A',
}

export default {
  section,
  imageContainer,
  contentContainer,
  text,
}
