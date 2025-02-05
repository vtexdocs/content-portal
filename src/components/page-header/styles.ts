import type { SxStyleProp } from '@vtex/brand-ui'

const welcomeHeader: SxStyleProp = {
  pt: ['initial', '100px'],
  position: ['initial', 'absolute'],
  mb: ['32px', 'initial'],
  zIndex: '1000',
  width: ['320px', '345px', '345px', '345px', '345px', '720px'],
}

const welcomeSubtitle: SxStyleProp = {
  textAlign: ['center', 'initial'],
  fontSize: ['16px', '18px'],
  fontWeight: '400',
  color: '#A1A8B3',
  lineHeight: ['22px', '24px'],
}

const welcomeOuterContainer: SxStyleProp = {
  overflow: 'hidden',
}

const welcomeInnerContainer: SxStyleProp = {
  flexDirection: ['column-reverse', 'row'],
  position: ['initial', 'relative'],
  left: [
    'initial',
    'calc(50% - 544px / 2)',
    'calc(50% - 544px / 2)',
    'calc(50% - 544px / 2)',
    'calc(50% - 720px / 2)',
    'calc(50% - 720px / 2)',
    'calc(50% - 1400px / 2)',
  ],
  justifyContent: 'space-between',
  alignItems: ['center', 'initial'],
}

const welcomeText: SxStyleProp = {
  boxSizing: 'initial',
  textAlign: ['center', 'initial'],
  fontSize: ['22px', '28px'],
  fontWeight: '400',
  lineHeight: ['30px', '38px'],
  paddingBottom: '8px',
  color: '#142032',
}

const welcomeImageOuterContainer: SxStyleProp = {
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: ['center', 'left'],
}

const welcomeImageInnerContainer: SxStyleProp = {
  position: 'relative',
  mx: ['auto', 'initial'],
  right: [
    'initial',
    '-150px',
    '-200px',
    '-250px',
    '-300px',
    '-350px',
    '-400px',
  ], // Ajustando o deslocamento para um posicionamento mais adequado
  // top: ['-92px', '-122px'],
  width: ['100%', '80%', '70%', '60%', '50%'], // Ajustando a largura para responsividade
  maxWidth: '1020px', // Limitando a largura máxima para evitar cortes
  height: 'auto',
}

const welcomeImageGradient: SxStyleProp = {
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: ['92px', '122px'],
  background: [
    'linear-gradient(180deg, rgba(255, 255, 255, 0) -3.42%, #FFFFFF 103.17%)',
    'linear-gradient(47.76deg, #FFFFFF -41.03%, rgba(255, 255, 255, 0) 28.93%)',
  ],
}

const divider: () => SxStyleProp = () => ({
  margin: 0,
  padding: 0,
  borderWidth: 0,
  borderBottom: '1px solid #E7E9EE',
  transition: 'width 0.3s ease-in-out',
  width: '100%',
})

export default {
  welcomeHeader,
  welcomeSubtitle,
  welcomeOuterContainer,
  welcomeInnerContainer,
  welcomeText,
  welcomeImageOuterContainer,
  welcomeImageInnerContainer,
  welcomeImageGradient,
  divider,
}
