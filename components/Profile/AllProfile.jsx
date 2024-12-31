'use client';
import { useQuery, useMutation } from "@tanstack/react-query";
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
export default function AllProfile({ name }) {

  const router = useRouter();
  const { isAuthenticated, currentUser, setIsAuthenticated } = useAuth();

  const { data: userInfoData, isLoading: userInfoLoading, isError: userInfoError } = useQuery({
    queryKey: ["userInfo"],
    queryFn: checkAuth,
  });

  const { data: contestData, isLoading: contestLoading, isError: contestError } = useQuery({
    queryKey: ["contestData", name],
    queryFn: () => getScorePart({ name }), 
  });


  const logoutMutation = useMutation({
    mutationFn: destroySession,
    onSuccess: () => {
      setIsAuthenticated(false);
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Logout failed.");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (userInfoLoading || contestLoading) return <LoadingSpinner />;
  if (userInfoError || contestError) return <p className="text-red-500">Failed to load data.</p>;

  const userInfo = userInfoData?.user || {};
  const contest = contestData?.result || [];

  return (
    <>
      <Profile name={name} contest={contest} />
      <ContestUser contest={contest} />
      <Graph contest={contest} />
      <div className="flex flex-col items-center justify-center text-green-50">
        {isAuthenticated && currentUser.name === name && (
          <Logout logout={handleLogout} />
        )}
      </div>
    </>
  );
}
