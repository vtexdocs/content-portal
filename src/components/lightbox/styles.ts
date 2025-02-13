import { SxStyleProp } from '@vtex/brand-ui'

const imageContainer: SxStyleProp = {
  cursor: 'pointer',
  width: 'fit-content',
  borderRadius: '5px',
  mt: '16px',
  mb: '24px',
  transition: '0.3s',
  ':hover': {
    boxShadow: '2px 4px 8px 2px rgb(0 0 0 / 10%)',
  },

  '> img': {
    width: '100%', // Ajusta a imagem para caber no modal
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'block',
    padding: '0',
    margin: '0',
  },
}

const container: SxStyleProp = {
  margin: '0',
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.9)',
  position: 'fixed',
  top: '0',
  left: '0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: '10000',
}

const modal: SxStyleProp = {
  width: '90vw', // Permitir que o modal ocupe quase toda a largura da tela
  height: 'auto', // Deixa o conteúdo determinar a altura
  display: 'inline-block',
  margin: 'auto',
  boxShadow: '2px 4px 16px rgb(0 0 0 / 30%)',
  position: 'relative',
  zIndex: '10001',
  padding: '0',

  '> img': {
    display: 'block',
    '@media (max-width: 480px)': {
      maxHeight: '100vh',
      maxWidth: '100vw',
      width: '100%',
    },
    width: 'auto',
    margin: '0',
    padding: '0',
  },
}

const closeButton: SxStyleProp = {
  position: 'absolute',
  zIndex: '10002',
  top: '10px',
  right: '10px',
  color: '#FEFEFE',

  ':hover': {
    color: 'rgb(100, 100, 100)',
  },
}

export default {
  imageContainer,
  container,
  modal,
  closeButton,
}
