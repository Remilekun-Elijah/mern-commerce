import React, { useState, createContext, useContext, useEffect} from 'react';
import Backend from "../utils/backend"
import Alert from '../utils/alert'
import { useLocation, useNavigate } from 'react-router-dom';

const ProductsContext = createContext({})
export const useProductsContext = () => useContext(ProductsContext)

export default function ProductsProvider({children}) {


  const navigate = useNavigate()
 const [products, setProducts] = useState([])
 const [loading, setLoading] = useState(false)
 const [product, setProduct] = useState({
   title: "",
   brand: "",
   description: "",
   images: [],
   price: 1,
   rating: 1,
   stock:1,
   category: "",
 })

 const {state} = useLocation()
 const API = new Backend() 
 
 async function fetchProducts () {
  setLoading(true)
  try{
  const res = await API.send({type: "get", to: "/products"});
  setLoading(false)

  if(res.success) setProducts(res.data)
  else Alert({type: "error", message: "Failed to retrieve products"})

  } catch(err) {
   setLoading(false)
   console.log(err);
   Alert({type: "error", message: "Failed to retrieve products"})
  }
 }

 async function fetchProductsByCategoryId (category) {
  
  setLoading(true)
  try{
  const res = await API.send({type: "get", to: `/products/category/${category}/?pageSize=${state?4:""}`});
  setLoading(false)

  if(res.success) if(res.success) setProducts(res.products)
  else Alert({type: "error", message: "Failed to retrieve products"})
  } catch(err) {
   setLoading(false)
   console.log(err);
   Alert({type: "error", message: "Failed to retrieve products"})
  }
 }

 async function getProducts(categoryId) {
  if(categoryId) await fetchProductsByCategoryId(categoryId)
 else await fetchProducts()
 }

function handleChange ({target: {value, name, files}}){
  if(name === 'images') value = files;
  setProduct(state => ({...state, [name]: value}))
}
async function createProduct(e) {
  e.preventDefault()
  setLoading(true)
  try{

    let formdata = new FormData(e.target);
  const res = await API.send({type: action.method, to: action.url, 
  useAlert: true, payload: formdata})

  setLoading(false)
  if(res.success) {
    clearForm() 
    navigate('/')
  }

  return res
  }catch(err) {
    setLoading(false)
  }
}
const action = state
? {
    url: "/products/" + state?.id,
    method: "put",
  }
: {
  url: "/products",
    method: "post",
  };

// async function createProduct(e) {
//   e.preventDefault()
//   setLoading(true)
//   try{

//     let formdata = new FormData(e.target);
//   const res = await API.send({type: action.method, to: action.url, 
//   useAlert: true, payload: formdata})

//   setLoading(false)
//   if(res.success) {
//     clearForm()
//     navigate(`/products/${res.data.id}`, {state: res.data})  
//   }
//   }catch(err) {
//     console.log(err);
//     setLoading(false)
//   }
// }


async function deleteProduct (id, cb, error) {
  Alert({ type: "info", message: "Deleting post...", timer: 10000 })
  setLoading(true)
  try{
  const res = await API.send({type: "delete", to: "/products/"+id, useAlert: true});
  setLoading(false)

  if(res.success) {
    setProducts(products.filter(product => product.id !== id))
    cb?.()
  } else error?.()

  } catch(err) {
   setLoading(false)
   console.log(err)
   error?.()
  }
 }

 function clearForm() {
  setProduct({
    name: "",
    description: "",
    images: [],
    price: 1,
    rating: 1,
    quantity:1,
    category: "",
  })
 }

useEffect(()=>{
	if(state) setProduct({...state, category: state?.category?.id})
}, [state])


 const value = {
  getProducts,
  products,
  loading,
  product,
  handleChange,
  createProduct,
  deleteProduct,
  clearForm
 }
 
  return <ProductsContext.Provider {...{ value }}> { children } </ProductsContext.Provider>
}
