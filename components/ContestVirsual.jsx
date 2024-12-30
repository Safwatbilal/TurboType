'use client';
import React, { useEffect, useState } from "react";
import GeneratedWords from "@/components/GeneratedWords";
import RestartButton from "@/components/RestertButton";
import Results from "@/components/Results";
import UserTypings from "@/components/UserTypings";
import useEngine from "@/hook/useEngine";



const ContestVirsual = () => {
  const {words,  typed, timeLeft, errors, state, restart, totalTyped } = useEngine({ time: 30 });
  console.log(words)
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
      <Results errors={errors} total={totalTyped} state={state} accuracyPercentage={(totalTyped-errors)/totalTyped *100} wpm={((totalTyped - errors) / 5) / (30 / 60)}></Results>
    </div>
  );
};

const WordsContainer = ({ children }) => (
  <div className="relative text-3xl max-w-7xl  leading-relaxed break-all mt-3">
    {children}
  </div>
);

const CountdownTimer = ({ timeLeft }) => (
  <h2 className="text-primary-400 font-medium">Time: {timeLeft}</h2>
);

export default ContestVirsual;
