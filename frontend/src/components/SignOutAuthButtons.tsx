import { GoogleOneTap, useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignOutAuthButtons = () => {
  const signInWithGoogle = () => {
    signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  return (
    <button
      className=' flex items-center justify-center space-x-2 
        text-white bg-zinc-800 hover:bg-zinc-700 
        border border-zinc-700 
        h-11 rounded-md 
        transition-all duration-200 
        group px-4 '
      onClick={signInWithGoogle}
    >
      <img src='/google.png' alt='' className='w-6 h-6 text-white filter brightness-125 hover:rotate-6 transition-transform' />
      <span className='font-bold'> Continue With Google</span>
    </button>
  );
};

export default SignOutAuthButtons;
