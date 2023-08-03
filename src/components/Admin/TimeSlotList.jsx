import React from 'react';

const TimeSlotList = ({ timeslots, onDelete }) => {
  return (
    <ul>
      {timeslots.map((timeslot) => (
        <li key={timeslot.id}>
          {timeslot.start_time} - {timeslot.end_time}
          <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => onDelete(timeslot.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TimeSlotList;
