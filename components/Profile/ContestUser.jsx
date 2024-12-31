import { useState } from "react";
import Link from "next/link";

export default function ContestUser({ contest }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalParticipants = contest.documents.length;
  const totalPages = Math.ceil(totalParticipants / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentParticipants = contest.documents.slice(startIndex, endIndex);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const currentDate = new Date();

  const isContestOngoing = (endDate) => {
    return new Date(endDate) > currentDate;
  };

  const renderPagination = () => {
    const pages = [];
    const pageNumbersToDisplay = 3;
    const minPage = Math.max(1, currentPage - pageNumbersToDisplay);
    const maxPage = Math.min(totalPages, currentPage + pageNumbersToDisplay);

    for (let i = minPage; i <= maxPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-4 py-2 ${currentPage === i ? 'bg-[#F39C12]' : 'bg-[#3C3F43]'} text-white rounded-md`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="text-[#646669] mb-6">
      <div className="mt-6 bg-[#2C2E31] p-6 rounded-lg border border-[#2C2C2C]">
        <h3 className="text-xl font-bold mb-4 text-[#646669]">Participants</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full text-white border-collapse">
            <thead>
              <tr className="bg-[#2b2c2d] text-left">
                <th className="py-2 px-4 border-b border-[#2C2C2C]">User Name</th>
                <th className="py-2 px-4 border-b border-[#2C2C2C]">Total Typed</th>
                <th className="py-2 px-4 border-b border-[#2C2C2C]">Errors</th>
                <th className="py-2 px-4 border-b border-[#2C2C2C]">Time Typing</th>
                <th className="py-2 px-4 border-b border-[#2C2C2C]">Accuracy</th>
                <th className="py-2 px-4 border-b border-[#2C2C2C]">Contest Status</th>
              </tr>
            </thead>
            <tbody>
              {currentParticipants.map((participant, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-[#2E3033]" : "bg-[#292B2E]"
                  } hover:bg-[#44484C] transition-colors`}
                >
                  <td className="py-2 px-4 border-b border-[#2C2C2C]">
                    <Link
                      href={participant.contest_id.invite_link}
                      className="text-[#F39C12] hover:underline"
                    >
                      {participant.contest_id.name}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b border-[#2C2C2C] text-[#646669]">
                    {participant.total_typed}
                  </td>
                  <td className="py-2 px-4 border-b border-[#2C2C2C] text-[#646669]">
                    {participant.errors}
                  </td>
                  <td className="py-2 px-4 border-b border-[#2C2C2C] text-[#646669]">
                    {participant.contest_id.duration}
                  </td>
                  <td className="py-2 px-4 border-b border-[#2C2C2C] text-[#646669]">
                    {participant.total_typed > 0
                      ? (
                          ((participant.total_typed - participant.errors) / participant.total_typed) * 100
                        ).toFixed(2)
                      : 0}%
                  </td>
                  <td className="py-2 px-4 border-b border-[#2C2C2C] text-[#646669]">
                    {isContestOngoing(participant.contest_id.created_at) ? (
                      <span className="text-green-500">Ongoing</span>
                    ) : (
                      <span className="text-red-500">Ended</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#3C3F43] text-white rounded-md hover:bg-[#44484C] disabled:bg-[#555b5f]"
          >
            Prev
          </button>
     
          {renderPagination()}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#3C3F43] text-white rounded-md hover:bg-[#44484C] disabled:bg-[#555b5f]"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
