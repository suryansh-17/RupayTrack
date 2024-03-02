import React, { useCallback, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "./index";
import service from "../appwrite/services";
import { ID as transactionId } from "appwrite";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddTransaction({ transaction }) {
  const [userBalance, setUserBalance] = useState();
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    service.getUserData(userData.$id).then((doc) => {
      setUserBalance(Number(doc.balance));
    });
  });

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        amount: transaction?.amount || "",
        date: transaction?.date || "",
        description: transaction?.description || "",
      },
    });

  const navigate = useNavigate();

  const submit = async (data) => {
    if (transaction) {
      console.log(transaction);
      const dbTransaction = await service.updateTransaction(
        transaction.transactionId,
        {
          ...data,
        }
      );
      const newBalance = Number(userBalance) + Number(data.amount);
      setUserBalance(newBalance);
    } else {
      const dbPost = await service.createTransaction({
        transactionId: transactionId.unique(),
        ...data,
        userId: userData.$id,
      });
      const newBalance = Number(userBalance) + Number(data.amount);

      const updateBalance = await service.updateBalance({
        userId: userData.$id,
        balance: newBalance,
      });

      setUserBalance(newBalance);
    }
  };
  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div>
          <Input
            label="amount"
            placeholder="amount"
            className="mb-4"
            {...register("amount", { required: true })}
          />

          <Input
            label="description"
            placeholder="description"
            className="mb-4"
            {...register("description", { required: true })}
          />

          <Button
            type="submit"
            bgColor={transaction ? "bg-green-500" : undefined}
            className="w-full"
          >
            {transaction ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddTransaction;
