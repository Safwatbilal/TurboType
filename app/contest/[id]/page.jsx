import getSingleContest from "@/app/actions/getsignelContest";
import Link from "next/link";
import CountdownTimer from "@/components/CountDown";
import ContestAll from "@/components/ContestAll";

export default async function Contest({ params }) {
    const { id } = params;
    
    const { contest, participants } = await getSingleContest(id);
    
    const contestStartTime = new Date(contest.created_at);
    const contestEndTime = new Date(contestStartTime.getTime() + contest.duration * 1000);
    const currentTime = new Date();
    const timeDifferenceInSeconds = Math.floor((contestEndTime - currentTime) / 1000);
    const targetTimeInSeconds = Math.floor((new Date(contestStartTime) - new Date()) / 1000);
    
    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 px-4 sm:px-8 py-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-center sm:text-left">{contest.name}</h1>
                <div className="flex items-center gap-4 sm:gap-6">
                    <CountdownTimer targetTime={contestStartTime} prefix="Starts in:" />
                </div>
                    <Link
                        href={`/contest/${id}/participants`}
                        className="text-[#646669] hover:text-[#e68a00] transition"
                    >
                        View Participants
                    </Link>
            </div>
    
            <div className="mt-8 px-4 sm:px-8">
                {timeDifferenceInSeconds >= 0 ? (
                    <ContestAll id={id} duration={contest.duration} targetTime={targetTimeInSeconds} words={contest.word} />
                ) : (
                    <p className="text-center text-gray-500">The contest has ended.</p>
                )}
            </div>
        </>
    );
}
