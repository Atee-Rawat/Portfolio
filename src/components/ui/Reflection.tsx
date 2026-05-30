'use client'

import React from 'react'

export default function Reflection({ className = '' }: { className?: string }) {
  return <div className={`reflection ${className}`} aria-hidden />
}
