export default function Profile({ name, contest }) {
  const part = contest.documents;
  const totalTyped = part.reduce((total, doc) => total + doc.total_typed, 0);
  const totalErrors = part.reduce((total, doc) => total + doc.errors, 0);
  const bestPerformance = Math.max(...part.map(doc => doc.total_typed), 0);
  const bestTime = Math.max(...part.map(doc => doc.contest_id.duration), 0);

  return (
    <div className="bg-[#2C2E31] p-6 rounded-lg border border-[#2C2C2C] flex flex-col sm:flex-row gap-6 sm:gap-12">
      <div className="flex items-center gap-6 sm:w-1/3">
        <div className="w-16 h-16 bg-[#2C2C2C] rounded-full"></div>
        <div>
          <h2 className="text-2xl font-semibold text-white">{name}</h2>
          <p className="text-sm text-[#F39C12]">Contest Participant</p>
        </div>
      </div>
      <div className="space-y-4 sm:space-y-6 sm:w-2/3">
        <div className="flex justify-between">
          <p className="text-base text-[#646669]">Total Typed Characters:</p>
          <p className="text-base font-bold text-[#F39C12]">{totalTyped}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-base text-[#646669]">Total Errors:</p>
          <p className="text-base font-bold text-[#F39C12]">{totalErrors}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-base text-[#646669]">Best Performance:</p>
          <p className="text-base font-bold text-[#F39C12]">{bestPerformance}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-base text-[#646669]">Best Time:</p>
          <p className="text-base font-bold text-[#F39C12]">{bestTime} s</p>
        </div>
      </div>
    </div>
  );
}
