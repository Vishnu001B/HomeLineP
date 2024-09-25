import React from 'react';
import userProfilePic from '../../assets/myPic.avif';
import { useSelector} from 'react-redux';


const MyAccount = () => {
  const userProfile = useSelector((store) => store.user);
 
  if (!userProfile) {
    return <p>Loading user profile...</p>; // Add a loading state
  }

  return (
    <div className='flex justify-evenly content-center items-center gap-4'>
      <div>
        <img src={userProfilePic} alt="User Profile" className='w-40' />
      </div>
      <div>
        <h1 className='text-xl font-semibold'>My Account</h1>
        <p className='my-1'>Welcome, <br /> {userProfile.email || "John Doe"}</p>
        <p className='my-1'><span className='font-semibold text-gray-700'>Wallet:</span> ₹{userProfile.wallet || "0"}</p>
      </div>
      <div>
      </div>

      
    </div>
  );
}

export default MyAccount;
