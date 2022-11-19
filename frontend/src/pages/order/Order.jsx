import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Header from "../../components/PageNavbar";
import CardComp from "../../components/Card/Card";
// import Iproduct from "../../assets/images/prodDetails.svg";
import Button from "../../components/form/button/Button";
// import OrderAction from "../../actions/order";
import Storage from "../../utils/storage";
import { getByStatusText } from "../../utils/color";
import { getAmount } from "../../utils/helpers";
// import Loader from "../../components/Loader/Loader";
import { useOrderContext } from "../../contexts/order";
// import PaginatedItems from "../../components/table/Pagination";

const SearchBoxDiv = styled.div`
		border: 1px solid #a5adba;
	`,
	SearchBox = styled.input`
		color: #030d25;
	`,
	ProductImage = styled.div`
		width: 100px;
		height: 100px;
		object-fit: cover;
		background: grey;

	`;

const OrderPage = () => {
	const navigate = useNavigate();
	const { loading, fetchOrders, orders } = useOrderContext();

	useEffect(() => {
		fetchOrders();
	}, []);

	return (
		<div className="">
			<Header
				{...{
					hideSearch: true,
				}}
			/>

<div className="container mt-10 py-10 shadow-2xl sm:pl-20 sm:flex-row flex-col">
			<div className="text-left flex items-center mt-8 mb-5">
				{/* <img
          className="w-[3%] h-[3%] cursor-pointer"
          src={ArrowLeft}
          alt="avater"
          onClick={(_) => navigate(-1)}
        /> */}
				<h3 className=" text-[600] text-[24px] text-[#1F1F1F]">
					Product Order
				</h3>
			</div>

			{loading ? (
				<div className="flex justify-center mt-16">
					<h1>Loading...</h1>
				</div>
			) : (
				orders.length >
				0 ? (
					<div className="flex flex-wrap gap-4 mb-16">
						{orders.map((data) => {
							return (
								<CardComp
									key={data.id}
									style={{
										width: "445px",
										height: "148px",
										border: "1px solid rgba(43, 97, 18, 0.4)",
										display: "flex",
										flexDirection: "row",
										maxWidth: "100%",
									}}>
									<ProductImage className="rounded-full"/>
									<div className="flex flex-col ml-5">
										<h3 className="text-[600] text-[18px] text-[#1F1F1F]">
											Order #{data.orderId}
										</h3>
										<div className="flex flex-row justify-between mt-3 mb-1 text-[#222222]">
											<span className="text-[14px] text-[500] text-[#868E96]  ">
												{data.itemCount}{" "}
												{data.itemCount > 1 ? "Products" : "Product"}
											</span>
											<span className="text-[15px] text-[600]  ml-3">
												₦{getAmount(data.totalCost)}
											</span>
										</div>
										<div className="flex flex-row justify-between mt-2">
											<div className="flex justify-between w-full">
												<Button
													btnClass={"pr-0 text-2xl"}
													width={"117px"}
													variant="primary"
													wrapperClass={"mr-5  h-[29px] text-2xl"}
													value={"View History"}
													onClick={() => navigate("/history", {state: data})}
												/>
												<div
													className="px-3 py-1 rounded text-2xl"
													style={{
														...getByStatusText(data.status.toLowerCase()),
													}}>
													{data.status}
												</div>
											</div>
										</div>
									</div>
								</CardComp>
							);
						})}
					
					</div>
				) 	: <h1 className="text-center">No order at the moment</h1>
			)}
      </div>
		</div>
	);
};

export default OrderPage;
