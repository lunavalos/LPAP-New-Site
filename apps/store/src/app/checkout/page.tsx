'use client'

import React, { useState, useEffect } from 'react'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import StripeWrapper from '@/components/checkout/StripeWrapper'
import styles from '@/components/checkout/Checkout.module.css'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export default function CheckoutPage() {
  const [shipping, setShipping] = useState(180)

  useEffect(() => {
    fetch(`${PAYLOAD_URL}/api/globals/store-settings`)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.shippingPrice === 'number') {
          setShipping(data.shippingPrice)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className={styles.checkoutPage}>
      <div className="container">
        <h1 className={styles.title}>Finalizar Pedido</h1>

        <div className={styles.checkoutGrid}>
          <div className={styles.formCol}>
            <StripeWrapper shipping={shipping}>
              <CheckoutForm shipping={shipping} />
            </StripeWrapper>
          </div>

          <div className={styles.summaryCol}>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
