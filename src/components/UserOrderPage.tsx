import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "./services/AlertService";

const UserOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [disable, setDisable] = useState(true);

  const [paymentId, setPaymentId] = useState("");
  const [address, setAdress] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [csv, setCsv] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      console.log(token);

      const response = await axios.get(
        "https://dev-stack-backend.onrender.com/api/v1/cart/getCartItemsUserId",
        { headers }
      );

      setCartItems(response.data.data.cartItems);
      calculateTotalPrice(response.data.data.cartItems);
      setAdress(response.data.data.cartItems[0].userid.address);

      //alert(response.data.data.cartItems[0].userid.address);
    } catch (error) {
      showErrorToast("Error fetching cart items:");
      console.error("Error fetching cart items:", error);
    }
  };

  const calculateTotalPrice = (items: any[]) => {
    let total = 0;
    items.forEach((item) => {
      total += item.quantity * item.productid.productprice;
    });
    setTotalPrice(total);
  };

  const handlePaymentChange = (paymentType: string) => {
    setShowCreditCard(paymentType === "creditCard");
    setShowPayPal(paymentType === "paypal");
  };

  const today = new Date();
  const formattedDate = today.toISOString();

  const handlePayment = async (e: any) => {
    e.preventDefault();

    if (!validateCreditCard()) {
      showErrorToast("Invalid credit card details. Please check your inputs.");
      return;
    }

    try {
      const paymentData = {
        paymentMethod: "Credit Card",
        transactionDetails: {
          creditCardNumber: cardNumber,
          csv: csv,
          amount: totalPrice,
        },
        paymentDate: formattedDate,
        status: "Completed",
      };
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        "https://dev-stack-backend.onrender.com/api/v1/payment/createPayment",
        paymentData,
        {
          headers,
        }
      );

      console.log(response);

      if (response.status === 201) {
        showSuccessToast("payment Add Successfully");

        setPaymentId(response.data.data._id);
        setDisable(false);
      }
    } catch (error) {
      showErrorToast("Error payment");
      console.error("Error payment:", error);
    }

    //  console.log("Transaction Details:", transactionDetails);
  };

  const handlePlaceOrder = async (e: any) => {
    e.preventDefault();

    // alert("Payment button");

    try {
      const orderData = {
        products: [cartItems],
        paymentid: paymentId, // Replace with a valid payment ID
        deliveryaddress: address,
        orderdate: formattedDate, // Replace with the desired order date
        orderstatus: "Pending", // Replace with the initial order status
      };

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        "https://dev-stack-backend.onrender.com/api/v1/order/createOrder",
        orderData,
        {
          headers,
        }
      );

      //console.log(response);

      if (response.status === 201) {
        showSuccessToast("Order Add Successfully Please Check Your Email");

        setTimeout(() => {
          navigate("/userProducts");
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      showErrorToast("Error payment:");
      console.error("Error payment:", error);
    }
  };

  const validateCreditCard = () => {
    // Basic credit card validation (you might want to use a library for thorough validation)
    const cardNumberRegex = /^\d{16}$/; // Example regex for a 16-digit credit card number
    const csvRegex = /^\d{3}$/; // Example regex for a 3-digit CSV

    return cardNumberRegex.test(cardNumber) && csvRegex.test(csv);
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Payment</h1>
          <div className="flex flex-wrap">
            <div className="w-full md:w-8/12 pr-4">
              <div className="border-b mb-3">
                <h2 className="text-lg px-4 py-3 flex justify-between items-center">
                  <div
                    className="w-full flex items-center cursor-pointer"
                    onClick={() => handlePaymentChange("creditCard")}
                  >
                    <input
                      className="form-radio"
                      type="radio"
                      name="payment"
                      id="payment1"
                      checked={showCreditCard}
                      onChange={() => {}}
                    />
                    <label className="ml-2">Credit Card</label>
                  </div>
                  <span>
                    <svg
                      width="34"
                      height="25"
                      xmlns="http://www.w3.org/2000/svg"
                    ></svg>
                  </span>
                </h2>
                {showCreditCard && (
                  <div id="collapseCC" className="p-4">
                    {/* Credit Card Form */}
                    <div className="mb-3">
                      <label className="block mb-1">Card Number</label>
                      <input
                        type="text"
                        className="w-full border rounded py-2 px-3"
                        placeholder=""
                        name="creditCardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="block mb-1">CSV</label>
                        <input
                          type="text"
                          className="w-full border rounded py-2 px-3"
                          placeholder=""
                          name="csv"
                          value={csv}
                          onChange={(e) => setCsv(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="block mb-1">Price</label>
                        <input
                          type="text"
                          className="w-full border rounded py-2 px-3"
                          placeholder=""
                          name="amount"
                          value={totalPrice}
                          disabled
                        />
                      </div>
                    </div>

                    {/* Pay and Cancel buttons */}
                    <div className="flex justify-end mt-4">
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                        onClick={handlePayment} // Use onClick event instead of onChange
                      >
                        Pay
                      </button>
                      <button className="bg-red-500 text-white py-2 px-4 rounded">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-b mb-3">
                <h2 className="text-lg px-4 py-3 flex justify-between items-center">
                  <div
                    className="w-full flex items-center cursor-pointer"
                    onClick={() => handlePaymentChange("paypal")}
                  >
                    <input
                      className="form-radio"
                      type="radio"
                      name="payment"
                      id="payment2"
                      checked={showPayPal}
                      onChange={() => {}}
                    />
                    <label className="ml-2">PayPal</label>
                  </div>
                  <span>
                    <svg
                      width="103"
                      height="25"
                      xmlns="http://www.w3.org/2000/svg"
                    ></svg>
                  </span>
                </h2>
                {showPayPal && (
                  <div id="collapsePP" className="p-4">
                    {/* PayPal Form */}
                    <div className="mb-3">
                      <label className="block mb-1">Email address</label>
                      <input
                        type="email"
                        className="w-full border rounded py-2 px-3"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full md:w-4/12">
              <div className="sticky top-0">
                <div className="p-4 bg-white shadow">
                  <h6 className="text-lg mb-4 font-bold">Order Summary</h6>
                  <p>Please do payment before place Order</p>
                  <div className="p-4 bg-white shadow">
                    {paymentId ? (
                      <h6 className="text-lg mb-4 font-bold">
                        Payment success. Please place order.
                      </h6>
                    ) : (
                      <h6 className="text-lg mb-4 font-bold">Do Payment</h6>
                    )}
                    <div className="mb-4">
                      <p>Payment ID: {paymentId}</p>
                      <p>Total Price: ${totalPrice}</p>
                      <p>Order Date: {formattedDate}</p>
                      <p>Order Address:</p>
                      <input
                        type="text"
                        className="w-full border rounded py-2 px-3"
                        placeholder="Enter Your Delivery Address"
                        name="csv"
                        value={address}
                        onChange={(e) => setAdress(e.target.value)}
                      />
                      <p>Order Status: Pending</p>
                    </div>
                    {/* Checkboxes and Place Order button */}
                  </div>
                  <hr className="my-4" />
                  <div className="mb-4">
                    <input
                      className="form-checkbox"
                      type="checkbox"
                      value=""
                      id="tnc"
                    />
                    <label className="ml-2">
                      I agree to the{" "}
                      <a href="#/" className="text-blue-500">
                        terms and conditions
                      </a>
                    </label>
                  </div>
                  <div className="mb-4">
                    <input
                      className="form-checkbox"
                      type="checkbox"
                      value=""
                      id="subscribe"
                    />
                    <label className="ml-2">
                      Get emails about product updates and events. If you change
                      your mind, you can unsubscribe at any time.{" "}
                      <a href="#/" className="text-blue-500">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 w-full rounded"
                    onClick={handlePlaceOrder}
                    disabled={disable}
                  >
                    Place order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserOrderPage;
