import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddTransaction } from "../components";
import service from "../appwrite/services";

function Home() {
  const userData = useSelector((state) => state.auth.userData);
  const [userBalance, setUserBalance] = useState();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    service.getUserData(userData.$id).then((data) => {
      setUserBalance(data.balance);
      setTransactions(data.transaction);
    });
  });

  return (
    <>
      <div>welcome {userData?.name}</div>

      <div className="grid grid-cols-5 grid-rows-5 gap-4 ">
        <div className="m-auto">Last Updated :DATE:</div>
        <div className="col-span-2 m-auto">Current Balance {userBalance}</div>
        <div className="col-span-2 row-span-4 row-start-2 m-auto">
          {transactions.map((trans) => (
            <div key={trans.$id}>
              <p>{trans.amount}</p>
              <p>{trans.description}</p>
              {trans.$createdAt}
            </div>
          ))}
        </div>
        <div className="row-span-2 col-start-3 row-start-2 m-auto">
          <AddTransaction />
        </div>
        <div className="row-span-2 col-start-3 row-start-4 m-auto">6</div>
      </div>
    </>
  );
}

export default Home;
