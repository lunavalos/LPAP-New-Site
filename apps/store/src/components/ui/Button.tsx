'use client'

import React from 'react'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  target?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  target,
  type = 'button',
}: ButtonProps) {
  
  const getStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      border: '2px solid transparent',
      cursor: 'pointer',
      textDecoration: 'none',
      fontFamily: "'Lato', sans-serif",
    }

    // Variants
    if (variant === 'primary') {
      Object.assign(style, {
        backgroundColor: 'var(--primary)',
        color: 'var(--bg-white)',
        borderColor: 'var(--primary)',
        boxShadow: '0 6px 20px rgba(244, 133, 43, 0.15)',
      })
    } else if (variant === 'secondary') {
      Object.assign(style, {
        backgroundColor: 'var(--accent)',
        color: 'var(--bg-white)',
        borderColor: 'var(--accent)',
        boxShadow: '0 6px 20px rgba(220, 93, 163, 0.15)',
      })
    } else if (variant === 'outline') {
      Object.assign(style, {
        backgroundColor: 'transparent',
        color: 'var(--primary)',
        borderColor: 'var(--primary)',
      })
    } else if (variant === 'text') {
      Object.assign(style, {
        backgroundColor: 'transparent',
        color: 'var(--text)',
        border: 'none',
        padding: '0',
      })
    }

    // Sizes
    if (size === 'sm') {
      Object.assign(style, {
        padding: '8px 18px',
        fontSize: '11px',
        borderRadius: '8px',
      })
    } else if (size === 'md') {
      Object.assign(style, {
        padding: '12px 28px',
        fontSize: '12px',
        borderRadius: '12px',
      })
    } else if (size === 'lg') {
      Object.assign(style, {
        padding: '16px 36px',
        fontSize: '14px',
        borderRadius: '14px',
      })
    }

    return style
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const el = e.currentTarget
    el.style.transform = 'translateY(-2px)'
    
    if (variant === 'primary') {
      el.style.backgroundColor = 'var(--primary-hover)'
      el.style.borderColor = 'var(--primary-hover)'
      el.style.boxShadow = '0 10px 25px rgba(244, 133, 43, 0.3)'
    } else if (variant === 'secondary') {
      el.style.backgroundColor = 'var(--accent-hover)'
      el.style.borderColor = 'var(--accent-hover)'
      el.style.boxShadow = '0 10px 25px rgba(220, 93, 163, 0.3)'
    } else if (variant === 'outline') {
      el.style.backgroundColor = 'var(--primary)'
      el.style.color = 'var(--bg-white)'
      el.style.boxShadow = '0 10px 25px rgba(244, 133, 43, 0.15)'
    } else if (variant === 'text') {
      el.style.color = 'var(--primary)'
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const el = e.currentTarget
    el.style.transform = 'translateY(0)'
    
    if (variant === 'primary') {
      el.style.backgroundColor = 'var(--primary)'
      el.style.borderColor = 'var(--primary)'
      el.style.boxShadow = '0 6px 20px rgba(244, 133, 43, 0.15)'
    } else if (variant === 'secondary') {
      el.style.backgroundColor = 'var(--accent)'
      el.style.borderColor = 'var(--accent)'
      el.style.boxShadow = '0 6px 20px rgba(220, 93, 163, 0.15)'
    } else if (variant === 'outline') {
      el.style.backgroundColor = 'transparent'
      el.style.color = 'var(--primary)'
      el.style.boxShadow = 'none'
    } else if (variant === 'text') {
      el.style.color = 'var(--text)'
    }
  }

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        target={target}
        style={getStyle()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      style={getStyle()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  )
}
