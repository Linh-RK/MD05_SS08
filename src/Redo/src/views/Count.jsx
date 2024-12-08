import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Count() {
  const result = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch({
      type: "increment",
    });
  };

  const handleDecrement = () => {
    dispatch({
      type: "decrement",
    });
  };
  return (
    <>
      <h3>Count: {result.count}</h3>
      <Button onClick={handleIncrement}>Increment</Button>
      <Button onClick={handleDecrement}>Decrement</Button>
    </>
  );
}

// import React from "react";
// import { useSelector } from "react-redux";

// export default function Count() {
//   const result = useSelector((state) => state);
//   console.log(result);
//   return <div>Count</div>;
// }
