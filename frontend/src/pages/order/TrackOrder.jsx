import React from "react";
import HomeLayout from "../../layout/Home";
import Header from "../../components/others/Header";
import { FiSearch } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ArrowLeft from "../../assets/images/ArrowLeft.svg";
import OrderAction from "../../actions/order";
import { OrderProgressStatus, OrderStatuses } from "../../utils/helpers";
import { IOrderNext, IOrderPending, IOrderSuccess } from "../../utils/icons";

const SearchBoxDiv = styled.div`
    border: 1px solid #a5adba;
  `,
  SearchBox = styled.input`
    color: #030d25;
  `;

const TrackOrder = () => {
  const navigate = useNavigate();
  const {state} = useLocation()

	const [order, setOrder] = React.useState({});

  React.useEffect(()=> {
    setOrder(state)
  }, [state])

	const [orderProgress, setOrderProgress] = React.useState({})
  
	function getOrderProgress (){
		OrderAction.getOrderProgress(state?.id).then(data => {
			const { order, ...rest} = data;
			setOrderProgress(rest)
		})
	}

	React.useEffect(()=>{
		getOrderProgress()
	}, [])

  return (
    <div>
      <HomeLayout>
        <Header
          {...{
            title: "History",
            // subtitle: "Manage account settings",
          }}
        />
        <div className="pr-7 py-5 flex justify-between items-center">
          <SearchBoxDiv
            className="w-1/2 h-10 mt-1 px-5 bg-[#F9F9F9] shadow  rounded-lg flex justify-between items-center"
            // onChange={({ target: { value } }) => {
            //   setPagination((state) => ({ ...state, search: value }));
            // }}
          >
            <label htmlFor="search" className="cursor-pointer">
              <FiSearch size={"24px"} className="mr-2" />
            </label>
            <SearchBox
              id="search"
              className="w-full h-full"
              placeholder="Search by Order..."
            />
          </SearchBoxDiv>
        </div>
        <div className="text-left flex items-center mt-8 mb-15">
          <img
            className="w-[3%] h-[3%] cursor-pointer "
            src={ArrowLeft}
            alt="avater"
            onClick={(_) => navigate(-1)}
          />
          <h3 className="ml-2 text-[600] text-[24px] text-[#1F1F1F]">
            Track Order
          </h3>
          </div>

          <div className="my-10">
					<div className="flex justify-between items-center">
						<h1 className="text-black font-bold"> Track Order </h1>
					</div>

					<div className="flex relative mt-5">
						<div
							className="border  h-[300px]  ml-3"
							style={{ borderColor: "rgba(43, 97, 18, 0.2)" }}></div>
						<div>
							<div className="relative mt-">
								<span
									className="absolute border rounded-full bg-transparent w-5 h-5"
									style={{
										marginLeft: "-11px",
										borderColor:
											order.orderStatus === OrderStatuses.canceled
												? "var(--C_danger)"
												: "var(--C_primary)",
												background: order.orderStatus === OrderStatuses.canceled?"var(--C_danger)": "white",
										left: "0",
									}}>
									{" "}
									{orderProgress.orderDelivered === OrderProgressStatus.COMPLETED && (
										<img
											src={IOrderSuccess}
											className="absolute px-[2px]  rounded-full bg-[#F9F9F9] w-4 h-4"
											style={{ marginTop: "1px", marginLeft: "1px" }}
											alt=""
										/>
									)}
								</span>
								<h2
									className="text-lg ml-5"
									style={{ color: "var(--C_primary)" }}>
									Order Progress Update
								</h2>
							</div>

							<div className="relative mt-5 ml-1">
								<img
									src={
										orderProgress.orderPlaced === OrderProgressStatus.COMPLETED
											? IOrderSuccess
											: order.orderStatus !== OrderStatuses.canceled
											? IOrderNext
											: IOrderPending
									}
									className={`absolute mt-1 rounded  bg-[#F9F9F9] ${
										orderProgress.orderPlaced !== OrderProgressStatus.COMPLETED ? "w-2" : "w-3"
									} h-5`}
									style={{
										marginLeft:
										orderProgress.orderPlaced === OrderProgressStatus.COMPLETED
												? "-11px"
												: "-9px",
									}}
									alt=""
								/>
								<h2
									className="text-md ml-5"
									style={{ color: "var(--C_primary)" }}>
									Order Placed
								</h2>
								<small className="ml-5 text-gray-600">
									Order received by Admin.
								</small>
							</div>

							<div className="relative mt-5 ml-1">
								<img
									src={
										orderProgress.orderProcessed === OrderProgressStatus.COMPLETED
											? IOrderSuccess
											:  orderProgress.orderProcessed === OrderProgressStatus.IN_PROGRESS
											? IOrderNext
											: IOrderPending
									}
									className={`absolute mt-1 rounded  bg-[#F9F9F9] ${
										orderProgress.orderProcessed !== OrderProgressStatus.COMPLETED
											? "w-2"
											: "w-3"
									} h-5`}
									style={{
										marginLeft:
										orderProgress.orderProcessed === OrderProgressStatus.COMPLETED
												? "-11px"
												: "-9px",
									}}
									alt=""
								/>
								<h2
									className="text-md ml-5"
									style={{ color: "var(--C_primary)" }}>
									Order Processed
								</h2>
								<small className="ml-5 text-gray-600">
									Order has been processed by Admin.
								</small>
							</div>

							<div className="relative mt-5 ml-1">
								<img
									src={
										orderProgress.outForDelivery === OrderProgressStatus.COMPLETED
											? IOrderSuccess
											: orderProgress.outForDelivery === OrderProgressStatus.IN_PROGRESS
											? IOrderNext
											: IOrderPending
									}
									className={`absolute mt-1 rounded  bg-[#F9F9F9] ${
										orderProgress.outForDelivery !== OrderProgressStatus.COMPLETED
											? "w-2"
											: "w-3"
									} h-5`}
									style={{
										marginLeft:
											orderProgress.outForDelivery === OrderProgressStatus.COMPLETED
												? "-11px"
												: "-9px",
									}}
									alt=""
								/>
								<h2
									className="text-md ml-5"
									style={{ color: "var(--C_primary)" }}>
									Out For Delivery
								</h2>
								<small className="ml-5 text-gray-600">
								Order if it has physical items will be delivered by {orderProgress?.courierCompany?.name || "courier"}.
								</small>
							</div>

							<div className="relative mt-5 ml-1">
								<img
									src={
										orderProgress.orderDelivered === OrderProgressStatus.COMPLETED
											? IOrderSuccess
											: orderProgress.orderDelivered === OrderProgressStatus.IN_PROGRESS
											? IOrderNext
											: IOrderPending
									}
									className={`absolute mt-1 rounded  bg-[#F9F9F9] ${
										orderProgress.orderDelivered !== OrderProgressStatus.COMPLETED
											? "w-2"
											: "w-3"
									} h-5`}
									style={{
										marginLeft:
										orderProgress.orderDelivered === OrderProgressStatus.COMPLETED
												? "-11px"
												: "-9px",
									}}
									alt=""
								/>
								<h2
									className="text-md ml-5"
									style={{ color: "var(--C_primary)" }}>
									Order Delivered
								</h2>
								<small className="ml-5 text-gray-600">
								Order delivered to your address or branch.

								</small>
							</div>
						</div>
					</div>
				</div>
        {/* </div> */}
      </HomeLayout>
    </div>
  );
};

export default TrackOrder;
