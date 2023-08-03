import React, { useState } from 'react';


const TimeSlotAdd = ({ onSubmit }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ startTime, endTime });
    setStartTime('');
    setEndTime('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Start Time:
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </label>
      <label>
        End Time:
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </label>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Time Slot
      </button>
    </form>
  );
};

export default TimeSlotAdd;
