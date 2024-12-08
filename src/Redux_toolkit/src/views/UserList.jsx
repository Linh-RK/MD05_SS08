import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser } from "../redux/slices/userSlice";

export default function UserList() {
  const { status, data, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUser());
  }, []);
  return (
    <>
      <div>{status === "pending" && <div>Loading...</div>}</div>
      <div>UserList</div>
      <div>{result}</div>
    </>
  );
}
