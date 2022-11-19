import React from "react";
// import HomeLayout from "../../layout/Home";
import Header from "../../components/PageNavbar";
import { FiSearch } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CardComp from "../../components/Card/Card";
// import ArrowLeft from "../../assets/images/ArrowLeft.svg";
import Button from "../../components/form/button/Button";
import { getAmount } from "../../utils/helpers";
// import OrderAction from "../../actions/order";
import dayjs from "dayjs";
import { IArrowBack } from "../../utils/mock";
import { getByStatusText } from "../../utils/color";

const SearchBoxDiv = styled.div`
		border: 1px solid #a5adba;
	`,
	SearchBox = styled.input`
		color: #030d25;
	`;

const ProductHistory = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
console.log(state);
	const [orderProgress, setOrderProgress] = React.useState({});

	// function getOrderProgress() {
	// 	OrderAction.getOrderProgress(state?.id).then((data) =>
	// 		setOrderProgress(data),
	// 	);
	// }

	// React.useEffect(() => {
	// 	getOrderProgress();
	// }, []);

	return (
		<>
			<Header
				{...{
					title: "History",
					// subtitle: "Manage account settings",
				}}
			/>
			
<div className="flex justify-center mt-20">
	<div className="shadow-xl p-10 sm:w-[70%] bg-white">
	<div className="text-left flex items-center mt-20 mb-5">
				<img
					className="w-10 cursor-pointer "
					src={IArrowBack}
					alt="avater"
					onClick={(_) => navigate(-1)}
				/>
				<h3 className="ml-2 text-[600] text-[24px] text-[#1F1F1F]">
					Product History
				</h3>
			</div>
			<span
			style={getByStatusText(state.status)}
				className="text-2xl"
			> {state.status}</span>
			<div className="flex flex-row flex-wrap">
				<div className="flex flex-col text-[400] sm:mr-20 mb-5 lg:mb-0 text-[18px] text-[#212529">
					<span className="mt-5 ">
						Order ID:{" "}
						<span
							className="
          text-[#666666]">
							{state?.orderId}
						</span>
					</span>
					<span className="my-4 mb-2">
						Ordered on {dayjs(state?.createdAt).format("DD MMM, YYYY")}
					</span>
					<span className="">{state?.user?.name}</span>
					<span className="">
						{state?.user?.phone}
					</span>
				</div>
				<CardComp
					style={{
						maxWidth: "488px",
						width: "100%",
						background: "#FFFFFF",
						position: "relative",
						height: "100%",
						boxShadow: "none",
						marginBottom: "40px",
						borderRadius: "0px",
					}}
					className="flex flex-col mr-10">
					<div>
						<h5 className="text-xl text-[400]  ml-7 mb-3 text-[#0A2429]">
							{state?.products?.length} {state?.products?.length > 1 ? "Products" : "Product"}
						</h5>
						{state?.products.map((data) => {
							return (
								<div key={data.id}>
									<hr />
									<CardComp
										style={{
											width: "100%",
											boxShadow: "none",
											borderRadius: "0px",
										}}
										className="flex flex-col">
										<div className="flex flex-row text-[#222222]">
											<img
												className="w-[75px] h-[75px] cursor-pointer"
												src={data?.product?.thumbnail}
												alt=""
											/>
											<div className="flex flex-col w-full">
												<span className="text-[18px] ml-3 text-[500] mt-2 ">
													{data?.product?.name}
												</span>
												<div className="flex mx-3 justify-betwee flex-wrap w-full">
													<span className="text-[18px] text-[500] mr-6">
														{" "}
														{data?.quantity}{" "}
														{data?.quantity > 1 ? "items" : "item"}
													</span>
													<span className="text-[18px] text-[500]">
														₦{getAmount(data?.quantity * data?.product?.price)}
													</span>
												</div>
											</div>
										</div>

										<div className="flex flex-row mt-2 mb-2 text-[16px] text-[400]">
											<p className=" text-[#677489] ">Product Category:</p>
											<span className="text-[#111729] ml-2 ">
												{data?.product?.category?.name}
											</span>
										</div>
										{/* <div className="flex flex-row mb- text-[16px] text-[400]">
											<p className=" text-[#677489] ">Product Type:</p>
											<span className="text-[#111729] ml-2  ">
												{data?.product?.productType}
											</span>
										</div> */}
									</CardComp>
								</div>
							);
						})}
					</div>

					<hr />
					<div className="flex flex-row justify-between mt-5 mb-1 text-[16px] text-[400]">
						<p className=" text-[#677489] ">Subtotal</p>
						<span className="text-[#111729] ml-2 ">
							₦{getAmount(state?.totalCost)}
						</span>
					</div>
					<div className="flex flex-row justify-between mb-5 text-[16px] text-[400]">
						<p className=" text-[#677489] ">Shipping</p>
						<span className="text-[#111729] ml-2  ">₦0,00</span>
					</div>
					<hr />
					<div className="flex flex-row mt-5 justify-between text-[18px] text-[500] text-[#212529]">
						<p>Total</p>
						<span className=" ml-2">₦{getAmount(state?.totalCost)}</span>
					</div>
				</CardComp>
			</div>
	</div>
</div>
		</>
	);
};

export default ProductHistory;
