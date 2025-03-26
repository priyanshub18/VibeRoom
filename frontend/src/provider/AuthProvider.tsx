import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
const updateApiToken = async (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);

        if (token) {
          checkAdminStatus();
        }
      } catch (error) {
        updateApiToken(null);
        console.error("Error in AuthProvider", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [getToken]);

  if (loading)
    return (
      <div className='flex items-center justify-center min-h-screen bg-black'>
        <div className='text-center'>
          <div className='flex justify-center items-center space-x-2 mb-4'>
            <div className='w-4 h-4 bg-green-500 rounded-full animate-bounce'></div>
            <div className='w-4 h-4 bg-green-500 rounded-full animate-bounce delay-100'></div>
            <div className='w-4 h-4 bg-green-500 rounded-full animate-bounce delay-200'></div>
          </div>
          <h2 className='text-xl text-gray-200 font-semibold'>Loading...</h2>
          <p className='text-gray-400 mt-2'>Loading your Experience</p>
        </div>
      </div>
    );
  return <div>{children}</div>;
};

export default AuthProvider;
