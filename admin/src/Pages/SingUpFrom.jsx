import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const navagite = useNavigate()

  const URI = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const response = await axios.post(`${URI}api/admin/register`, { email, password });

      if (response.status === 200) {
        MySwal.fire({
          title: 'Registration Successful!',
          text: 'An OTP has been sent to your email. Please enter it below to verify your account.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        setIsRegistered(true);
      }
    } catch (error) {
      setError(error.response ? error.response.data : 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const response = await axios.post(`${URI}api/admin/verify-otp`, { email, otp });

      if (response.status === 200) {
        MySwal.fire({
          title: 'OTP Verified!',
          text: 'Your account is now active.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        setEmail('');
        setPassword('');
        setOtp('');
        setIsRegistered(false);
        navagite("/login")
        // Redirect or perform other actions as needed
      }
    } catch (error) {
      setError(error.response ? error.response.data : 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <img
          src="https://as2.ftcdn.net/v2/jpg/08/73/92/49/1000_F_873924964_pO1myZUhIe7GPkBH3ml2CEc1QyB0hmbZ.jpg"
          alt="Image"
          className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{isRegistered ? 'Enter OTP' : 'Sign Up'}</h1>
            <p className="text-balance text-muted-foreground">
              {isRegistered
                ? 'Please enter the OTP sent to your email.'
                : 'Enter your email below to sign up for an account.'}
            </p>
          </div>
          {!isRegistered ? (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Sign Up'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Submit OTP'}
              </Button>
            </form>
          )}
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
