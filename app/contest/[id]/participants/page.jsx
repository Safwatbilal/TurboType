import getSingleContest from "@/app/actions/getsignelContest";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa"; // استيراد أيقونة الرجوع

export default async function Participants({ params }) {
    const { id } = params;
    const { participants } = await getSingleContest(id);
    
    return (
        <div className="container mx-auto py-8 px-4">
      
            <div className="mb-6">
                <Link
                    href={`/contest/${id}`}
                    className="flex items-center text-gray-400 hover:text-white transition"
                >
                    <FaArrowLeft className="mr-2" /> Back
                </Link>
            </div>

       
            <h1 className="text-4xl font-bold text-center mb-6 text-white">Participants</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-gray-400 bg-[#2c2e31] rounded-lg">
                    <thead className="bg-[#1f2023] text-gray-300 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Username</th>
                            <th className="px-6 py-3">Total Typed</th>
                            <th className="px-6 py-3">Errors</th>
                            <th className="px-6 py-3">Accuracy (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.documents.map((participant, index) => {
                            const { userName, total_typed, errors } = participant;
                            const accuracy =
                                total_typed > 0 ? ((total_typed - errors) / total_typed) * 100 : 0;

                            return (
                                <tr
                                    key={participant.$id}
                                    className={`hover:bg-[#3a3b3d] transition ${
                                        index % 2 === 0 ? "bg-[#2a2b2d]" : "bg-[#27282a]"
                                    }`}
                                >
                                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        <Link href={`/profile/${userName}`} className="text-[#F39C12]">{userName}</Link>
                                        </td>
                                    <td className="px-6 py-4">{total_typed}</td>
                                    <td className="px-6 py-4">{errors}</td>
                                    <td className="px-6 py-4">{accuracy.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
