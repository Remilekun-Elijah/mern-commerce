import React from "react";

const CreateOrderForm = () => {
  return (
    <div>
      <h2> Orders </h2>
      <form>
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          // value={quantity}
          required
          // onChange={(e) => setQuantity(e.target.value)}
        />
        <label htmlFor="product">Product</label>
        <input
          type="text"
          id="product"
          name="product"
          // value={product}
          required
          // onChange={(e) => setProduct(e.target.value)}
        />
        <label htmlFor="fee">ShippingFee</label>
        <input
          type="text"
          name="fee"
          id="fee"
          // value={fee}
          required
          // onChange={(e) => setFee(e.target.value)}
        />
        <label htmlFor="subtotal">Subtotal</label>
        <input
          type="text"
          name="subtotal"
          id="subtotal"
          required
          // value={subtotal}
          // onChange={(e) => setSubtotal(e.target.value)}
        />
        <label htmlFor="total">Total</label>
        <input
          type="text"
          name="total"
          id="total"
          required
          // value={total}
          // onChange={(e) => setTotal(e.target.value)}
        />
        <label htmlFor="orderItems">OrderItems</label>
        <input
          type="text"
          name="orderItems"
          id="orderItems"
          required
          // value={orderItems}
          // onChange={(e) => setOrderItems(e.target.value)}
        />
        <label htmlFor="statusVal">Status</label>
        <input
          type="text"
          name="statusVal"
          id="statusVal"
          required
          // value={statusVal}
          // onChange={(e) => setStatus(e.target.value)}
        />
        <label htmlFor="user">User</label>
        <input
          type="text"
          name="user"
          id="user"
          required
          // value={user}
          // onChange={(e) => setUser(e.target.value)}
        />
        <label htmlFor="clientSecret">ClientSecret</label>
        <input
          type="text"
          name="clientSecret"
          id="clientSecret"
          required
          // value={clientSecret}
          // onChange={(e) => setClientSecret(e.target.value)}
        />
        <label htmlFor="payment">PaymentIntentId</label>
        <input
          type="text"
          name="payment"
          id="payment"
          required
          // value={payment}
          // onChange={(e) => setPaymentIntentId(e.target.value)}
        />
        <br />
        <input type="file" name="images" />

        <button className="signUpBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateOrderForm;
