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
  zIndex: 10, // Alterado de -1 para 10 para garantir visibilidade

  /** Estilos específicos para mobile */
  '@media screen and (max-width: 768px)': {
    width: '100%', // Ocupa toda a largura da tela
    left: 0, // Alinha à esquerda
    right: 0, // Ocupa toda a largura
    top: '4rem', // Ajuste para não cobrir elementos superiores
    borderRadius: '0px 0px 12px 12px', // Bordas mais suaves em mobile
    padding: '12px', // Mais espaço interno para melhor toque
  },
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

  /** Estilos específicos para mobile */
  '@media screen and (max-width: 768px)': {
    maxHeight: 'calc(100vh - 6rem)', // Ajuste de altura em mobile
    padding: '8px 16px', // Melhor espaçamento interno
  },
}

const documentationContainer: SxStyleProp = {
  px: '16px',
  paddingBottom: '8px',
}

const updatesContainer: SxStyleProp = {
  px: '16px',
  paddingTop: '8px',
  borderRadius: '0px 0px 8px 8px',
  borderTop: '1px solid #E7E9EE',
}

export default {
  documentationContainer,
  innerContainer,
  outerContainer,
  updatesContainer,
}
