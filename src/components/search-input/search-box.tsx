import { useRef } from 'react'
import { Flex } from '@vtex/brand-ui'
import { connectSearchBox } from 'react-instantsearch-dom'
import { SearchBoxProvided } from 'react-instantsearch-core'

import SearchIcon from 'components/icons/search-icon'
import styles from './styles'
import { useIntl } from 'react-intl'

const SearchBoxComponent = ({
  currentRefinement,
  refine,
}: SearchBoxProvided) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const intl = useIntl()

  const handleClick = () => {
    if (inputRef.current != null) inputRef.current.focus()
  }

  return (
    <Flex sx={styles.searchContainer} onClick={handleClick}>
      <SearchIcon sx={styles.searchIcon} />
      <input
        style={styles.searchInput}
        ref={inputRef}
        className="searchComponent"
        type="text"
        placeholder={intl.formatMessage({
          id: 'search_input.placeholder',
        })}
        value={currentRefinement}
        data-cy="search"
        onChange={(e) => refine(e.currentTarget.value)}
      />
    </Flex>
  )
}

const SearchBox = connectSearchBox(SearchBoxComponent)

export default SearchBox
