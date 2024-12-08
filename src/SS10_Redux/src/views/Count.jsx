import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Count() {
  // Lay du lieu tu store
  const result = useSelector((state) => state.count);
  console.log("Result", result);
  const dispatch = useDispatch();
  //
  const handleIncrement = () => {
    // truyen tai thong tin tu UI sang store
    dispatch({
      type: "increment",
    });
    return;
  };
  const handleDecrement = () => {
    // truyen tai thong tin tu UI sang store
    dispatch({
      type: "decrement",
    });
    return;
  };
  return (
    <div>
      <h3>Count:{result}</h3>
      <Button onClick={handleIncrement}>Increment</Button>
      <Button onClick={handleDecrement}>Decrement</Button>
    </div>
  );
}
