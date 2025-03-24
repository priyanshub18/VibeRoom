import { useSignIn } from "@clerk/clerk-react";
import React from "react";
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
    <Button className='w-full text-white border-zinc-200 h-11' onClick={() => signInWithGoogle()}>
      Continue With Google
    </Button>
  );
};

export default SignOutAuthButtons;
