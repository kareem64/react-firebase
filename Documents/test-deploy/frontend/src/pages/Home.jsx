import React, { useEffect } from 'react'
import { toast } from'react-toastify'
import Item from '../componnent/product/Item'
import '../css/Home.css'
const Home = ({products}) => {
  
  return (
    <div className="home">
    {products.map((product, index) => (
      <Item key={index} product={product} />
    ))}
  </div>
  )
}

export default Home
