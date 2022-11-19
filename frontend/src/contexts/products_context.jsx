import React, { useContext, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/products_reducer";
import { API_ENDPOINT } from "../utils/constants";

import {
  MENU_OPEN,
  MENU_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_QUERY_PRODUCTS_BEGIN,
  GET_QUERY_PRODUCTS_SUCCESS,
  GET_QUERY_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  GET_RECOMMENDED_PRODUCT_BEGIN,
  GET_RECOMMENDED_PRODUCT_SUCCESS,
  GET_RECOMMENDED_PRODUCT_ERROR,
} from "../actions";

const initialState = {
  isMenuOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  query: "",
  query_products_loading: false,
  query_products_error: false,
  query_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
  recommended_products_loading: false,
  recommended_products_error: false,
  recommended_products: [],
};
const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [payload, setPayload] = React.useState({
    images: [],
    rating: "4",
    stock: "",
    brand: "",
    category: "",
    price: "",
    thumbnail: "",
    title: "",
    description: "",
  });

  const openMenu = () => {
    dispatch({ type: MENU_OPEN });
  };

  const closeMenu = () => {
    dispatch({ type: MENU_CLOSE });
  };

  const fetchProducts = async (name) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(
        `${API_ENDPOINT}products/category/${name}`
      );
      const products = response.data.products;

      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  const queryProducts = async (e) => {
    let value = e.target.value;

    dispatch({ type: GET_QUERY_PRODUCTS_BEGIN, payload: value });
    try {
      const response = await axios.get(
        `${API_ENDPOINT}products/search?q=${value}`
      );

      const products = response.data.products;

      if (products.length !== 0) {
        dispatch({ type: GET_QUERY_PRODUCTS_SUCCESS, payload: products });
      } else throw new Error();
    } catch (error) {
      dispatch({ type: GET_QUERY_PRODUCTS_ERROR });
    }
  };

  const fetchSingleProduct = async (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const data = await axios.get(`${API_ENDPOINT}products/${id}`);
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  const fetchRecommendedProducts = async (id, name) => {
    dispatch({ type: GET_RECOMMENDED_PRODUCT_BEGIN });
    try {
      const response = await axios.get(
        `${API_ENDPOINT}products/category/${name}`
      );
      const products = response.data.products;
      dispatch({
        type: GET_RECOMMENDED_PRODUCT_SUCCESS,
        payload: { products, id },
      });
    } catch (error) {
      dispatch({ type: GET_RECOMMENDED_PRODUCT_ERROR });
    }
  };

  const createProduct = async (e) => {
    e.preventDefault();
  };

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openMenu,
        closeMenu,
        fetchProducts,
        queryProducts,
        fetchSingleProduct,
        fetchRecommendedProducts,
        createProduct,
        setPayload,
        payload,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
