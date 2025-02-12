import { SxStyleProp } from '@vtex/brand-ui'

const sectionContainer: SxStyleProp = {
  paddingTop: ['0px', '32px'],
  paddingBottom: ['24px', '52px', '52px', '48px'],
  margin: 'auto',
}

const title: SxStyleProp = {
  fontSize: ['28px', '28px', '28px', '40px'],
  lineHeight: ['30px', '38px', '38px', '50px'],
  fontWeight: '400',
  color: '#4A4A4A',
  textAlign: 'center',
  mt: ['32px'],
  mb: ['24px', '52px', '52px', '48px', '32px'],
}

const cardsContainer: SxStyleProp = {
  width: ['100%', '100%', '100%', '100%', '1000px', '100%'],
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '32px',
  display: ['flex', 'flex', 'flex', 'grid'], // Mantém flexbox para telas menores e usa grid para telas maiores
  gridTemplateColumns: ['1fr', '1fr', '1fr', 'repeat(3, 1fr)'], // 3 colunas em telas grandes
  gridTemplateRows: ['auto', 'auto', 'auto', 'repeat(2, auto)'], // 2 linhas em telas grandes
}

export default {
  cardsContainer,
  sectionContainer,
  title,
}
