import React, { useState, createContext, useContext} from 'react';
import Backend from "../utils/backend"
import Alert from '../utils/alert'
import { useNavigate } from 'react-router-dom';


const CategoriesContext = createContext({})
export const useCategoriesContext = () => useContext(CategoriesContext)

export default function CategoriesProvider({children}) {
 const [categories, setCategories] = useState([])
 const [isLoading, setLoading] = useState(false)
const [category, setCategory] = useState({image: "", name: ""})
const navigate = useNavigate()

 const API = new Backend() 
 
 async function fetchCategories () {
  setLoading(true)
  try{
  const res = await API.send({type: "get", to: "/category"});
  setLoading(false)

  if(res.success) setCategories(res.data)
  else Alert({type: "error", message: "Failed to retrieve categories"})

  } catch(err) {
   setLoading(false)
   console.log(err);
   Alert({type: "error", message: "Failed to retrieve categories"})
  }
 }

 function clearForm(){
  setCategory({image: "", name: ""})
 }


function handleChange ({target: {value, name, files}}){
  if(name === 'image') value = files[0];
  setCategory(state => ({...state, [name]: value}))
}
async function createCatgeory(e) {
  e.preventDefault()
  setLoading(true)
  try{

    let formdata = new FormData(e.target);
  const res = await API.send({type: "post", to: "/category", 
  useAlert: true, payload: formdata})

  setLoading(false)
  if(res.success) {
    clearForm()
    navigate(`/`)  
  }
  }catch(err) {
    console.log(err);
    setLoading(false)
  }
}

 const value = {
  fetchCategories,
  categories,
  isLoading,
  handleChange,
  createCatgeory,
  clearForm,
  category
 }
 
  return <CategoriesContext.Provider {...{ value }}> { children } </CategoriesContext.Provider>
}
