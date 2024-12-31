'use client';
import React, { useEffect, useState } from "react";
import GeneratedWords from "@/components/GeneratedWords";
import RestartButton from "@/components/RestertButton";
import Results from "@/components/Results";
import UserTypings from "@/components/UserTypings";
import useEngine from "@/hook/useEngine";
import { calculateAccuracyPercentage } from "@/util/helper";
import saveResulte from "@/app/actions/saveResult";
import checkAuth from "@/app/actions/checkAuth";
import { toast } from "react-toastify"; 
import { useRouter } from "next/navigation";
import LoadingSpinner from "./loading";

const ContestAll = ({ id, duration, targetTime ,words}) => {
  const [isWaiting, setIsWaiting] = useState(true); 
  const {  typed, timeLeft, errors, state, restart, totalTyped } = useEngine({ time: duration });
  const router=useRouter()
  useEffect(() => {
    if (targetTime > 0) {
      const timer = setTimeout(() => {
        setIsWaiting(false); 
      }, targetTime * 1000); 
      return () => clearTimeout(timer); 
    } else {
      setIsWaiting(false); 
    }
  }, [targetTime]);

  useEffect(() => {
    if (!isWaiting && timeLeft === 0) {
      const saveResultss = async () => {
        const res = await saveResulte({
          contestId: id,
          total_typed: totalTyped,
          errors: errors        });
          if(res.success){
            router.push(`/contest/${id}/participants`)
            toast.success(res.message);
          }

      };

      saveResultss();
    }
  }, [isWaiting, timeLeft]);

  if (isWaiting) {
    return (
      <div className="text-slate-50 grid place-items-center px-4 tracking-wider font-mono">
        <h1 className="text-4xl"></h1>
        
      </div>
    );
  }
  if(timeLeft===0){
    return (
      <LoadingSpinner></LoadingSpinner>
    );

  }

  return (
    <div className="text-slate-50 grid place-items-center px-4 tracking-wider font-mono">
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <GeneratedWords key={words} words={words} />
        <UserTypings
          className="absolute inset-0"
          words={words}
          userInput={typed}
        />
      </WordsContainer>
      <RestartButton
        className="mx-auto mt-10 text-slate-500"
        onRestart={restart}
      />
    </div>
  );
};

const WordsContainer = ({ children }) => (
  <div className="relative text-3xl max-w-8xl leading-relaxed break-all mt-3">
    {children}
  </div>
);

const CountdownTimer = ({ timeLeft }) => (
  <h2 className="text-primary-400 font-medium">Time: {timeLeft}</h2>
);

export default ContestAll;
