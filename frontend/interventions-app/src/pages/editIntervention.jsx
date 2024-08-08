import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditIntervention = () => {
  const { id } = useParams();
  const [intervention, setIntervention] = useState({
    client: '',
    type: '',
    date: '',
    technician: '',
    status: '',
    description: '',
  });

  useEffect(() => {
    // Fetch intervention data by id
    // setIntervention with fetched data
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIntervention((prevIntervention) => ({ ...prevIntervention, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update intervention submission logic here
  };

  return (
    <div className="container">
      <h2>Edit Intervention</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for editing an intervention */}
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
        <button type="submit" className="btn btn-primary">Update Intervention</button>
      </form>
    </div>
  );
};

export default EditIntervention;
