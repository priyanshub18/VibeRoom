import { SignedIn, SignedOut, SignIn, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import SignOutAuthButtons from "./SignOutAuthButtons";

const TopBar = () => {
  const isAdmin = false;
  return (
    <div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10'>
      <div className='flex flex-gap-2 items-center'>VibeRoom</div>
      <div className='flex items-center gap-4'>
        {isAdmin && (
          <Link to='/admin'>
            <LayoutDashboard />
            <div className='text-emerald-300 hover:text-emerald-400 cursor-pointer'>Admin Dashboard</div>
          </Link>
        )}
        <SignedIn>
          <SignOutButton />
        </SignedIn>
        <SignedOut>
          <SignOutAuthButtons />
        </SignedOut>
      </div>
    </div>
  );
};

export default TopBar;
