import React, { useState } from 'react'
import './Home.css'
import Header from '../../Components/Header.jsx/Header'
import ExplorerMenu from '../../Components/ExplorerMenu/ExplorerMenu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'
import AppDownload from '../../AppDownload/AppDownload'

const Home = () => {

  const [category , setCategory] = useState('All')
  return (
    <div>
      <Header/>
      <ExplorerMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
