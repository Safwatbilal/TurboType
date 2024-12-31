"use client";
import { useState, useEffect } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import createContest from "@/app/actions/createContest";
import useWords from "@/hook/useWords";
const AddContest = () => {
    const [state, formAction] = useActionState(createContest, {});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { words } = useWords(300);
    useEffect(() => {
      if (state.success) {
        toast.success("Contest created successfully!");
        setIsSubmitting(true);
        router.push("/contest");
      }
    }, [state]);
    const handleSubmit = (e) => {
      setIsSubmitting(true); 
    };
    return (
      <div className="flex justify-center items-center bg-bg-color">
        <form action={formAction} onSubmit={handleSubmit} className="rounded-lg max-w-sm w-full bg-sub-alt-color p-6">
          <h2 className="text-[#646669] text-2xl font-semibold mb-3">Create a New Contest</h2>
          <div className="grid gap-2 w-full">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Contest Name:"
                className="bg-[#2c2e31] rounded-md w-full p-2 text-[#d1d0c5] focus:outline-none focus:ring-2 focus:ring-main-color placeholder-[#646669]"
                autoComplete="off"
                required
              />
            </div>
  
            <div>
              <input
                type="hidden"
                id="word"
                name="word"
                value={words} 
              />
            </div>
  
            <div>
              <input
                type="number"
                id="duration"
                name="duration"
                placeholder="Duration (seconds):"
                className="bg-[#2c2e31] rounded-md w-full p-2 text-[#d1d0c5] focus:outline-none focus:ring-2 focus:ring-main-color placeholder-[#646669]"
                min="30"
                required
              />
            </div>
  
            <div>
              <input
                type="datetime-local"
                id="start_date"
                name="start_date"
                className="bg-[#2c2e31] rounded-md w-full p-2 text-[#d1d0c5] focus:outline-none focus:ring-2 focus:ring-main-color placeholder-[#646669]"
                required
              />
            </div>
          </div>
  
          <div className="flex flex-col gap-6 mt-4">
            <button
              type="submit"
              className="bg-[#F39C12] text-white font-bold py-3 px-6 rounded-md hover:bg-[#e68a00] transition focus:ring-2 focus:ring-offset-2 focus:ring-[#F39C12]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Create Contest"}
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default AddContest;
  