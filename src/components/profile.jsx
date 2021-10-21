import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/user_context";
import { getUserById, getOrdersByUserId } from "../helpers/db";
import OrdersTable from "./profile/orders_table";
import Loading from "./common/loading";

export default function Checkout() {
  const userId = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getInfoFromDb() {
      const userDb = await getUserById(userId);
      setUser(userDb);

      const ordersDb = await getOrdersByUserId(userId);
      setOrders(ordersDb);
    }

    getInfoFromDb();
  }, []);

  const dispOrders =
    orders.length > 0 ? (
      <>
        <p className="font-light mb-4">Your previous orders:</p>
        <OrdersTable orders={orders} />
      </>
    ) : (
      <p className="font-light mb-4">You don&apos;t have any orders.</p>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-light flex flex-col items-center pb-8 text-gray-primary">
      <div className="self-stretch border-b border-gray-light relative mb-10">
        <img
          src="/images/general/profile-hat.jpg"
          alt="Man with a cowboy hat playing guitar"
          className="w-full h-48 object-cover"
        />
        <div className="absolute bg-white bg-opacity-50 top-1/4 w-full py-4">
          <h1 className="text-xl text-center font-light text-black">Your profile</h1>
        </div>
      </div>
      <h2 className="text-2xl mb-4">Profile information and past orders</h2>
      <div>
        {user ? (
          <>
            <p className="font-light mb-2">
              Your email address: <span className="font-bold text-sm">{user.emailAddress}</span>
            </p>
            {dispOrders}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
