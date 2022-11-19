import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import {ICheckIcon, Ideliver, IArrowBack } from "../utils/mock";
import CardComp from "../components/Card/Card";
import Button from "../components/form/button/Button";
import { getAmount, paystack_secret } from "../utils/helpers";
// import OrderAction from "../../actions/order";
import Storage from "../utils/storage";
// import "./AddAddress.css";
import { PaystackButton } from "react-paystack";
import Alert from "../utils/alert";
import dayjs from "dayjs";
import { useCartContext } from "../contexts/cart_context";
import Navbar from "../components/PageNavbar";
import { useUserContext } from "../contexts/user_context";
import { useOrderContext } from "../contexts/order";

const ArrowLeft = IArrowBack;

const AddressBox = styled.input`
		color: #030d25;
		width: 100%;
		border-left: none;
		padding-left: 15px;
	`,
	AddressBoxDiv = styled.div`
		background-color: #d7fdc5;
		border-radius: 4px;
	`,
	ProductImage = styled.img`
		width: 100px;
		height: 100px;
		object-fit: cover;
	`;

const CheckOut = () => {
	const navigate = useNavigate();
	const { sumPrice, cart, setCart, getOrderPayload } = useCartContext()
	const { createOrder } = useOrderContext()
	const { myUser: user, setOpen } = useUserContext()

	

	const [addresses, setAddresses] = React.useState({
		all: [],
		current: {},
		choose: false,
		discountId: "",
		loading: false,
		checkedOut: false,
		discount: "",
		orders: [],
		order: {},
		selected: ''
	});


	const deps = React.useMemo(()=>{
		return {address: user?.addressOne || user?.addressTwo}
	}, [user?.addressOne || user?.addressTwo])

	let homeAddress = {
		id: user?.id,
		type: "Default Address",
		phoneNumber: user?.phone,
		email: user?.email,
		fullName: user?.name,
		address: user?.addressOne || user?.addressTwo,
	};
	console.log(homeAddress, user);
	React.useEffect(() => {


		setAddresses(state=>({...state, all: [...state.all, homeAddress], current: homeAddress}))

	}, []);


	function handleSubmit(e) {
		e.preventDefault();
		setAddresses((state) => ({ ...state, loading: true }));
	}

	const paymentMetadata = {
		email: addresses?.current?.email,
		amount: sumPrice("cart") + "00",
		metadata: {
			name: addresses?.current?.fullName,
			phone: addresses?.current?.phone,
		},
		className:
			"bg-[#45accb] text-2xl text-white py-3 lg:ml-5 ml-0 rounded-none w-full lg:w-[89%] rounded-lg leading-tight",
		publicKey: paystack_secret,
		text: "Pay Now",
		onSuccess: (e) => {
			if (e.message === "Approved") {
				Alert({ type: "info", message: "Verifying payment...", timer: 10000 });
				createOrder(getOrderPayload(e.reference)).then(({ success, data }) => {
					if (success) {
						Alert({
							type: "success",
							message: "Payment verified Successfully.",
						});
						setAddresses((state) => ({
							...state,
							checkedOut: true,
							order: data,
						}));
						setCart([])
						Storage.set("cart", JSON.stringify([]));
					}
				});
			}
		},
		onClose: () =>
			Alert({ type: "error", message: "Transaction was cancelled" }),
	};

	return (
		<div className="">
			<Navbar {...{hideSearch: true}} />
   <div className="pageHero">
          <h1 className="pageHero__text">Checkout</h1>
        </div>
			<div className="container mt-10 py-10 shadow-2xl lg:pl-20 lg:flex-row flex-col justify-center border-2">
			<div className="lg:pr-7 py-5">
				<div className="text-left flex items-center mb-5">
					<img
						className="lg:w-[35px] w-[27px] cursor-pointer"
						src={ArrowLeft}
						alt="avatar"
						onClick={(_) =>
							navigate(
								addresses.checkedOut ? "/" : -1,
							)
						}
					/>
					<h3 className="ml-3 text-[600] text-[24px] text-[#1F1F1F]">
						Shipping
					</h3>
				</div>
				<div className="flex lg:flex-row flex-col lg:items-start items-center">
					{/*  LEFT PANEL */}
					<div className="lg:w-[580px]  lg:order-0 order-1">
						{!addresses.current.address ? (
							<>
								<div className="lg:mt-0 mt-14">
									<span
										className="text-[#2B6112]  text-[500] text-[14px] text-right block cursor-pointer"
										onClick={() => setOpen(true)}>
										Add  address
									</span>
								</div>
								<AddressBoxDiv className="lg:w-[580px] w-full h-10 mt-1 px-  bg-white shadow pl-0 rounded-lg flex ustify-between items-cente">
									<div
										htmlFor="search"
										className=" mr-5 bg-gray-200 px-2 pt-2 cursor-pointer">
										<img src={Ideliver} alt="avatar" />
									</div>
									<AddressBox
										className="w-full h-full bg-white border-none"
										disabled
										placeholder="No shipping address found"
									/>
								</AddressBoxDiv>
							</>
						) : addresses.checkedOut === false ? (
							<div className="mt-1 rounded-lg  bg-white shadow flex gap-4  lg:w-[580px] h-[132px]">
								<div
									htmlFor="search"
									className=" w-[54px] h-[48px] pl-3 pt-2 rounded-r-lg cursor-pointer bg-[#D7FDC5] align-start">
									<img src={Ideliver} alt="avatar" />
								</div>
								<div className="mt-3 flex  w-full justify-between text-[#656667]">
									<div className="self-start">
										<span>
											Name:{" "}
											<span className="text-[#212529]">
												{addresses?.current?.fullName}
											</span>
										</span>
										<br />
										<span>
											Email:{" "}
											<span className="text-[#212529]">
												{addresses?.current?.email}
											</span>
										</span>
										<br />
										<span>
											Phone Number:{" "}
											<span className="text-[#212529]">
												{addresses?.current?.phoneNumber}
											</span>
										</span>
										<br />
										<span>
											Delivery Address:{" "}
											<span className="text-[#212529]">
												{addresses?.current?.address}
											</span>
										</span>
									</div>
								</div>
							</div>
						) : (
							<div className="w-full">
								<CardComp
									style={{
										width: "100%",
										boxShadow: "none",
										backgroundColor: "#EBF9E9",
										maxWidth: "100%"
									}}>
									<div className="flex ... items-center mb-5">
										<img className="mr-4" src={ICheckIcon} alt="avatar" />
										<div>
											<h1 className="text-xl">Thank you!</h1>
											<p>
												Your order #{addresses.order.orderId} has been
												placed.
											</p>
										</div>
									</div>
									<span>
										We sent an email to {addresses.current.email} with your
										order confirmation and bill.
									</span>
									<span className="block mt-2">
										Time placed:{" "}
										{dayjs(addresses.order.dateCreated).format("MMM DD, YYYY")}{" "}
										{dayjs(addresses.order.dateCreated).format("hh:mm")} WAT
									</span>
								</CardComp>
							</div>
						)}

						<div className="mt-5">
							<span className="text-[#212529] flex justify-start text-[500] text-[18px] mt-2">
								Payment{" "}
							</span>
						</div>
						<div className="fle items-cente mt-1">
							<CardComp
								style={{
									width: "100%",
									maxWidth: "580px",
									marginBottom: "40px",
									display: "flex",
									flexDirection: "row",
								}} className="shadow justify-center">
								<div className="w-full">
									{addresses.checkedOut === false && (
										<div className="flex lg:gap-4 gap-2 flex-wrap">
											<form
												onSubmit={handleSubmit}
												className="w-full m-w-[273px] h-[100%] px-2 pt-0 lg:mb-5 items-center border border-[#EEEFF0] rounded-lg">
												<span className="text-[#868E96] flex justify-start text-[500] text-[18px] mt-2">
													Discount Code
												</span>
												<div className="flex justify-between text-[500] text-[14px]">
													<input
														name="discountId"
														className="text-[#212529] w-[80%] p-1 focus:shadow border focus:border-transparent border-gray-300 rounded mb-1 cursor-pointer  outline-none"
														placeholder=""
													/>
												
														<button
															type="submit"
															className="text-[#2B6112] mb-1">
															Apply
														</button>
					
												</div>
											</form>

											<div className="flex flex-col mt- w-full m-w-[241px] h-[103px]  pt-7 px-2 bg-[#FAFAFA] lg:mb-0 mb-5">
												<span className="text-[500] text-[18px] text-[#212529] ">
													<strong>Pay Now</strong> with
												</span>
												<span className="text-[d00] text-[16px] text-[#868E96] ">
													Card, USSD or Bank Transfer
												</span>
											</div>
										</div>
									)}

									<div className="flex lg:flex-row flex-col items-end gap-4">
										<div className="w-full">
											<span className="text-[700] text-[18px] text-[#212529] mt-8">
												Order Summary
											</span>
											<div className="flex justify-between items-center mt-2 text-[400] text-[16px] text-[#212529]">
												<span className=" ">Subtotal</span>
												<span className=" ">
													₦{getAmount(sumPrice("cart"))}
												</span>
											</div>
											<div className="flex justify-between items-center mt-1 text-[400] text-[16px] text-[#212529]">
												<span className=" ">Shipping</span>
												<span className=" ">₦0,00</span>
											</div>
											<div className="flex justify-between items-center mt-1 mb-5 text-[400] text-[16px] text-[#212529]">
												<span className=" ">Discount</span>
												<span className=" ">₦0,00</span>
											</div>
											<hr />
											<div className="flex justify-between items-center mt-5 text-[600] text-[16px] text-[#212529]">
												<span className=" ">Total</span>
												<span className=" ">
													₦{getAmount(sumPrice("cart"))}
												</span>
											</div>
										</div>
										{!addresses?.checkedOut && (
											<div className="w-full">
												{!addresses?.current?.address || cart?.length === 0 ? (
													<Button
														value={"Pay Now"}
														variant={"primary"}
														disabled={true}
														btnClass={"pr-0"}
														wrapperClass={
															"mt- lg:ml-5 ml-0 rounded-none"
														}
													/>
												) : (
													<PaystackButton {...paymentMetadata} />
												)}
											</div>
										)}
									</div>
									{addresses.checkedOut && (
										<Button
											value={"Continue Shopping"}
											variant={"primary"}
											btnClass={"pr-0"}
											onClick={(_) =>
												navigate("/")
											}
											parentClass="w-full"
											wrapperClass={"mt-7 lg:ml-5 ml-0 rounded w-full lg:w-[89%]"}
										/>
									)}
								</div>
							</CardComp>
						</div>
						{!addresses.checkedOut && (
							<span className="text-[400] text-[16px] text-[#868E96] pb-8">
								This is the final step, after clicking{" "}
								<span className="font-bold">Pay Now</span> button, the payment
								will be transacted
							</span>
						)}
					</div>
					{/*  LEFT PANEL ENDS*/}

					{/*  RIGHT PANEL */}
					<div className="lg:ml-8 lg:w-[60%] lg:order-1">
						{/* SHOW ADDRESS AFTER CHECKOUT */}
						{addresses.checkedOut && (
							<div className="flex items-start rounded-lg mb-5 lg:w-[400px] bg-white shadow">
								<div className="px-3 pt-2 rounded-r-lg bg-[#D7FDC5] align-start">
									<img src={Ideliver} alt="avatar" />
								</div>
								<div className="inline-block ml-4 p-3">
									<span>
										Name:{" "}
										<span className="text-[#212529]">
											{addresses?.current?.fullName}
										</span>
									</span>
									<br />
									<span>
										Email:{" "}
										<span className="text-[#212529]">
											{addresses?.current?.email}
										</span>
									</span>
									<br />
									<span>
										Phone Number:{" "}
										<span className="text-[#212529]">
											{addresses?.current?.phoneNumber}
										</span>
									</span>
									<br />
									<span>
										Delivery Address:{" "}
										<span className="text-[#212529]">
											{addresses?.current?.address}
										</span>
									</span>
								</div>
							</div>
						)}

						<span className="text-[500] block text-[18px] text-[#495057]  mt-6">
							{/* TODO : Display Order items upon successful checkout*/}
							{/* {!addresses.checkedOut  ? cart.length +" items" : "Order Items"} */}
							{cart.length} {cart.length > 1 ? "Items" : "Item"}
						</span>
						{cart.map((product) => {
							return (
								<CardComp
									key={product.id}
									style={{
										width: "100%",
										maxWidth: "400px",
										height: "148px",
										display: "flex",
										flexDirection: "row",
										marginTop: "20px",
									}} className="shadow">
									<ProductImage src={product.image} alt={"img"} />
									<div className="flex flex-col ml-5">
										<h3 className="text-[600] text-[18px] text-[#1F1F1F]">
											{product.name}
										</h3>
										<div className="flex flex-row mt-3 mb-1 text-[#222222]">
											<span className="text-[14px] text-[500] text-[#868E96]  ">
												{product.amount}{" "}
												{product.amount > 1 ? "Products" : "Product"}
											</span>
											<span className="text-[15px] text-[600]  ml-3">
												₦{getAmount(product?.price * product?.amount)}
											</span>
										</div>
									</div>
								</CardComp>
							);
						})}
					</div>
					{/*  RIGHT PANEL ENDS*/}
				</div>
			</div>
		</div>
		</div>		
	);
};

export default CheckOut;
