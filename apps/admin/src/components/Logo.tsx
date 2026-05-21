'use client'

import React from 'react'

export const Logo: React.FC = () => {
  return (
    <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="20" fill="url(#paint0_linear)" />
        <path
          d="M30 70V30H45C55 30 60 35 60 42.5C60 50 55 55 45 55H40V70H30ZM40 45H45C48 45 50 43.5 50 42.5C50 41.5 48 40 45 40H40V45Z"
          fill="white"
        />
        <path
          d="M65 70L55 45"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="paint0_linear" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      <span style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        letterSpacing: '-1px',
        background: 'linear-gradient(to right, #fff, #ccc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        LPAP
      </span>
    </div>
  )
}
