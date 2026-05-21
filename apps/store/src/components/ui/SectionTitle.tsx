import React from 'react'

interface SectionTitleProps {
  tag?: string
  title: string | React.ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  tagColor?: 'primary' | 'secondary' | 'accent'
}

export default function SectionTitle({
  tag,
  title,
  subtitle,
  align = 'center',
  tagColor = 'accent',
}: SectionTitleProps) {
  
  const getTagStyle = (): React.CSSProperties => {
    let colorVal = 'var(--accent)'
    let bgVal = 'rgba(220, 93, 163, 0.08)'

    if (tagColor === 'primary') {
      colorVal = 'var(--primary)'
      bgVal = 'rgba(244, 133, 43, 0.08)'
    } else if (tagColor === 'secondary') {
      colorVal = 'var(--secondary)'
      bgVal = 'rgba(73, 159, 208, 0.08)'
    }

    return {
      display: 'inline-block',
      fontSize: '11px',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '2px',
      color: colorVal,
      backgroundColor: bgVal,
      padding: '6px 16px',
      borderRadius: '100px',
      marginBottom: '16px',
      fontFamily: "'Lato', sans-serif",
    }
  }

  const getTitleStyle = (): React.CSSProperties => {
    return {
      fontSize: 'clamp(28px, 4vw, 44px)',
      fontWeight: 900,
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
      color: 'var(--text)',
      marginBottom: subtitle ? '16px' : '0px',
      fontFamily: "'Lato', sans-serif",
    }
  }

  const getSubtitleStyle = (): React.CSSProperties => {
    return {
      fontSize: 'clamp(15px, 2vw, 17px)',
      color: 'var(--text-muted)',
      lineHeight: 1.6,
      maxWidth: '600px',
      marginLeft: align === 'center' ? 'auto' : '0',
      marginRight: align === 'center' ? 'auto' : '0',
      fontWeight: 400,
      fontFamily: "'Lato', sans-serif",
    }
  }

  return (
    <div style={{ textAlign: align, marginBottom: '48px', width: '100%' }}>
      {tag && <span style={getTagStyle()}>{tag}</span>}
      <h2 style={getTitleStyle()}>{title}</h2>
      {subtitle && <p style={getSubtitleStyle()}>{subtitle}</p>}
    </div>
  )
}
