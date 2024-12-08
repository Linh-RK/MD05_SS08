import { Button } from "antd";
import useSelection from "antd/es/table/hooks/useSelection";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Random() {
  const { random } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleRandom = () => {
    const randomNumber = Math.ceil(Math.random() * 100);
    dispatch({
      type: "random",
      payload: randomNumber,
    });
  };
  return (
    <div>
      <h3>Random: {JSON.stringify(random)}</h3>
      {/* <h3>Random: {random.randomNumber.payload}</h3> */}
      <Button onClick={handleRandom}>Increment</Button>
    </div>
  );
}
