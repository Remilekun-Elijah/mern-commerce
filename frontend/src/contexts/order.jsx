import React, { useState, createContext, useContext} from 'react'
import Alert from '../utils/alert'
import Backend from '../utils/backend'
// import Storage from '../utils/storage'


export const OrderContext = createContext({})
export const useOrderContext = () => useContext(OrderContext)

export default function OrderProvider({children}) {
 const [orders, setOrders] = useState([])
 const [order, setOrder] = useState({})
 const [loading, setLoading] = useState(false);

 const API = new Backend();

 async function createOrder (payload){
  const res = await API.send({type: 'post', to: "/orders", payload, useAlert: true})
  if(res.success) setOrder(res.data)
  return res
 }

 async function fetchOrders () {
  setLoading(true)
  try{
  const res = await API.send({type: "get", to: "/orders"});
  setLoading(false)

  if(res.success) setOrders(res.data)
  else Alert({type: "error", message: "Failed to retrieve orders"})

  } catch(err) {
   setLoading(false)
   console.log(err);
   Alert({type: "error", message: "Failed to retrieve orders"})
  }
 }
 const value = {
  createOrder,
  orders,
  setOrders,
  loading,
  fetchOrders,
  order,
  setOrder
 }

 return <OrderContext.Provider {...{ value }}> { children } </OrderContext.Provider>
}
