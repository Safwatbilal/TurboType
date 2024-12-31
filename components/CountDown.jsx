"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CountdownTimer({ targetTime }) {
    const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const updateTime = () => {
            const currentTime = new Date();
            const difference = Math.floor((targetTime - currentTime) / 1000);

            if (difference <= 0) {
                setTimeRemaining("Time is up!");
                clearInterval(interval);
                return;
            }

            const hours = Math.floor(difference / 3600);
            const minutes = Math.floor((difference % 3600) / 60);
            const seconds = difference % 60;

            setTimeRemaining({ hours, minutes, seconds });
        };

        const interval = setInterval(updateTime, 1000);
        updateTime();

        return () => clearInterval(interval); 
    }, [targetTime]);

    if (typeof timeRemaining === "string") {
        return (
            <motion.div
                className="text-center text-lg font-bold text-red-500"
            
            >
                {timeRemaining}
            </motion.div>
        );
    }

    const { hours, minutes, seconds } = timeRemaining;


    const digitAnimation = {
        initial: { y: 0, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -10, opacity: 0 },
       
    };


    const formatNumber = (value) => (value < 10 ? `0${value}` : value);

    const renderDigit = (value, label) => (
        <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={value} 
                    className="text-3xl font-bold"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={digitAnimation}
                >
                    {formatNumber(value)}
                </motion.div>
            </AnimatePresence>
        </div>
    );

    return (
        <div className="flex justify-center items-center gap-4 text-white text-xl">
            {renderDigit(hours, "Hours")}
            <div className="text-2xl">:</div>
            {renderDigit(minutes, "Minutes")}
            <div className="text-2xl">:</div>
            {renderDigit(seconds, "Seconds")}
        </div>
    );
}
