import { Icon, IconProps } from '@vtex/brand-ui'

const EmailIcon = (props: IconProps) => (
  <Icon
    {...props}
    width="25"
    height="25"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#000"
      d="M5 21q-.824 0-1.412-.588A1.93 1.93 0 0 1 3 19V5q0-.825.587-1.413A1.93 1.93 0 0 1 5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.412A1.93 1.93 0 0 1 19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15a1.98 1.98 0 0 1 1.425.6L22.425 3q.275.3.425.662T23 4.4t-.137.737a1.9 1.9 0 0 1-.438.663L13.25 15zm2-2h1.4l5.8-5.8-.7-.7-.725-.7L11 11.575z"
    />
  </Icon>
)

export default EmailIcon
