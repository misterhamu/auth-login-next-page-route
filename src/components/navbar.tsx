import { useAuth } from "@/context/AuthContext";
import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  const { user, logout } = useAuth();
  if(!!user == false){
    return <></>
  }
  return (
    <>
      <div className="flex flex-row justify-between p-3 bg-red-300">
        <p>Test Login</p>
        {user && <p>{user}</p>}
        {!!user && (
          <button
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
}
