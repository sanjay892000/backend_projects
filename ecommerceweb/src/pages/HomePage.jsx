import React from 'react'
import NewsletterAndSignIn from '../components/NewsletterAndSignIn'
import CategoryBar from '../components/CategoryBar'
import ShowProduct from '../components/ShowProduct'

function HomePage() {
  return (
    <>
      <CategoryBar />
      <ShowProduct />
      <NewsletterAndSignIn />
    </>
  )
}

export default HomePage