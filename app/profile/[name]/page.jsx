'use client';
import { useState, useEffect,use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/avibilty";
import checkAuth from "@/app/actions/checkAuth";
import getScorePart from "@/app/actions/getScorePart";
import destroySession from "@/app/actions/destroySession";
import { toast } from "react-toastify";
import ContestUser from "@/components/Profile/ContestUser";
import LoadingSpinner from "@/components/loading";
import Profile from "@/components/Profile/Profile";
import Graph from "@/components/Profile/Graph";
import Logout from "@/components/Profile/Logout";
export default function Name({ params }) {
  const { name } = use(params);
  const router = useRouter();
  const { isAuthenticated, currentUser, setIsAuthenticated,setCurrentUser } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [contest, setContest] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { user } = await checkAuth();
        const { result } = await getScorePart({name:name});
        setUserInfo(user);
        setContest(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, []);
console.log(contest)
  const handleLogout = async () => {
    const { success, error } = await destroySession();
    if (success) {
      setIsAuthenticated(false);
      router.push('/login');
    } else {
      toast.error(error);
    }
  };

  return (
    <>
    {!loading&&
    <>
      <Profile name={name} contest={contest}></Profile> 
      <ContestUser contest={contest} ></ContestUser>
      <Graph contest={contest}></Graph> 
      <div className="flex flex-col items-center justify-center text-green-50">
        {isAuthenticated&&currentUser.name===name&&
          <Logout logout={handleLogout}></Logout>
        }
      </div> 
    </>

      }
    
      {loading&&<LoadingSpinner></LoadingSpinner>}

    
    </>
  );
}
