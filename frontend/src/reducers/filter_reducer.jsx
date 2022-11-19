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

const filter_reducer = (state, action) => {
  if (action.type === LOAD_QUERY_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      filtered_products: [...action.payload],
      products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }

  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      filtered_products: [...action.payload],
      products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }

  if (action.type === GRID_VIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }

  if (action.type === LIST_VIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { filtered_products, sort } = state;

    let tempProducts = [];
    if (sort === "price-lowest") {
      tempProducts = filtered_products.sort((a, b) => {
        return a.price - b.price;
      });
    }

    if (sort === "price-highest") {
      tempProducts = filtered_products.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (sort === "name-a") {
      tempProducts = filtered_products.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    }
    if (sort === "name-z") {
      tempProducts = filtered_products.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    }

    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === UPDATE_FILTER) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { products } = state;
    const { price } = state.filters;
    let tempProducts = [...products];
    tempProducts = tempProducts.filter((product) => product.price <= price);
    return { ...state, filtered_products: tempProducts };
  }

  throw new Error(`No Matching "${action.type}' -action type `);
};

export default filter_reducer;
