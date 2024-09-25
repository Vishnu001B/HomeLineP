import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Wallet = () => {
  const userProfile = useSelector((store) => store.userProfile);

  return (
    <div className="w-full flex flex-col gap-4 p-4 mt-2">
      <div>
        {userProfile ? (
          <p className="text-sm text-gray-600 text-center">
            <span className="font-semibold text-gray-700">Wallet:</span> ₹
            {userProfile.wallet}
          </p>
        ) : (
          <p className="text-sm text-gray-600 text-center">Loading wallet information...</p>
        )}
        <div className="flex justify-center items-center w-full">
          <Link
            to={"/addressForm"}
            className="flex gap-2 items-center my-4 w-32 justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600"
          >
            Add Money
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
