/**
 * @param {object} data   takes in an object of boolean and number values
 * @param {boolean} data.previewInConsole  whether to preview the data/size in the console, default is true
 * @param {number} data.size  the actual size of the data/file in byte, default is 50000000
 * @returns  {number}  The size of the data/file
 **/
export const getFileSize = function(data = {}) {
  data.previewInConsole = data.previewInConsole ? data.previewInConsole : false;
  data.size = data.size !== (undefined || null || "") ? data.size : 50000000; // 50mb
  data.size = Number(data.size);
  const k = 1000;
  const format = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(data.size) / Math.log(k));
  const size = parseFloat(data.size / Math.pow(k, i)).toFixed(1);

  if (data.previewInConsole === true)
    console.info(data.size, " = ", size + format[i]);
  return size + " " + format[i];
};

export const getAmount = (num) => new Intl.NumberFormat().format(num);

export const validateEmail = (email) => {
  const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  return regexExp.test(email);
};

export const capitalize = (string) => {
  const final = string?.replace(/\w\S*/g, (txt) => {
    let val = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    return val;
  });
  return final;
};

export const handleSearch = ({ value, useCaps, cb }) => {
  const branch = useCaps ? capitalize(value) : value;
  cb(branch.trim());
};

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

export const paystack_secret = "pk_test_9782679ce2878a10907b68126ee6dd7ad62a0f6a"
