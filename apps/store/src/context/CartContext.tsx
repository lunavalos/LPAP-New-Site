'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  imageUrl?: string | null
  slug: string
  variant?: {
    name: string
    sku: string
    price: number
  }
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, variantSku?: string) => void
  updateQuantity: (id: string, quantity: number, variantSku?: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('lpap-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e)
      }
    }
    setIsInitialized(true)
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('lpap-cart', JSON.stringify(items))
    }
  }, [items, isInitialized])

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen((prev) => !prev)

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id && i.variant?.sku === newItem.variant?.sku)
      if (existing) {
        return prev.map((i) => 
          (i.id === newItem.id && i.variant?.sku === newItem.variant?.sku) 
            ? { ...i, quantity: i.quantity + newItem.quantity } 
            : i
        )
      }
      return [...prev, newItem]
    })
    openCart() // Open drawer when item added
  }

  const removeItem = (id: string, variantSku?: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.variant?.sku === variantSku)))
  }

  const updateQuantity = (id: string, quantity: number, variantSku?: string) => {
    setItems((prev) => 
      prev.map((i) => (i.id === id && i.variant?.sku === variantSku ? { ...i, quantity: Math.max(1, quantity) } : i))
    )
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{ 
      items, addItem, removeItem, updateQuantity, clearCart, 
      totalItems, totalPrice, isCartOpen, openCart, closeCart, toggleCart 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
