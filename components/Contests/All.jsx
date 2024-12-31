'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getAllContests from '@/app/actions/getAllContests';
import joinContestWithDetails from '@/app/actions/joinCotests';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import LoadingSpinner from '@/components/loading';
import join from '@/app/actions/join';
import { useRouter } from 'next/navigation';
export default function AllContest() {
    const [upcomingPage, setUpcomingPage] = useState(1);
    const [pastPage, setPastPage] = useState(1);
    const Router=useRouter()
    const itemsPerPage = 5;
    const { data: contestsData, isLoading, isError } = useQuery({
        queryKey: ['contests'], 
        queryFn: getAllContests, 
    });
    const contests = contestsData?.contests || [];

    const handleJoinClick = async (contest) => {
        const { result,success } = await join({ contestId: contest.$id });
        console.log(result)
        if (success===false) {
            toast.info('You have Login ');
            Router.push('/login')
            return;
        }else if(success===true) {

            if (result.total > 0) {
                toast.info('You have already joined this contest.');
                return;
            }
            const response = await joinContestWithDetails(contest.$id); 
            if (response.success) {
                toast.success('Successfully joined the contest!');
            } else {
                toast.error(response.error || 'Failed to join contest.');
            }
        }
    };

    const isUpcoming = (contest) => {
        const contestStartDate = new Date(contest.created_at);
        return contestStartDate > new Date();
    };

    const upcomingContests = contests.filter(isUpcoming);
    const pastContests = contests.filter((contest) => !isUpcoming(contest));

    const paginatedUpcomingContests = upcomingContests.slice(
        (upcomingPage - 1) * itemsPerPage,
        upcomingPage * itemsPerPage
    );
    const paginatedPastContests = pastContests.slice(
        (pastPage - 1) * itemsPerPage,
        pastPage * itemsPerPage
    );

    const renderPagination = (totalItems, currentPage, setPage, prefix = '') => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={`${prefix}page-${i}`}
                    onClick={() => setPage(i)}
                    className={`px-3 py-1 ${
                        currentPage === i ? 'bg-[#F39C12] text-white' : 'bg-gray-600 text-white'
                    } rounded-md mx-1`}
                    aria-label={`Go to page ${i}`}
                >
                    {i}
                </button>
            );
        }

        return <div className="flex justify-center mt-4">{pages}</div>;
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <p className="text-red-500 text-xs">Failed to load contests.</p>;

    return (
        <div className="text-white bg-[#323437]">
         
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-center">Contests</h1>
                    <Link href="/contest/add">
                        <button className="text-[#646669] p-3 rounded-full hover:text-[#F39C12]" aria-label="Add new contest">
                            <FaPlus size={20} />
                        </button>
                    </Link>
                </div>

                {/* Upcoming Contests Section */}
                {upcomingContests.length > 0 && (
                    <div>
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-green-500">Upcoming Contests</h2>
                        <table className="w-full table-auto bg-[#3A3B3D] rounded-lg overflow-hidden text-sm">
                            <thead>
                                <tr className="bg-green-700">
                                    <th className="p-3 text-left text-sm">Name</th>
                                    <th className="p-3 text-left text-sm">Start Date</th>
                                    <th className="p-3 text-left text-sm">Duration  {'('}s{')'}</th>
                                    <th className="p-3 text-left text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedUpcomingContests.map((contest) => (
                                    <tr key={contest.$id} className="hover:bg-[#464648]">
                                        <td className="p-3 text-sm">{contest.name}</td>
                                        <td className="p-3 text-sm">{new Date(contest.created_at).toLocaleString()}</td>
                                        <td className="p-3 text-sm">{contest.duration}</td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => handleJoinClick(contest)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded mr-2 text-xs mb-3"
                                                aria-label={`Join ${contest.name} contest`}
                                            >
                                                Join
                                            </button>
                                            <Link href={`/contest/${contest.$id}`}>
                                                <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-xs" aria-label={`View ${contest.name} contest`}>
                                                    View
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {renderPagination(upcomingContests.length, upcomingPage, setUpcomingPage, 'upcoming-')}
                    </div>
                )}

                {/* Past Contests Section */}
                {pastContests.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-red-500">Past Contests</h2>
                        <table className="w-full table-auto bg-[#3A3B3D] rounded-lg overflow-hidden text-sm">
                            <thead>
                                <tr className="bg-red-700">
                                    <th className="p-3 text-left text-sm">Name</th>
                                    <th className="p-3 text-left text-sm">End Date</th>
                                    <th className="p-3 text-left text-sm">Duration  {'('}s{')'}</th>
                                    <th className="p-3 text-left text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedPastContests.map((contest) => (
                                    <tr key={contest.$id} className="hover:bg-[#464648]">
                                        <td className="p-3 text-sm">{contest.name}</td>
                                        <td className="p-3 text-sm">{new Date(contest.created_at).toLocaleString()}</td>
                                        <td className="p-3 text-sm">{contest.duration} </td>
                                        <td className="p-3">
                                            <Link href={`/contest/${contest.$id}`}>
                                                <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-xs" aria-label={`View ${contest.name} contest`}>
                                                    View
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {renderPagination(pastContests.length, pastPage, setPastPage, 'past-')}
                    </div>
                )}
            </div>
  
    );
}
