import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to install axios if not already installed

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const URI = import.meta.env.VITE_API_URL;

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      // User is already logged in, redirect to the dashboard or another page
      navigate("/dashboard");
    }

  },[])

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${URI}api/admin/login`, { email, password });
      
      // Handle successful login
      console.log("Login successful:", response.data);
      
      // Save token and user data in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect to the dashboard or another page after successful login
      navigate("/dashboard");
    } catch (err) {
      setError(err.response ? err.response.data : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <form onSubmit={handleLogin} className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            {error && <div className="text-red-500 text-sm">{error}</div>}
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://cdn.pixabay.com/photo/2017/06/29/07/32/furniture-2453307_1280.jpg"
          alt="Image"
          
          className=" h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
