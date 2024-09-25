import React, { useEffect } from "react";
import { FaClipboardList } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { IoWallet } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";
import { CiLogin } from "react-icons/ci";
import { Link, useNavigate, useParams } from "react-router-dom";
import SaveAddress from "./SaveAddress";
import { useDispatch, useSelector } from "react-redux";
import MyAcount from "./MyAcount";
import Wallet from "./Wallet";
import OrderHistory from "./OrderHistory";
import { UserActions } from "../../store/userInfoSlice";

const UserProfile = () => {
  const { name } = useParams();
  const userProfile = useSelector((store) => store.userProfile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Effect to check if name parameter changes
  useEffect(() => {
    console.log("Current path:", name); // For debugging purposes
  }, [name]);

  // Render content based on the value of 'name' from the route
  const renderContent = () => {
    switch (name) {
      case 'MyAcount':
        return <MyAcount />;
      case 'MyOrder':
        return <OrderHistory />;
      case 'SaveAddress':
        return <SaveAddress />;
      case 'MyWishlist':
        return <Wallet />;
      default:
        return <h1 className="text-xl font-semibold">There is no data</h1>;
    }
  };

  // Logout function to clear user data
  const logout = () => {
    localStorage.clear();
    dispatch(UserActions.clearUser());
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex justify-center text-sm content-center lg:items-center md:items-center lg:px-32 px-5 w-full lg:pt-60 md:pt-32 pt-32 pb-10">
      <div className="bg-white shadow-md rounded lg:flex md:flex block justify-center lg:items-center content-center border-[1px] border-solid px-2 py-4 w-full">
        <div className="lg:w-1/5 md:w-1/5 lg:block md:block overflow-x-auto max-w-96 w-full">
          <ul className="w-full lg:block md:block flex justify-center content-center items-center">
            
            <Link
              to={`/user-Profile/MyOrder`}
              className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center cursor-pointer"
            >
              <FaClipboardList className="text-xl" />
              <p className="lg:block md:block hidden">My Orders</p>
            </Link>
            <Link
              to={`/user-Profile/SaveAddress`}
              className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center cursor-pointer"
            >
              <MdLocationOn className="text-2xl" />
              <p className="lg:block md:block hidden">Save Address</p>
            </Link>
            <Link
              to={`/user-Profile/MyWishlist`}
              className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center cursor-pointer"
            >
              <IoWallet className="text-xl" />
              <p className="lg:block md:block hidden">My Wishlist</p>
            </Link>
            <Link
              to={`/user-Profile/MyAcount`}
              className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center cursor-pointer"
            >
              <SiGnuprivacyguard className="text-xl" />
              <p className="lg:block md:block hidden">Account Privacy</p>
            </Link>
            <button
              className="px-4 py-2 lg:w-full md:w-full hover:bg-gray-200 mb-4 flex gap-2 content-center items-center cursor-pointer"
              onClick={logout}
            >
              <CiLogin className="text-xl" />
              <p className="lg:block md:block hidden">Logout</p>
            </button>
          </ul>
        </div>
        <div className="lg:w-9/12 md:w-9/12 flex justify-center text-sm w-full lg:h-auto md:h-auto h-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
