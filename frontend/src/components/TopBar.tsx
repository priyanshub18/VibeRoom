import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import SignOutAuthButtons from "./SignOutAuthButtons";
import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/clerk-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuthStore();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className='flex items-center justify-between px-4 py-3 sticky top-0 bg-zinc-900/80 backdrop-blur-lg shadow-lg border border-zinc-800 z-50 rounded-lg mb-3'>
      <button className='flex items-center space-x-3' onClick={() => navigate("/")}>
        <img src='/logo.svg' alt='Logo' className='w-8 h-8 text-white filter brightness-125 hover:rotate-6 transition-transform' />
        <span className='text-2xl font-bold tracking-normal bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent'>V I B E-R O O M </span>
      </button>

      <div className='flex items-center gap-3'>
        {isAdmin && (
          <Link
            to='/admin'
            className='flex items-center space-x-2   
              transition-colors group text-emerald-300 px-3 py-2 rounded-lg hover:bg-zinc-800'
          >
            <LayoutDashboard className='w-5 h-5 group-hover:scale-110 transition-transform' />
            <span className='font-medium hidden sm:block'>Admin Dashboard</span>
          </Link>
        )}

        <SignedIn>
          {/* <LogOut className='w-5 h-5 group-hover:rotate-6 transition-transform' /> */}

          {/* <DropdownMenu>
            <DropdownMenuTrigger>

              <LogOut className='w-5 h-5 hover:rotate-10 transition-transform text-red-600' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div
                className='w-full 
    bg-gradient-to-r 
   
    text-white 
    flex 
    items-center 
    justify-center 
    py-2 
    px-2 
    rounded-lg 
    shadow-md 
    
    transition-all 
    duration-300 
    ease-in-out 
    transform 
    hover:scale-[1.02] 
    active:scale-[0.98] 
    group 
    cursor-pointer'
              >
                <SignOutButton>
                  <button className='bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded'>Sign Out</button>
                </SignOutButton>
              </div>
            </DropdownMenuContent>
          </DropdownMenu> */}

          <SignOutButton>
            {/* <LogOut className='w-5 h-5 hover:rotate-10 transition-transform text-red-600' /> */}

            <div className='relative inline-block' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              {/* Logout Icon Button */}
              <button className='p-2 text-white rounded-lg shadow-md hover:bg-red-600 transition-all group'>
                <LogOut size={20} className='w-5 h-5 group-hover:rotate-10 transition-transform ' />
              </button>

              {/* Tooltip (Appears on Hover) */}
              {isHovered && (
                <div
                  className='absolute bottom-0 right-0 translate-x-2 translate-y-10 
          bg-zinc-900 text-white text-sm px-3 py-2 rounded-md 
          shadow-lg opacity-100 transition-opacity duration-300
          z-50'
                >
                  LogOut
                </div>
              )}
            </div>
          </SignOutButton>

          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "ml-4 w-8 h-8 ring-2 ring-zinc-700 hover:ring-emerald-500 transition-all",
              },
            }}
          />
        </SignedIn>

        <SignedOut>
          <SignOutAuthButtons />
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
