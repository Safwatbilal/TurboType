'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import createUser from '@/app/actions/createUser';
import checkName from '@/app/actions/chechName';
import { useActionState } from 'react';
import { FaUser } from 'react-icons/fa';
import LoadingSpinner from './loading';

const Signup = () => {
  const [state, formAction] = useActionState(createUser, {});
  const router = useRouter();

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success('Signup successfully! Let\'s Login');
      router.push('/login');
    }
  }, [state]);

  // التحقق من الاسم أثناء الكتابة
  const handleNameChange = async (e) => {
    const inputName = e.target.value;
    setName(inputName);
    setNameError('');  // إعادة تعيين الخطأ أثناء الكتابة
    
    if (inputName) {
      setIsChecking(true); // إظهار حالة التحميل

      try {
        const errorMessage = await checkName(inputName);
        setNameError(errorMessage);
      } catch (error) {
        setNameError('Error occurred while checking the name');
      } finally {
        setIsChecking(false); // إخفاء حالة التحميل بعد التحقق
      }
    } else {
      setNameError(''); // إزالة الخطأ إذا كان الاسم فارغًا
    }
  };
console.log(nameError)
  return (
    <div className="flex justify-center items-center bg-bg-color">
      <form action={formAction} className="rounded-lg max-w-sm w-full bg-sub-alt-color p-6">
        <h2 className="text-[#646669] text-2xl font-semibold mb-3">SignUp</h2>
        <div className="grid gap-4 w-full">
          <div className='relative'>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name"
              className="bg-[#2c2e31] rounded-md w-full p-2 text-[#d1d0c5] focus:outline-none focus:ring-2 focus:ring-main-color placeholder-[#646669]"
              autoComplete="name"
              required
              value={name}
              onChange={handleNameChange}
            />
            <div className='absolute top-[39%] right-[11px]'>
            
        
              {isChecking && <LoadingSpinner  isCheck={true} />} {/* عرض التحميل أثناء التحقق */}
              {nameError==='not' && <FaUser className="text-red-500 text-sm" />} {/* الخطأ عند عدم توفر الاسم */}
              {nameError==='sure' && !isChecking && <FaUser className='text-green-500 text-sm' />} {/* النجاح عندما يكون الاسم متاحًا */}
              
            </div>
          </div>

          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
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
              placeholder="Password"
              className="bg-[#2c2e31] rounded-md w-full p-2 text-[#d1d0c5] focus:outline-none focus:ring-2 focus:ring-main-color placeholder-[#646669]"
              required
              autoComplete="password"
            />
          </div>

          <div>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm password"
              className="bg-[#2c2e31] rounded-md w-full p-2 text-[#d1d0c5] focus:outline-none focus:ring-2 focus:ring-main-color placeholder-[#646669]"
              autoComplete="confirm-password"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <button
            type="submit"
            className="text-white font-bold py-3 px-6 bg-[#2c2e31] rounded-md hover:bg-main-color/90 transition mt-2"
         
          >
            SignUp
          </button>

          <p className="text-center text-sub-color">
            Already have an account?{' '}
            <Link href="/login" className="text-[#F39C12] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
