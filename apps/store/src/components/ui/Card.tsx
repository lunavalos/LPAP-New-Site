'use client'

import React from 'react'

interface CardProps {
  children: React.ReactNode
  hoverLift?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export default function Card({
  children,
  hoverLift = true,
  padding = 'md',
  className = '',
  style = {},
  onClick,
}: CardProps) {
  
  const getPaddingStyle = () => {
    switch (padding) {
      case 'none': return '0'
      case 'sm': return '16px'
      case 'md': return '32px 24px'
      case 'lg': return '48px 36px'
      default: return '32px 24px'
    }
  }

  const getStyle = (): React.CSSProperties => {
    return Object.assign({
      backgroundColor: 'var(--bg-white)',
      borderRadius: 'var(--border-radius)',
      border: '1px solid var(--border)',
      padding: getPaddingStyle(),
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      cursor: onClick ? 'pointer' : 'default',
      position: 'relative',
      overflow: 'hidden',
    }, style)
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverLift) {
      const el = e.currentTarget
      el.style.transform = 'translateY(-6px)'
      el.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.06)'
      el.style.borderColor = 'rgba(0, 0, 0, 0.08)'
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverLift) {
      const el = e.currentTarget
      el.style.transform = 'translateY(0)'
      el.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.02)'
      el.style.borderColor = 'var(--border)'
    }
  }

  return (
    <div
      className={className}
      onClick={onClick}
      style={getStyle()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
