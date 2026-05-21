'use client'

import React from 'react'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import styles from '@/components/checkout/Checkout.module.css'

export default function CheckoutPage() {
  return (
    <div className={styles.checkoutPage}>
      <div className="container">
        <h1 className={styles.title}>Finalizar Pedido</h1>
        
        <div className={styles.checkoutGrid}>
          <div className={styles.formCol}>
            <CheckoutForm />
          </div>
          
          <div className={styles.summaryCol}>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
