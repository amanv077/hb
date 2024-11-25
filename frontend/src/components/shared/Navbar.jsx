import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { useState } from "react";
import logo from "@/assets/logo.jpg";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo */}
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="Hiring Booth Logo"
              className="h-10 cursor-pointer"
            />
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          {menuOpen ? (
            <X
              className="text-[#004aad] cursor-pointer"
              size={24}
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Menu
              className="text-[#004aad] cursor-pointer"
              size={24}
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-[#004aad] font-semibold">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-[#003b8d]">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/students" className="hover:text-[#003b8d]">
                    Students
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-[#003b8d]">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-[#003b8d]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/resumeBuilder" className="hover:text-[#003b8d]">
                    Resume Builder
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-[#003b8d]">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:text-[#003b8d]">
                    Browse
                  </Link>
                </li>
                {user && user.role === "student" && (
                  <li>
                    <Link to="/counselor" className="hover:text-[#003b8d]">
                      Your Counselor
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-[#004aad] text-[#004aad] hover:bg-[#004aad] hover:text-white"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#004aad] hover:bg-[#003b8d] text-white">
                    Signup
                  </Button>
                </Link>
              </>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="User Profile"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="p-4">
                    <div className="flex gap-2">
                      <Avatar>
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt="User Profile"
                        />
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user?.fullname}</h4>
                        <p className="text-sm text-gray-500">
                          {user?.profile?.bio}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col mt-4">
                      {user.role === "student" && (
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 text-gray-700 hover:text-black"
                        >
                          <User2 />
                          View Profile
                        </Link>
                      )}
                      <button
                        className="flex items-center gap-2 text-gray-700 hover:text-black"
                        onClick={logoutHandler}
                      >
                        <LogOut />
                        Logout
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md lg:hidden">
            <ul className="flex flex-col items-center gap-4 py-4 text-[#004aad] font-semibold">
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link
                      to="/admin/companies"
                      onClick={() => setMenuOpen(false)}
                    >
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/students"
                      onClick={() => setMenuOpen(false)}
                    >
                      Students
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs" onClick={() => setMenuOpen(false)}>
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/resumeBuilder"
                      onClick={() => setMenuOpen(false)}
                    >
                      Resume Builder
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobs" onClick={() => setMenuOpen(false)}>
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to="/browse" onClick={() => setMenuOpen(false)}>
                      Browse
                    </Link>
                  </li>
                  {user && user.role === "student" && (
                    <li>
                      <Link to="/counselor" onClick={() => setMenuOpen(false)}>
                        Your Counselor
                      </Link>
                    </li>
                  )}
                </>
              )}
            </ul>
            <div className="flex flex-col items-center gap-4 py-4">
              {!user ? (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="border-[#004aad] text-[#004aad] hover:bg-[#004aad] hover:text-white w-full"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)}>
                    <Button className="bg-[#004aad] hover:bg-[#003b8d] text-white w-full">
                      Signup
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="w-full text-center flex flex-col gap-2">
                  <Link
                    to="/profile"
                    className="text-[#004aad] font-semibold hover:text-[#003b8d] w-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    View Profile
                  </Link>
                  <button
                    className="text-red-500 font-semibold hover:text-red-600 w-full"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
