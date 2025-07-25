import { Box } from '@vtex/brand-ui'

import DocumentationCard from 'components/documentation-card'
import { menuSectionData, menuSupportData } from 'utils/constants'
import { useIntl } from 'react-intl'

import styles from './styles'

const DropdownMenu = () => {
  const intl = useIntl()
  return (
    <Box sx={styles.outerContainer}>
      <Box sx={styles.innerContainer} data-cy="dropdown-menu">
        <Box
          sx={styles.documentationContainer}
          data-cy="dropdown-menu-first-section"
        >
          {menuSectionData(intl).map((card) => (
            <DocumentationCard
              containerType="dropdown"
              key={card.title}
              {...card}
            />
          ))}
        </Box>
        <Box
          sx={styles.updatesContainer}
          data-cy="dropdown-menu-second-section"
        >
          {menuSupportData(intl).map((card) => (
            <DocumentationCard
              containerType="dropdown"
              key={card.title}
              {...card}
            />
          ))}
        </Box>
        <Box
          sx={styles.updatesContainer}
          data-cy="dropdown-menu-second-section"
        ></Box>
      </Box>
    </Box>
  )
}

export default DropdownMenu
