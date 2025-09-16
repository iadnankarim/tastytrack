import { createContext, useEffect, useState } from "react";
import axios from 'axios'

// import { food_list } from "../assets/frontend_assets/assets";


export const StoreContext = createContext(null)


const StoreContextProvider = (props)=>{
  // console.log("food_list:", food_list); // Add this line

  const [cartItems,setCartItems]= useState({})
  const [token , setToken]= useState("")
  const [food_list, setFood_list]=useState([])
  const url ="http://localhost:4000"

  //first time card create krha hai 
  //else mai card already hai tuo wo +1 krha hai
  const addToCart = async(itemId)=>{
    
      if(!cartItems[itemId]){
        setCartItems((prev)=>({...prev,[itemId]:1}))
      }else{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
      }
      if(token){
        await axios.post(url+ "/api/cart/add",{itemId},{headers:{token}})
      }
  };
  
  //remove 
  const removeFromCart=async(itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))

    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  }

  //when the carditem update card state 
  // useEffect(()=>{
  //   console.log(cartItems)
  // },[cartItems])

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = food_list.find((product) => product._id === item)
  //       totalAmount += itemInfo.price * cartItems[item]
  //     }
  //   }
  //   return totalAmount
  // }
  const getTotalCartAmount = () => {
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      let itemInfo = food_list.find((product) => product._id === item);
      if (itemInfo) { // ✅ check if found
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
  }
  return totalAmount;
};


  const fetchFoodList =async()=>{
    const response  = await axios.get(url+"/api/food/list")
    setFood_list(response.data.data)
  }

  const loadCartData = async (token) => {
  try {
    const response = await axios.post(
      url + "/api/cart/get",
      {}, // no itemId needed for fetching full cart
      { headers: { token } }
    );
    setCartItems(response.data.cartData || {}); // update state
  } catch (err) {
    console.log("Error loading cart data:", err);
  }
};


  useEffect(()=>{
   
    async function loadData() {
      await fetchFoodList()

       if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
      await loadCartData(localStorage.getItem("token"))
    }
    }
    loadData()
  },[])



  const contextValue={
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      url,
      token,
      setToken
  }

  return(
    <StoreContext.Provider value={contextValue}>
       {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider