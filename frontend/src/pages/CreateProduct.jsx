import React, { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
import Header from "../components/PageNavbar";
import Footer from "../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import SelectField from "../components/SelectField";
import { useProductsContext } from "../contexts/products_context";
import { API_ENDPOINT, productsCategories } from "../utils/constants";
import { useState } from "react";
import { useEffect } from "react";

const Alert = () => {};

export default function CreateProduct() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const form = useRef();
  const { createProduct, payload, setPayload } = useProductsContext();

  const [isSubmitting, setSubmit] = React.useState(false);

  const action = state
    ? {
        url: `${API_ENDPOINT}products` + state?._id,
        method: "PUT",
      }
    : {
        url: `${API_ENDPOINT}products`,
        method: "POST",
      };

  const addData = ({ target: { name, value } }) => {
    setPayload((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      let { thumbnail, url, images, files, ...rest } = payload;
      //   files[files.length] = thumbnail;
      const fData = { ...rest, images: files };
      const formData = new FormData();
      setSubmit(true);
      for (let key in fData) {
        formData.append(key, payload[key]);
      }

      Alert({
        type: "info",
        message: state ? "Updating product..." : "Creating product...",
        timer: 10000,
      });

      fetch(action.url, {
        method: action.method,
        body: formData,
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then(({ success, message, ...rest }) => {
          Alert({ type: success ? "success" : "error", message });

          if (success) {
            navigate(`/products/${rest.data._id}`, { state: rest.data });
          }
          setSubmit(false);
        })
        .catch((err) => {
          setSubmit(false);
          console.error(err);
          Alert({ type: "error", message: "Something went wrong" });
        });
    },
    handleImageUpload = ({ target: { files } }) => {
      const url = URL.createObjectURL(files[0]);
      setPayload((state) => ({ ...state, thumbnail: files[0], url }));
    };

  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(`${API_ENDPOINT}category`, {
      headers: { authorization: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((res) => {
        const { data } = res;
        if (res.success)
          setOptions(data.map((data) => ({ name: data.name, value: data.id })));
      });
  }, []);
  return (
    <div className="h-screen">
      <Header />

      <div className=" flex justify-center px-[10%] mt-20">
        <form
          ref={form}
          className="modal__one rounded-2xl  md:w-[600px] w-80 border-0  mb-5"
          onSubmit={handleSubmit}
        >
          <div className="mt-">
            <div className="flex items-center">
              {/* <img
                src={IArrowBack}
                alt="arrow back"
                className="w-9 cursor-pointer mr-2 sm:mr-5 mt-1 hover:bg-slate-500 p-2 rounded-full"
                onClick={(_) => navigate(-1)}
              />{" "} */}
              <strong className="text-lg sm:text-2xl">
                {state ? "Update Product" : "Create Product"}
              </strong>
            </div>

            <div>
              <div
                className="h-64 w-full flex mt-10 justify-center items-center border rounded relative"
                style={{
                  background: payload.url ? "" : "rgba(0,0,0, .3) center",
                }}
              >
                <div className="cursor-pointer">
                  {payload.url ? (
                    <img alt="" src={payload.url} className="h-64 w-full" />
                  ) : (
                    <div className="relative w-40 h-[7em]  text-base  text-feint rounded flex-col items-center	justify-center">
                      <div className="flex items-center justify-center mt-5">
                        <FiUploadCloud size={40} className="text-white" />
                      </div>
                      <p className="underline underline-offset-4 text-center text-white">
                        Select Image
                      </p>
                    </div>
                  )}
                  <input
                    onChange={handleImageUpload}
                    type="file"
                    name="image"
                    className="opacity-0 w-full absolute top-0 bottom-0 left-0 right-0 border cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex justify-between relative">
                {/* {payload.images.length === 0 && ( */}
                <div className="flex mt-5 flex-col z-10">
                  <div className="border-2 w-[110px] border-black border-dotted p-3 relative rounded">
                    <div className="flex justify-center">
                      <FiUploadCloud size={20} className="text-slate-700" />
                      <label className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          onChange={({ target: { files } }) => {
                            let arr = [];
                            for (let i = 0; i < 3; i++) {
                              arr.push(files[i]);
                            }
                            setPayload((state) => ({
                              ...state,
                              images: arr,
                              files,
                            }));
                          }}
                        />
                      </label>
                    </div>
                    <h1 className="text-2xl text-center">Upload more</h1>
                  </div>
                  <small className="text-red-600 italic text-xl">
                    Select 3 more
                  </small>
                </div>
                {/* )} */}
                <div className="flex absolute ml-10 z-5 flex-wrap w-full mt-5 justify-center">
                  {payload?.images.map((data) => {
                    return (
                      <img
                        className="w-20 h-20 mr-5"
                        src={URL.createObjectURL(data)}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="w-full mt-20 mb-5">
                <label
                  htmlFor="description"
                  className="block text-2xl  mb-2 input-label text-left"
                >
                  {" "}
                  Product Name{" "}
                  <span
                    style={{ top: "2px", color: "red" }}
                    className="relative"
                  >
                    *
                  </span>
                </label>
                <input
                  value={payload.title}
                  name={"title"}
                  className={
                    "shadow rounded w-full p-4 transition-all placeholder:text-xl focus:outline-none text-2xl border-none focus:shadow-md"
                  }
                  type="text"
                  required={true}
                  onChange={addData}
                  placeholder="Enter product name..."
                />
              </div>

              <div className="w-full mb-5">
                <label
                  htmlFor="price"
                  className="block text-2xl  mb-2 input-label text-left"
                >
                  {" "}
                  Product Price{" "}
                  <span
                    style={{ top: "2px", color: "red" }}
                    className="relative"
                  >
                    *
                  </span>
                </label>
                <input
                  value={payload.price}
                  name={"price"}
                  className={
                    "shadow rounded w-full p-4 placeholder:text-xl transition-all focus:outline-none text-2xl border-none focus:shadow-md"
                  }
                  type="number"
                  min={1}
                  required={true}
                  onChange={addData}
                  placeholder="Enter product price..."
                />
              </div>

              <div className="mb-">
                <SelectField
                  {...{
                    required: true,
                    label: "Category",
                    wrapperClass: "mb-",
                    inputC: "text-2xl placeholder:text-xl ",
                    name: "category",
                    labelClass: "mt-2 text-2xl",
                    options,
                    useSearch: true,
                    onChange: (_, { name: category }) =>
                      setPayload((state) => ({ ...state, category })),
                    value: payload.category,
                  }}
                />
              </div>

              <div className="w-full mb-5">
                <label
                  htmlFor="description"
                  className="block text-2xl  mb-2 input-label text-left"
                >
                  {" "}
                  Product Quantity{" "}
                  <span
                    style={{ top: "2px", color: "red" }}
                    className="relative"
                  >
                    *
                  </span>
                </label>
                <input
                  value={payload.stock}
                  name={"stock"}
                  className={
                    "shadow rounded w-full p-4 transition-all placeholder:text-xl focus:outline-none text-2xl border-none focus:shadow-md"
                  }
                  type="number"
                  min={1}
                  required={true}
                  onChange={addData}
                  placeholder="Enter quantity..."
                />
              </div>

              <div className="mb-">
                <SelectField
                  {...{
                    required: true,
                    label: "Product Rating",
                    inputC: "text-2xl placeholder:text-xl",
                    name: "rating",
                    labelClass: "mt-2 text-2xl",
                    options: ["1", "2", "3", "4", "5"],
                    useSearch: false,
                    onChange: (_, rating) =>
                      setPayload((state) => ({ ...state, rating })),
                    value: payload.rating,
                  }}
                />
              </div>

              <div className="w-full mb-5">
                <label
                  htmlFor="description"
                  className="block text-2xl  mb-2 input-label text-left"
                >
                  {" "}
                  Product Brand{" "}
                  <span
                    style={{ top: "2px", color: "red" }}
                    className="relative"
                  >
                    *
                  </span>
                </label>
                <input
                  value={payload.brand}
                  name={"brand"}
                  className={
                    "shadow rounded w-full p-4 transition-all placeholder:text-xl focus:outline-none text-2xl border-none focus:shadow-md"
                  }
                  type="text"
                  min={1}
                  required={true}
                  onChange={addData}
                  placeholder="Enter quantity..."
                />
              </div>
              <label
                htmlFor="content"
                className="block text-2xl my-2 input-label text-left"
              >
                Product Description{" "}
                <span style={{ top: "2px", color: "red" }} className="relative">
                  *
                </span>
              </label>
              <textarea
                className="rounded w-full leading-tight bg-white  p-4 focus:py-4 transition-all text-2xl border-none focus:shadow-md focus:outline-none resize-none shadow"
                rows={3}
                id="content"
                value={payload.description}
                name={"description"}
                placeholder={"Write your description here..."}
                minLength={3}
                onChange={addData}
                required={true}
              />
            </div>

            <div className="flex mx-auto justify-center my-10 w-full">
              <button
                className="bg-slate-900 text-white text-xl shadow rounded-md w-full h-[40px]"
                type={"submit"}
                disabled={isSubmitting}
              >
                {" "}
                {isSubmitting
                  ? "Sending..."
                  : state
                  ? "Update product"
                  : "Create Product"}{" "}
              </button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
