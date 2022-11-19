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

const products_reducer = (state, action) => {
  if (action.type === MENU_OPEN) {
    return { ...state, isMenuOpen: true };
  }
  if (action.type === MENU_CLOSE) {
    return { ...state, isMenuOpen: false };
  }
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true };
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    return {
      ...state,
      products_loading: false,
      products: [...action.payload],
    };
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return {
      ...state,
      products_loading: false,
      products_error: true,
    };
  }

  if (action.type === GET_QUERY_PRODUCTS_BEGIN) {
    return {
      ...state,
      query: action.payload,
      query_products_loading: true,
      query_products_error: false,
    };
  }
  if (action.type === GET_QUERY_PRODUCTS_SUCCESS) {
    return {
      ...state,
      query_products_loading: false,
      query_products: [...action.payload],
    };
  }

  if (action.type === GET_QUERY_PRODUCTS_ERROR) {
    return {
      ...state,
      query_products_loading: false,
      query_products_error: true,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: false,
      single_product: { ...action.payload },
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    };
  }

  if (action.type === GET_RECOMMENDED_PRODUCT_BEGIN) {
    return {
      ...state,
      recommended_products_loading: true,
      recommended_products_error: false,
    };
  }
  if (action.type === GET_RECOMMENDED_PRODUCT_SUCCESS) {
    const { products, id } = action.payload;

    let tempProduct = products.filter((product) => product.id !== id).slice(1);

    return {
      ...state,
      recommended_products_loading: false,
      recommended_products_error: false,
      recommended_products: [...tempProduct],
    };
  }

  if (action.type === GET_RECOMMENDED_PRODUCT_ERROR) {
    return {
      ...state,
      recommended_products_loading: false,
      recommended_products_error: true,
    };
  }
  throw new Error(`No Matching "${action.type}' -action type `);
};

export default products_reducer;
