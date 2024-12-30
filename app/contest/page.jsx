'use client';
import { useState, useEffect } from 'react';
import getAllContests from '@/app/actions/getAllContests';
import joinContestWithDetails from '@/app/actions/joinCotests';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa'; 
import LoadingSpinner from '@/components/loading';
import safwat from '../actions/safwat';

const ContestList = () => {
    const [contests, setContests] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [upcomingPage, setUpcomingPage] = useState(1);
    const [pastPage, setPastPage] = useState(1);

    const itemsPerPage = 5; 
    useEffect(() => {
        const fetchContests = async () => {
        try {
            const response = await getAllContests();
            setContests(response.contests);
        } catch (error) {
            setError(response.error);
        } finally {
            setLoading(false); 
        }
        };
        fetchContests();
    }, []);

    const handleJoinClick = async (contest) => {
        console.log(contest.$id);
        
        const { result } = await safwat({ contestId: contest.$id });
        console.log(result);
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
    };

    const isUpcoming = (contest) => {
        const contestStartDate = new Date(contest.created_at);
        return contestStartDate > new Date();
    };

    const upcomingContests = contests.filter(isUpcoming);
    const pastContests = contests.filter(contest => !isUpcoming(contest));
    const paginatedUpcomingContests = upcomingContests.slice((upcomingPage - 1) * itemsPerPage, upcomingPage * itemsPerPage);
    const paginatedPastContests = pastContests.slice((pastPage - 1) * itemsPerPage, pastPage * itemsPerPage);
    const handleUpcomingPageChange = (page) => setUpcomingPage(page);
    const handlePastPageChange = (page) => setPastPage(page);

    const renderPagination = (totalItems, currentPage, setPage, prefix = '') => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
    
        if (totalPages <= 5) {
            return (
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={`${prefix}page-${i + 1}`}  // Using a unique prefix for keys
                            onClick={() => setPage(i + 1)}
                            className={`px-4 py-2 ${currentPage === i + 1 ? 'bg-[#F39C12] text-white' : 'bg-gray-600 text-white'} rounded-md mx-1`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            );
        }
    
        const pages = [];
    
        // Previous Button
        pages.push(
            <button
                key={`${prefix}prev`}
                onClick={() => currentPage > 1 && setPage(currentPage - 1)}
                className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-400 text-white' : 'bg-gray-600 text-white'} rounded-md mx-1`}
                disabled={currentPage === 1}
            >
                Prev
            </button>
        );
    
        // First Page Button
        if (currentPage !== 1) {
            pages.push(
                <button
                    key={`${prefix}page-1`} 
                    onClick={() => setPage(1)}
                    className={`px-4 py-2 ${currentPage === 1 ? 'bg-[#F39C12] text-white' : 'bg-gray-600 text-white'} rounded-md mx-1`}
                >
                    1
                </button>
            );
        }
    
        // Handle Ellipsis when current page > 3
        if (currentPage > 3) {
            pages.push(
                <span key={`${prefix}ellipsis-start`} className="px-4 py-2 text-white">
                    ...
                </span>
            );
        }
    
        // Previous Pages before current page
        if (currentPage > 2) {
            pages.push(
                <button
                    key={`${prefix}page-${currentPage - 1}`}
                    onClick={() => setPage(currentPage - 1)}
                    className={`px-4 py-2 ${currentPage === currentPage - 1 ? 'bg-[#F39C12] text-white' : 'bg-gray-600 text-white'} rounded-md mx-1`}
                >
                    {currentPage - 1}
                </button>
            );
        }
    
        // Current Page
        pages.push(
            <button
                key={`${prefix}page-${currentPage}`} 
                onClick={() => setPage(currentPage)}
                className={`px-4 py-2 ${currentPage === currentPage ? 'bg-[#F39C12] text-white' : 'bg-gray-600 text-white'} rounded-md mx-1`}
            >
                {currentPage}
            </button>
        );
    
        // Next Pages after current page
        if (currentPage < totalPages - 1) {
            pages.push(
                <button
                    key={`${prefix}page-${currentPage + 1}`}
                    onClick={() => setPage(currentPage + 1)}
                    className={`px-4 py-2 ${currentPage === currentPage + 1 ? 'bg-[#F39C12] text-white' : 'bg-gray-600 text-white'} rounded-md mx-1`}
                >
                    {currentPage + 1}
                </button>
            );
        }
    
        // Handle Ellipsis when current page is near the end
        if (currentPage < totalPages - 2) {
            pages.push(
                <span key={`${prefix}ellipsis-end`} className="px-4 py-2 text-white">
                    ...
                </span>
            );
        }
    
        // Last Page Button
        if (currentPage !== totalPages) {
            pages.push(
                <button
                    key={`${prefix}page-${totalPages}`} 
                    onClick={() => setPage(totalPages)}
                    className={`px-4 py-2 ${currentPage === totalPages ? 'bg-[#F39C12] text-white' : 'bg-gray-600 text-white'} rounded-md mx-1`}
                >
                    {totalPages}
                </button>
            );
        }
    
        // Next Button
        pages.push(
            <button
                key={`${prefix}next`}
                onClick={() => currentPage < totalPages && setPage(currentPage + 1)}
                className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-400 text-white' : 'bg-gray-600 text-white'} rounded-md mx-1`}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        );
    
        return (
            <div className="flex justify-center mt-4">
                {pages}
            </div>
        );
    };

    return (
        <div className="text-white bg-[#323437] ">
            <div className="container mx-auto py-8">
                <div className="flex justify-around items-center mb-6">
                    <h1 className="text-2xl font-bold text-center ">Contests</h1>
                    <Link href="/contest/add">
                        <button className=" text-[#646669] p-3 rounded-full hover:text-[#F39C12]">
                            <FaPlus size={20} />
                        </button>
                    </Link>
                </div>

                {loading && <LoadingSpinner />}

                {/* Upcoming Contests Section */}
                {!loading && upcomingContests.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-green-500">Upcoming Contests</h2>
                        <table className="w-full table-auto bg-[#3A3B3D] rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-green-700">
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Start Date</th>
                                    <th className="p-3 text-left">Duration</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedUpcomingContests.map((contest) => (
                                    <tr key={contest.$id} className="hover:bg-[#464648]">
                                        <td className="p-3">{contest.name}</td>
                                        <td className="p-3 text-green-400">{contest.status}</td>
                                        <td className="p-3">{new Date(contest.created_at).toLocaleString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: true,
                                        })}</td>
                                        <td className="p-3">{contest.duration} seconds</td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => handleJoinClick(contest)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded mr-2"
                                            >
                                                Join
                                            </button>
                                            <Link href={`/contest/${contest.$id}`}>
                                                <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded">
                                                    View
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {renderPagination(upcomingContests.length, upcomingPage, handleUpcomingPageChange, 'upcoming-')}
                    </div>
                )}

                {/* Past Contests Section */}
                {!loading && pastContests.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4 text-red-500">Past Contests</h2>
                        <table className="w-full table-auto bg-[#3A3B3D] rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-red-700">
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">End Date</th>
                                    <th className="p-3 text-left">Duration</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedPastContests.map((contest) => (
                                    <tr key={contest.$id} className="hover:bg-[#464648]">
                                        <td className="p-3">{contest.name}</td>
                                        <td className="p-3 text-red-400">{contest.status}</td>
                                        <td className="p-3">{new Date(contest.created_at).toLocaleString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: true,
                                        })}</td>
                                        <td className="p-3">{contest.duration} seconds</td>
                                        <td className="p-3">
                                            <Link href={`/contest/${contest.$id}`}>
                                                <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded">
                                                    View
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {renderPagination(pastContests.length, pastPage, handlePastPageChange, 'past-')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContestList;
