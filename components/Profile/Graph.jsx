'use client';
import React, { useState, useEffect } from "react";

const Graph = ({ contest }) => {

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthPositions = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]; 
  const years = [new Date().getFullYear(), new Date().getFullYear() + 1, new Date().getFullYear() + 2, new Date().getFullYear() + 3, new Date().getFullYear() + 4];
  const contestDays = contest.documents.map((document) => {
    const contestDate = document?.contest_id?.created_at
      ? new Date(document.contest_id.created_at)
      : null;
    return contestDate ? contestDate.toISOString().split("T")[0] : null; 
  }).filter(date => date !== null); 

  // الحالة لتخزين السنة المختارة
  const [selectedYear, setSelectedYear] = useState(years[0]); 
  const [data, setData] = useState([]);
  const generateContestData = (year) => {
    const yearData = [];
    const startDate = new Date(year, 0, 1); 
    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split("T")[0]; 
      const isContestDay = contestDays.includes(dateString);
      const value = isContestDay ? 2 : 0;

      yearData.push({
        date,
        value,
      });
    }
    return yearData;
  };

  useEffect(() => {
    const newData = generateContestData(selectedYear);
    setData(newData);
  }, [selectedYear, contest]);

  return (
    <div className="bg-[#2c2e31] text-gray-400 p-6 rounded-lg max-w-full mb-6">
      <div className="flex  mb-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="bg-[#323437] text-[#F39C12] p-2 rounded-md "
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-4">
  
        <div className="grid grid-rows-7 gap-2">
          {days.map((day, index) => (
            <span key={index} className="text-sm capitalize">
              {day}
            </span>
          ))}
        </div>
        <div>
          <div
            className="grid gap-1"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(10px, 20px))", 
              gridAutoRows: "20px", 
            }}
          >
            {data.map((item, idx) => {
              const isContestDay = item.value === 2;

              return (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-sm relative group ${
                    isContestDay
                      ? "bg-yellow-700" 
                      : item.value === 0
                      ? "bg-[#323437]"
                      : "bg-yellow-400"
                  }`}
                >
                  <div className="absolute z-10 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded shadow-lg -top-10 left-1/2 transform -translate-x-1/2">
                    {days[item.date.getDay()]}, {item.date.toLocaleDateString()}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-2">
            {months.map((month, index) => (
              <span
                key={index}
                style={{ gridColumnStart: monthPositions[index] }}
                className="text-sm text-center"
              >
                {month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
