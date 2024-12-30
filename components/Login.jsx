'use client';
import Link from "next/link";
import { useActionState, useState } from "react";
import createSession from "@/app/actions/createSession";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/avibilty";
import { FaGoogle } from "react-icons/fa";
import checkAuth from "@/app/actions/checkAuth";

const Login = () => {
  const [state, formAction] = useActionState(createSession, {});
  const { isAuthenticated, setIsAuthenticated ,setCurrentUser} = useAuth();
  const [x,setx]=useState()
  const router = useRouter();

  useEffect(() => {
    if (state.error) {
        toast.error(state.error);
    }
    if (state.success) {
        toast.success('Logged in successfully!');

        // تحديث حالة المصادقة وتفاصيل المستخدم
        setIsAuthenticated(true);

        // جلب معلومات المستخدم بعد تسجيل الدخول
        const fetchUser = async () => {
            const { user } = await checkAuth();
            setCurrentUser(user); // تحديث الحالة مباشرة
        };

        fetchUser();

        // إعادة التوجيه للصفحة الرئيسية
        router.push('/');
    }
}, [state]);

  console.log(state)
  const handleGoogleLogin = () => {
    toast.info("Google login coming soon!");
  };

  return (
    <div className="flex justify-center items-center ">
      <form action={formAction} className="rounded-lg max-w-sm w-full bg-sub-alt-color p-6">
        <h2 className="text-[#646669] text-2xl font-semibold mb-3">Login</h2>
        <div className="grid gap-2 w-full">
          
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email:"
              className="bg-[#2c2e31] rounded-md w-full p-2 text-[#d1d0c5] focus:outline-none focus:ring-2 focus:ring-main-color placeholder-[#646669]"
              autoComplete="email"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password:"
              className="bg-[#2c2e31] rounded-md w-full p-2 text-[#d1d0c5] focus:outline-none focus:ring-2 focus:ring-main-color placeholder-[#646669]"
              required
              autoComplete="password"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 mt-6">
          <button
            type="submit"
            className="text-white font-bold py-3 px-6 bg-[#2c2e31] rounded-md hover:bg-main-color/90 transition"
          >
            Login
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-red-500 text-white font-bold py-3 px-6 rounded-md hover:bg-red-600 transition"
            onClick={handleGoogleLogin}
          >
            <FaGoogle className="text-xl" />
            Login with Google
          </button>
        </div>

        <p className="text-center text-sub-color mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#F39C12] hover:underline">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
