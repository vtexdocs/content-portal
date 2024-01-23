import { useRouter } from 'next/router'
import { Box, IconGlobe, Text, IconCaret, Flex } from '@vtex/brand-ui'
import styles from './styles'
import { Disclosure, DisclosureContent, useDisclosureState } from 'reakit'
import { LocaleOption } from '@vtex/brand-ui/dist/components/Header/LocaleSwitcher'

interface OptionProps {
  screen: 'mobile' | 'large'
  option: LocaleOption
  active: boolean
  onClick?: () => void
}

export default function LocaleSwitcher() {
  const router = useRouter()
  const options: LocaleOption[] = [
    {
      label: 'EN',
      value: 'en',
    },
    {
      label: 'PT',
      value: 'pt',
    },
    {
      label: 'ES',
      value: 'es',
    },
  ]

  const handleOptionClick = (option: string) => {
    const locale = option
    router.push(router.pathname, router.asPath, { locale })
    disclosure.hide()
  }
  const disclosure = useDisclosureState({ visible: false })
  const Option = ({ screen, option, onClick, active }: OptionProps) => {
    const variant = `localeSwitcher.${screen}.option`

    return (
      <Box
        variant={`${variant}${active ? '.active' : ''}`}
        role="presentation"
        onClick={onClick}
      >
        {option.label}
      </Box>
    )
  }

  const renderGlobe = (isDiscolosureVisible: boolean) => {
    if (isDiscolosureVisible) {
      return <IconGlobe sx={styles.iconGlobeVisible} size={24} />
    }

    return <IconGlobe sx={styles.iconGlobe} size={24} />
  }

  return (
    <Box sx={styles.localeSwitcher}>
      <Disclosure {...disclosure}>
        <Flex sx={{ alignItems: 'center' }}>
          {renderGlobe(disclosure.visible)}
          <Text sx={styles.localeLabel}>{router.locale?.toUpperCase()}</Text>
        </Flex>
        <IconCaret
          sx={styles.localeCaret}
          direction={disclosure.visible ? 'up' : 'down'}
          size={30}
        />
      </Disclosure>
      <Box sx={styles.optionContainer}>
        <DisclosureContent {...disclosure}>
          {options.map((option) => (
            <Option
              key={option.label}
              option={option}
              screen="large"
              onClick={() => {
                handleOptionClick(option.value)
              }}
              active={option.value === router.locale}
            />
          ))}
        </DisclosureContent>
      </Box>
    </Box>
  )
}
