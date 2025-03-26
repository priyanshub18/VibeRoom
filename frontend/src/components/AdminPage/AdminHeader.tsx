import { UserButton } from "@clerk/clerk-react";
import { RotateCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className='flex items-center justify-between p-5 bg-zinc-900 rounded-2xl shadow-lg border border-zinc-800'>
      <div className='flex items-center space-x-6'>
        <Link to='/' className='rounded-xl transition-transform hover:scale-105 hidden sm:block'>
          <img src='/logo.svg' className='w-14 h-14 rounded-xl bg-emerald-500/10 p-2' alt='Logo' />
        </Link>
        <div>
          <h1 className='text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 tracking-tight'>Empower Your Sound: Manage & Elevate Your Music</h1>
          <p className='text-zinc-400 text-md mt-1.5 font-medium tracking-wide'>Your Music Catalog Companion</p>
        </div>
      </div>
      <div className='flex items-center gap-5'>
       
        <UserButton
          appearance={{
            layout: {
              animations: true,
            },
            elements: {
              userButtonTrigger: "hover:bg-zinc-800 rounded-full transition-colors duration-300",
              userButtonPopoverCard: "bg-zinc-900 border-zinc-800 shadow-xl",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Header;
