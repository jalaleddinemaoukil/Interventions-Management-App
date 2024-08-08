import React, { useState } from 'react';

const AddIntervention = () => {
  const [intervention, setIntervention] = useState({
    client: '',
    type: '',
    date: '',
    technician: '',
    status: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIntervention((prevIntervention) => ({ ...prevIntervention, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add intervention submission logic here
  };

  return (
    <div className="container">
      <h2>Add Intervention</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for adding an intervention */}
        <div className="mb-3">
          <label htmlFor="client" className="form-label">Client</label>
          <input
            type="text"
            className="form-control"
            id="client"
            name="client"
            value={intervention.client}
            onChange={handleChange}
            required
          />
        </div>
        {/* Repeat for other fields like type, date, technician, status, description */}
        <button type="submit" className="btn btn-primary">Add Intervention</button>
      </form>
    </div>
  );
};

export default AddIntervention;
