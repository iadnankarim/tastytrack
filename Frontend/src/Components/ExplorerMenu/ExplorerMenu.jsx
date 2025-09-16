import React from 'react'
import './ExplorerMenu.css'
import {menu_list} from '../../assets/frontend_assets/assets'

const ExplorerMenu = ({category , setCategory}) => {
  
  return (
    <div className='explorer-menu' id='explorer-menu'>
      <h1>Explore our Menu</h1>
      <p className='explorer-menu-text'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, eveniet mollitia? Rerum a vel enim dolores nobis, aliquid temporibus fuga!</p>

      <div className="explorer-menu-list">
        {menu_list.map((item, index)=>{
          return (
            <div onClick={()=>setCategory(prev=> prev === item.menu_name ? 'All':item.menu_name)} key={index} className='explorer-menu-list-item'>
              <img className={category === item.menu_name ? 'active':''} src={item.menu_image} alt="" />
              <p>{item.menu_name }</p>
            </div>
          )
        })}
      </div>

      <hr />
    </div>
  )
}

export default ExplorerMenu
