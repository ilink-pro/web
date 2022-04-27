import { useTheme }  from '@emotion/react'

/* eslint-disable */
import React         from 'react'

import { IconProps } from '../icons.interfaces'
export const UserHexagonIcon = (props: IconProps) => {
  const theme: any = useTheme()
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{
        filter: 'drop-shadow(0px 4px 10px #DFDFDF)',
      }}
      {...props}
    >
      <path
        d='M20.1215 3.78885C22.3737 2.66275 25.0247 2.66274 27.2769 3.78885L41.2769 10.7889C43.9872 12.144 45.6992 14.9141 45.6992 17.9443V30.0557C45.6992 33.0859 43.9872 35.856 41.2769 37.2111L27.2769 44.2111C25.0247 45.3373 22.3737 45.3373 20.1215 44.2111L6.12151 37.2111C3.41124 35.856 1.69922 33.0859 1.69922 30.0557V17.9443C1.69922 14.9141 3.41124 12.144 6.12151 10.7889L20.1215 3.78885Z'
        fill='white'
      />
      <circle
        cx={24.0017}
        cy={19.7712}
        r={3.77124}
        stroke='#D1CCEC'
        strokeWidth={2}
        strokeLinecap='round'
      />
      <path
        d='M32 31.885C30.9494 30.8344 29.7022 30.0011 28.3296 29.4325C26.9569 28.8639 25.4857 28.5713 24 28.5713C22.5143 28.5713 21.0431 28.8639 19.6704 29.4325C18.2978 30.0011 17.0506 30.8344 16 31.885'
        stroke='#D1CCEC'
        strokeWidth={2}
        strokeLinecap='round'
      />
    </svg>
  )
}
