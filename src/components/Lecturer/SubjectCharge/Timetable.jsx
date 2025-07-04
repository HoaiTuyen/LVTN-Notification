import React from "react";

const TimetableLecturer = ({ classSectionList }) => {
  const periods = [
    "07h00 - 07h50",
    "07h50 - 08h40",
    "08h40 - 09h30",
    "09h35 - 10h25",
    "10h25 - 11h15",
    "11h15 - 12h05",
    "12h35 - 13h25",
    "13h25 - 14h15",
    "14h15 - 15h05",
    "15h10 - 16h00",
    "16h00 - 16h50",
    "16h50 - 17h40",
    "17h45 - 18h35",
    "18h35 - 19h25",
    "19h25 - 20h15",
  ];

  return (
    <div className="overflow-x-auto w-full">
      <div className="mb-4 p-3 bg-gray-50 border rounded text-sm leading-relaxed">
        <strong className="block mb-1">Thời gian các tiết học:</strong>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-1">
          {periods.map((time, index) => (
            <div key={index}>
              <span className="font-semibold">
                Tiết {String(index + 1).padStart(2, "0")}:
              </span>{" "}
              <span className="italic text-gray-700">{time}</span>
            </div>
          ))}
        </div>
      </div>

      <table className="table-fixed border-collapse w-full text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1 bg-gray-100 w-20">Tiết / Thứ</th>
            {[
              "Thứ 2",
              "Thứ 3",
              "Thứ 4",
              "Thứ 5",
              "Thứ 6",
              "Thứ 7",
              "Chủ Nhật",
            ].map((day, i) => (
              <th
                key={i}
                className="border px-2 py-1 bg-gray-100 text-center w-[120px]"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 15 }, (_, i) => {
            const period = i + 1;
            return (
              <tr key={i}>
                <td className="border px-2 py-1 font-semibold text-center bg-gray-50">
                  Tiết {period}
                </td>

                {Array.from({ length: 7 }, (_, j) => {
                  const day = j + 2;

                  const slot = classSectionList.find((section) =>
                    section.courseSchedules.some(
                      (s) =>
                        parseInt(s.id.day) === day &&
                        s.id.startPeriod === period
                    )
                  );

                  const detail = slot?.courseSchedules.find(
                    (s) =>
                      parseInt(s.id.day) === day && s.id.startPeriod === period
                  );

                  if (detail) {
                    const rowSpan =
                      detail.id.endPeriod - detail.id.startPeriod + 1;

                    return (
                      <td
                        key={`cell-${i}-${j}`}
                        rowSpan={rowSpan}
                        className="border px-2 py-1 align-top bg-blue-50 text-left"
                      >
                        <div className="font-semibold break-words">
                          {slot.subjectName}
                        </div>
                        <div className="break-words italic">
                          Phòng {detail.id.room || "-"}
                        </div>
                      </td>
                    );
                  }

                  const isMerged = classSectionList.some((section) =>
                    section.courseSchedules.some(
                      (s) =>
                        parseInt(s.id.day) === day &&
                        s.id.startPeriod < period &&
                        s.id.endPeriod >= period
                    )
                  );

                  return isMerged ? null : (
                    <td key={`empty-${i}-${j}`} className="border px-2 py-1" />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TimetableLecturer;
