import { Icon } from '@vtex/brand-ui'

import { IconProps } from '@vtex/brand-ui'

const FormattingIcon = (props: IconProps) => (
  <Icon
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#000"
      d="M11 22q-.825 0-1.412-.587A1.93 1.93 0 0 1 9 20v-4H6q-.824 0-1.412-.588A1.93 1.93 0 0 1 4 14V7q0-1.65 1.175-2.825T8 3h12v11q0 .825-.587 1.412A1.93 1.93 0 0 1 18 16h-3v4q0 .824-.588 1.413A1.93 1.93 0 0 1 13 22zM6 10h12V5h-1v4h-2V5h-1v2h-2V5H8q-.824 0-1.412.588A1.93 1.93 0 0 0 6 7zm0 4h12v-2H6z"
    />
  </Icon>
)

export default FormattingIcon
