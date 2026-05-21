import React from 'react'

interface RichTextProps {
  content: any
  className?: string
}

const RichText: React.FC<RichTextProps> = ({ content, className }) => {
  if (!content || !content.root || !content.root.children) {
    return null
  }

  return (
    <div className={className}>
      {serialize(content.root.children)}
    </div>
  )
}

function serialize(children: any[]): React.ReactNode[] {
  return children.map((node, i) => {
    if (node.type === 'text') {
      let text = <span key={i}>{node.text}</span>
      if (node.format & 1) text = <strong key={i}>{text}</strong> // Bold
      if (node.format & 2) text = <em key={i}>{text}</em> // Italic
      if (node.format & 8) text = <u key={i}>{text}</u> // Underline
      if (node.format & 16) text = <code key={i}>{text}</code> // Code
      return text
    }

    if (!node) return null

    switch (node.type) {
      case 'paragraph':
        return (
          <p key={i} style={{ marginBottom: '1.5rem' }}>
            {serialize(node.children)}
          </p>
        )
      case 'heading': {
        const Tag = node.tag as keyof React.JSX.IntrinsicElements
        return (
          <Tag key={i} style={{ fontWeight: 800, marginBottom: '1rem', marginTop: '2rem' }}>
            {serialize(node.children)}
          </Tag>
        )
      }
      case 'list': {
        const Tag = node.listType === 'bullet' ? 'ul' : 'ol'
        return (
          <Tag key={i} style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            {serialize(node.children)}
          </Tag>
        )
      }
      case 'listitem':
        return <li key={i}>{serialize(node.children)}</li>
      case 'link':
        return (
          <a
            key={i}
            href={node.fields?.url}
            target={node.fields?.newTab ? '_blank' : '_self'}
            rel={node.fields?.newTab ? 'noopener noreferrer' : ''}
            style={{ color: '#f4852b', textDecoration: 'underline' }}
          >
            {serialize(node.children)}
          </a>
        )
      case 'quote':
        return (
          <blockquote key={i} style={{ borderLeft: '4px solid #ddd', paddingLeft: '1rem', fontStyle: 'italic', margin: '2rem 0' }}>
            {serialize(node.children)}
          </blockquote>
        )
      default:
        if (node.children) {
          return <React.Fragment key={i}>{serialize(node.children)}</React.Fragment>
        }
        return null
    }
  })
}

export default RichText
