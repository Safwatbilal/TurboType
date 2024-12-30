
import getSingleContest from "@/app/actions/getsignelContest";
import Link from "next/link";
import CountdownTimer from "@/components/CountDown";
import ContestAll from "@/components/ContestAll";

export default async function Contest({ params }) {
    const { id } = params;
    
    const { contest,participants } = await getSingleContest(id);
    console.log(contest)
    const contestStartTime = new Date(contest.created_at);
    const contestEndTime = new Date(contestStartTime.getTime() + contest.duration * 1000);
    const currentTime = new Date();
    const timeDifferenceInSeconds = Math.floor((contestEndTime - currentTime) / 1000);
    const targetTimeInSeconds = Math.floor((new Date(contestStartTime) - new Date()) / 1000);
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="">
                <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-extrabold">{contest.name}</h1>
                        <CountdownTimer targetTime={contestStartTime} prefix="Starts in:" />
                        <Link
                            href={`/contest/${id}/participants`}
                            className="text-[#646669] hover:text-[#e68a00] transition"
                        >
                            View Particpants
                        </Link>
                </div>
            </div>

            {/* Contest Content */}
            <div className="mt-8">
                {timeDifferenceInSeconds >= 0 ? (
                    <ContestAll id={id} duration={contest.duration} targetTime={targetTimeInSeconds} words={contest.word}/>
                ) : (
                    <p className="text-center text-gray-500">The contest has ended.</p>
                )}
            </div>
        </div>
    );
}
