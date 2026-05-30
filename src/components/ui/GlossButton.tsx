'use client'

import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export default function GlossButton({ children, className = '', ...rest }: Props) {
  return (
    <button {...rest} className={`gloss-btn ${className}`}>
      <span className="sweep" aria-hidden />
      <span className="relative z-10">{children}</span>
      <span className="reflection" aria-hidden />
    </button>
  )
}
