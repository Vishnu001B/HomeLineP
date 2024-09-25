import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  BarChart,
  Edit,
  Package2,
  LineChart,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Search } from "lucide-react";

const Header = () => {
  const [showManageProductOptions, setShowManageProductOptions] =
    useState(false);
  const [showReportOptions, setShowReportOptions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleOptions = () =>
    setShowManageProductOptions(!showManageProductOptions);
  const toggleReportOptions = () => setShowReportOptions(!showReportOptions);

  // Handle Logout Function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  // Generate breadcrumb items based on the current location
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    return (
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <React.Fragment key={to}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={to}>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    );
  };

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <Package2 className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            {/* Navbar Menu */}
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="/dashboard"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Home className="h-5 w-5" /> Dashboard
              </Link>
              <Link
                to="/orders"
                className="flex items-center gap-4 px-2.5 text-foreground"
              >
                <ShoppingCart className="h-5 w-5" /> Orders
              </Link>

              {/* Manage Product Options */}
              <div>
                <button
                  onClick={toggleOptions}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground focus:outline-none"
                >
                  <Package className="h-5 w-5" /> Manage Product
                </button>
                {showManageProductOptions && (
                  <div className="ml-8 mt-2 space-y-2">
                    <Link
                      to="/manage-navbar"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Users className="h-5 w-5" /> Manage Navbar
                    </Link>
                    <Link
                      to="/create-product"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Package className="h-5 w-5" /> Create Product
                    </Link>
                    <Link
                      to="/Mange-product"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Package className="h-5 w-5" /> Product
                    </Link>
                    <Link
                      to="/manage-category"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Edit className="h-5 w-5" /> Category
                    </Link>
                    <Link
                      to="/furniture"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Edit className="h-5 w-5" /> Furniture
                    </Link>
                    <Link
                      to="/manage-banner"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Edit className="h-5 w-5" /> Manage Banner
                    </Link>
                  </div>
                )}
              </div>

              {/* Report Options */}
              <div>
                <button
                  onClick={toggleReportOptions}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground focus:outline-none"
                >
                  <Package className="h-5 w-5" /> Report Management
                </button>
                {showReportOptions && (
                  <div className="ml-8 mt-2 space-y-2">
                    <Link
                      to="/order"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Users className="h-5 w-5" /> Order
                    </Link>
                    <Link
                      to="/order-book"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Package className="h-5 w-5" /> Book Order
                    </Link>
                    <Link
                      to="/manage-category"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Edit className="h-5 w-5" /> Enquiry
                    </Link>
                    <Link
                      to="/"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Edit className="h-5 w-5" /> Voucher
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/settings"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <BarChart className="h-5 w-5" /> Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Breadcrumbs for Desktop */}
        <Breadcrumb className="hidden md:flex">
          {generateBreadcrumbs()}
        </Breadcrumb>

        {/* Search Bar */}
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>

        {/* User Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <img
                src="/placeholder-user.jpg"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </div>
  );
};

export default Header;
