import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import { useProductsContext } from "./products_context";
import {
  LOAD_PRODUCTS,
  LOAD_QUERY_PRODUCTS,
  GRID_VIEW,
  LIST_VIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTER,
  FILTER_PRODUCTS,
} from "../actions";

const FilterContext = React.createContext();

const initialState = {
  filtered_products: [],
  products: [],
  grid_view: true,
  sort: "price-lowest",

  filters: {
    min_price: 0,
    max_price: 0,
    price: 0,
  },
};

export const FilterProvider = ({ children }) => {
  const { products, query_products, query } = useProductsContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [state.sort, state.filters]);

  const gridView = () => {
    dispatch({ type: GRID_VIEW });
  };
  const listView = () => {
    dispatch({ type: LIST_VIEW });
  };

  useEffect(() => {
    if (query_products.length !== 0 && query.length !== 0) {
      dispatch({ type: LOAD_QUERY_PRODUCTS, payload: query_products });
    }
  }, [query_products, query]);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  const upDateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const updateFilter = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    dispatch({ type: UPDATE_FILTER, payload: { name, value } });
  };

  return (
    <FilterContext.Provider
      value={{ ...state, gridView, listView, upDateSort, updateFilter }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
