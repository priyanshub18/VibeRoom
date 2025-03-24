import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { axiosInstance } from "@/lib/axios";
import { Navigate, useNavigate } from "react-router-dom";

const AuthCallBack = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const syncAttempt = useRef(false);
  useEffect(() => {
    const syncUser = async () => {
      try {
        if (!isLoaded || !user || syncAttempt.current) {
          return;
        }

        await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
        syncAttempt.current = true;
      } catch (error) {
        console.log("Error in AuthCallBack", error);
      } finally {
        navigate("/");
      }
    };
    syncUser();
  }, [isLoaded, navigate, user]);
  return (
    <div className='h-screen w-full bg-black flex items-center justify-center'>
      <Card className='w-[90%] max-w-md bg-zinc-900 border-zinc-800'>
        <CardContent className='flex flex-col items-center gap-4 pt-1 pb-2'>
          <Loader className='size-6 text-emerald-500 animate-spin' />
          <h3 className='text-zinc-400 text-xl font-bold'>Logging you in</h3>
          <p className='text-zinc-400 text-sm'>Redirecting...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallBack;
