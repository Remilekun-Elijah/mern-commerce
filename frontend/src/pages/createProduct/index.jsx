import React, { useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import Header from "../../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
// import { IArrowBack } from "../../utils/mock";
import TabControl from "../../components/tabControl/TabControl";
import CreateCategory from "../createCategory";
import { useProductsContext } from "../../contexts/products";
import { useEffect } from "react";
import { useCategoriesContext } from "../../contexts/category";

export default function Create() {
	const { state } = useLocation();
	
	const form = useRef();
	const [current, setCurrent] = useState("Product");
	const { loading, product, handleChange, createProduct, clearForm } =
		useProductsContext();
	const { fetchCategories, categories, clearForm: clear } = useCategoriesContext();

	const [images, setImages] = useState([]);
	useEffect(() => {
		let url = [];

		for (let i = 0; i < product.images.length; i++) {
			url.push(state?.images?.[i] || URL.createObjectURL(product.images[i]));
		}
		setImages(url);
	}, [product.images]);

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(()=> {
		clearForm()
		clear()
	}, [current])

	return (
		<div className="w-full h-screen ">
			<Header {...{ hideSearch: true }} />

			<div className="px-[10%] mt-16">
				<div className="flex justify-center">
					<TabControl
						{...{
							current,
							tabs: ["Product", "Category"],
							setCurrent,
							activeTabClass: "tabControl__tab--active",
							tabClass: "bg-gray-300 px-5"
						}}
					/>
				</div>
				<div className="flex justify-center ">
					{current === "Product" ? (
						<form
							ref={form}
							className="modal__one  border-t-2  md:w-[600px] sm:w-80 w-full mb-5"
							onSubmit={createProduct}>
							<div className="mt-10">
								<div className="flex items-center">
					
									<strong className="text-2xl sm:text-3xl">
										{state ? "Update Product" : "Create Product"}
									</strong>
								</div>

								<div>
									<h2 className="mb-3 mt-10 text-3xl pt-3 text-center text-md">
										Product Images
									</h2>
									<div
										className="h-64 w-full flex justify-center items-center border rounded relative shadow"
										style={{
											background: product.images[0]
												? ""
												: "rgba(0,0,0, .3) center",
										}}>
										<div className="cursor-pointer">
											{product.images[0] ? (
												<img alt="" src={images[0]} className="h-64 w-full" />
											) : (
												<div className="relative w-40 h-[7em]  text-base  text-feint rounded flex-col items-center	justify-center">
													<div className="flex items-center justify-center mt-5">
														<FiUploadCloud
															size={40}
															className="text-slate-500"
														/>
													</div>
													<p className="underline underline-offset-4 text-center text-slate-500 text-xl">
														Select Images
													</p>
												</div>
											)}
											<input
												onChange={handleChange}
												type="file"
												name="images"
												className="opacity-0 w-full absolute top-0 bottom-0 left-0 right-0 border cursor-pointer"
												multiple
											/>
										</div>
									</div>

									<div className="mb-10 mt-3 flex justify-center">
										{images.map((url, i) => {
											return (
												i > 0 &&
												i < 5 && (
													<img
														className="w-20 h-20 mr-5  rounded-full"
														src={url}
														alt={url}
													/>
												)
											);
										})}
									</div>

									<div className="w-full">
										<label
											htmlFor="name"
											className="block text-2xl font-bold mt-2 input-label text-left">
											{" "}
											Product Name{" "}
											<span
												style={{ top: "2px", color: "red" }}
												className="relative">
												*
											</span>
										</label>
										<input
											id="name"
											value={product.title}
											name={"title"}
											className={
												"p-5 text-2xl h- shadow rounded border-transparent  focus:border focus:border-black w-full"
											}
											type="text"
											required={true}
											onChange={handleChange}
											// placeholder="Enter product name..."
										/>
									</div>


									<div className="w-full mt-5">
										<label
											htmlFor="brand"
											className="block text-2xl font-bold mt-2 input-label text-left">
											{" "}
											Product Brand{" "}
											<span
												style={{ top: "2px", color: "red" }}
												className="relative">
												*
											</span>
										</label>
										<input
											id="brand"
											value={product.brand}
											name={"brand"}
											className={
												"p-5 text-2xl h- shadow rounded border-transparent  focus:border focus:border-black w-full"
											}
											type="text"
											required={true}
											onChange={handleChange}
											// placeholder="Enter product name..."
										/>
									</div>

									<div className="w-full my-5">
										<label
											htmlFor="price"
											className="block text-2xl font-bold mt-2 input-label text-left">
											{" "}
											Product Price{" "}
											<span
												style={{ top: "2px", color: "red" }}
												className="relative">
												*
											</span>
										</label>
										<input
											id="price"
											value={product.price}
											name={"price"}
											className={
												"shadow rounded w-full border-transparent p-5 text-2xl focus:border focus:border-black"
											}
											type="number"
											required={true}
											onChange={handleChange}
										/>
									</div>

									<div className="w-full">
										<label
											htmlFor="stock"
											className="block text-2xl font-bold mt-2 input-label text-left">
											{" "}
											Product Quantity{" "}
											<span
												style={{ top: "2px", color: "red" }}
												className="relative">
												*
											</span>
										</label>
										<input
											id="stock"
											value={product.stock}
											name={"stock"}
											className={
												"shadow rounded w-full border-transparent p-5 text-2xl focus:border focus:border-black"
											}
											type="text"
											required={true}
											onChange={handleChange}
											// placeholder="Enter post title..."
										/>
									</div>

									<div className="w-full mt-5">
										<label
											htmlFor="rating"
											className="block text-2xl font-bold mt-2 input-label text-left">
											{" "}
											Product Rating{" "}
											<span
												style={{ top: "2px", color: "red" }}
												className="relative">
												*
											</span>
										</label>
										<input
											id="rating"
											value={product.rating}
											name={"rating"}
											className={
												"shadow rounded p-5 text-2xl w-full border-transparent  focus:border focus:border-black"
											}
											type="number"
											max={5}
											min={1}
											required={true}
											onChange={handleChange}
											// placeholder="Enter rating..."
										/>
									</div>

									<div className="w-full my-5">
										<label
											htmlFor="category"
											className="block text-2xl font-bold mt-2 input-label text-left">
											{" "}
											Product Category{" "}
											<span
												style={{ top: "2px", color: "red" }}
												className="relative">
												*
											</span>
										</label>
										<select
											name="category"
											value={product.category}
											onChange={handleChange}
											id="category"
											className="w-full p-5 text-2xl shadow rounded border-transparent  bg-white focus:border focus:border-black">
											{categories && categories?.map((data) => {
												return <option value={data.id}>{data.name}</option>;
											})}
										</select>
									</div>

									<label
										htmlFor="content"
										className="block text-2xl font-bold mt-2 input-label text-left">
										Product Description{" "}
										<span
											style={{ top: "2px", color: "red" }}
											className="relative">
											*
										</span>
									</label>
									<textarea
										className="border focus:border-black rounded w-full p-3 text-2xl  text-gray-700 leading-tight shadow focus:outline-none focus:shadow-outline resize-none outline-none"
										rows={3}
										id="content"
										value={product.description}
										name={"description"}
										placeholder={"Write the description here..."}
										minLength={3}
										onChange={handleChange}
										required={true}
									/>
								</div>

								<div className="flex mx-auto justify-center  my-10 w-full">
									<button
										className="bg-slate-900 text-white text-2xl shadow rounded-md w-full h-[40px]"
										type={"submit"}
										disabled={loading}>
										{" "}
										{loading
											? "Sending..."
											: state
											? "Update Product"
											: "Create Product"}{" "}
									</button>
								</div>
							</div>
						</form>
					) : (
						<CreateCategory />
					)}
				</div>
			</div>
			{/* <Footer /> */}
		</div>
	);
}
