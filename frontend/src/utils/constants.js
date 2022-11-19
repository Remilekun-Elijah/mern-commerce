import shopping_logo from "../assets/online-shopping.svg";
import { ILaptop, IWatches } from "./icons";

export const productsCategories = [
  {
    id: "womens-dresses",
    name: "womens dresses",
    image: " https://dummyjson.com/image/i/products/41/1.jpg",
  },

  {
    id: "lighting",
    name: "home lighting",
    image: "https://dummyjson.com/image/i/products/98/1.jpg",
  },

  {
    id: "laptops",
    name: "laptops",
    image: "https://dummyjson.com/image/i/products/9/1.jpg",
  },

  {
    id: "smartphones",
    name: "smartphones",
    image: "https://dummyjson.com/image/i/products/2/2.jpg",
  },

  {
    id: "mens-watches",
    name: "mens watches",
    image: "https://dummyjson.com/image/i/products/64/1.jpg",
  },

  {
    id: "mens-shirts",
    name: "mens shirts",
    image: "https://dummyjson.com/image/i/products/55/1.jpg",
  },

  {
    id: "womens-watches",
    name: "womens watches",
    image: "https://dummyjson.com/image/i/products/67/1.jpg",
  },

  {
    id: "womens-jewellery",
    name: "womens-jewellery",
    image: "https://dummyjson.com/image/i/products/76/1.jpg",
  },

  {
    id: "womens-bags",
    name: "womens bags",
    image: "https://dummyjson.com/image/i/products/71/1.jpg",
  },

  {
    id: "tops",
    name: "tops",
    image: "https://dummyjson.com/image/i/products/36/1.jpg",
  },

  {
    id: "mens-shoes",
    name: "mens shoes",
    image: "https://dummyjson.com/image/i/products/56/1.jpg",
  },

  {
    id: "womens-shoes",
    name: "womens footwear",
    image: "https://dummyjson.com/image/i/products/50/1.jpeg",
  },

  {
    id: "sunglasses",
    name: "sunglasses",
    image: "https://dummyjson.com/image/i/products/85/1.jpg",
  },

  {
    id: "automotive",
    name: "automotive",
    image: "https://dummyjson.com/image/i/products/86/1.jpg",
  },

  {
    id: "fragrances",
    name: "fragrances",
    image: "https://dummyjson.com/image/i/products/12/3.png",
  },

  {
    id: "home-decoration",
    name: "home decoration",
    image: "https://dummyjson.com/image/i/products/26/1.jpg",
  },

  {
    id: "furniture",
    name: "furniture",
    image: "https://dummyjson.com/image/i/products/27/1.jpg",
  },

  {
    id: "skincare",
    name: "skincare",
    image: "https://dummyjson.com/image/i/products/16/1.png",
  },
];

export const productsCategoriesNames = [
  { id: 1, url: "womens-dresses", text: "womens dresses" },
  { id: 2, url: "lighting", text: "home lighting" },
  { id: 3, url: "laptops", text: "laptops" },
  { id: 4, url: "smartphones", text: "smartphones" },
  { id: 5, url: "mens-watches", text: "mens watches" },
  { id: 6, url: "mens-shirts", text: "mens shirts" },

  { id: 7, url: "womens-watches", text: "womens watches" },
  { id: 8, url: "womens-jewellery", text: "womens-jewellery" },
  { id: 9, url: "womens-bags", text: "womens bags" },
  { id: 10, url: "tops", text: "tops" },
  { id: 11, url: "mens-shoes", text: "mens shoes" },
  { id: 12, url: "womens-shoes", text: "womens footwear" },
  { id: 13, url: "sunglasses", text: "sunglasses" },
  { id: 14, url: "automotive", text: "automotive" },

  { id: 15, url: "fragrances", text: "fragrances" },
  { id: 16, url: "home-decoration", text: "home decoration" },
  { id: 17, url: "furniture", text: "furniture" },
  { id: 18, url: "skincare", text: "skincare" },
];

export const heroLink = [
  {
    id: 1,
    name: "mens-watches",
    url: "/products",
    text: "We deliver to over 150 regions and countries",
    image: shopping_logo,
  },

  {
    id: 2,
    name: "mens-watches",
    url: "/products",
    text:
      "Shop for mens wrist watches on Amazon.com. Free shipping to everywhere.",
    image: IWatches,
  },

  {
    id: 3,
    name: "laptops",
    url: "/products",
    text:
      "Find amazing deals when you buy laptops online at Jumia Nigeria - notebooks, ultrabooks & more ",
    image: ILaptop,
  },

  {
    id: 4,
    name: "lighting",
    url: "/products",
    text:
      "Just 2 steps to complete the installation of 12 inch low profile ceiling light LED flush mount.",
    image: "https://dummyjson.com/image/i/products/98/1.jpg",
  },
];

export const API_ENDPOINT = "http://localhost:4000/";
