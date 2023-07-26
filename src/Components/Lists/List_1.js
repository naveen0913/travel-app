import React, { useState } from 'react';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <label htmlFor="date-input">Select a Date:</label>
      <input
        id="date-input"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
      {selectedDate && (
        <p>Selected Date: {new Date(selectedDate).toLocaleDateString()}</p>
      )}
    </div>
  );
};

export default DatePicker;
