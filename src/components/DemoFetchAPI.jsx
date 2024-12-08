import React, { useEffect, useState } from "react";

export default function DemoFetchAPI() {
  const [users, setUsers] = useState([]);
  const fetchUsers = () => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error))
      .finally(() => console.log("Hoan thanh"));
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div>
        {users.map((user, index) => {
          return (
            <>
              <div>Id:{index + 1}</div>
              <div>Name:{user.userName}</div>
              <div>Birth:{user.dateOfBirth}</div>
              <div>Email:{user.email}</div>
            </>
          );
        })}
      </div>
    </>
  );
}
