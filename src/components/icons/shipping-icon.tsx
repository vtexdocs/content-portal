import type { IconProps } from '@vtex/brand-ui'
import { Icon } from '@vtex/brand-ui'

const ShippingIcon = (props: IconProps) => (
  <Icon
    {...props}
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="16rem" height="16rem" fill="none"></rect>
    <path
      d="M224,177.32117V78.67873a8,8,0,0,0-4.07791-6.9726l-88-49.5a8,8,0,0,0-7.84418,0l-88,49.5A8,8,0,0,0,32,78.67873v98.64244a8,8,0,0,0,4.07791,6.97261l88,49.5a8,8,0,0,0,7.84418,0l88-49.5A8,8,0,0,0,224,177.32117Z"
      fill="none"
      stroke="#4A596B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="18"
    ></path>
    <polyline
      points="222.897 74.626 128.949 128 33.108 74.617"
      fill="none"
      stroke="#4A596B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="18"
    ></polyline>
    <line
      x1="128.94915"
      y1="127.99996"
      x2="128.01036"
      y2="234.82127"
      fill="none"
      stroke="#4A596B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="18"
    ></line>
  </Icon>
)

export default ShippingIcon
