import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimeSlotCreate from './TimeSlotCreate';
import TimeSlotList from './TimeSlotList';

const TimeSlotComponent = () => {
  const [timeslots, setTimeslots] = useState([]);
  const [editingTimeslot, setEditingTimeslot] = useState(null);

  useEffect(() => {
    axios.get('/api/timeslots/')
      .then((response) => setTimeslots(response.data))
      .catch((error) => console.log(error));
  }, []);

  const addTimeSlot = (timeslot) => {
    axios.post('/api/timeslots/', timeslot)
      .then((response) => setTimeslots([...timeslots, response.data]))
      .catch((error) => console.log(error));
  };

  const editTimeSlot = (timeslot) => {
    setEditingTimeslot(timeslot);
  };

  const updateTimeSlot = (id, updatedTimeslot) => {
    axios.put(`/api/timeslots/${id}/`, updatedTimeslot)
      .then((response) => {
        const updatedList = timeslots.map((timeslot) => {
          if (timeslot.id === response.data.id) {
            return response.data;
          }
          return timeslot;
        });
        setTimeslots(updatedList);
        setEditingTimeslot(null);
      })
      .catch((error) => console.log(error));
  };

  const deleteTimeSlot = (id) => {
    axios.delete(`/api/timeslots/${id}/`)
      .then(() => {
        const updatedList = timeslots.filter((timeslot) => timeslot.id !== id);
        setTimeslots(updatedList);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>Add Time Slot</h2>
      <TimeSlotCreate onSubmit={addTimeSlot} />
      <h2>Time Slots</h2>
      <TimeSlotList
        timeslots={timeslots}
        onEdit={editTimeSlot}
        onDelete={deleteTimeSlot}
      />
    </div>
  );
};

export default TimeSlotComponent;
