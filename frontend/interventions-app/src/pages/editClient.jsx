import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState({ name: '', address: '', contact: '' });

  useEffect(() => {
    // Fetch client data by id
    // setClient with fetched data
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({ ...prevClient, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update client submission logic here
  };

  return (
    <div className="container">
      <h2>Edit Client</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={client.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={client.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">Contact</label>
          <input
            type="text"
            className="form-control"
            id="contact"
            name="contact"
            value={client.contact}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Client</button>
      </form>
    </div>
  );
};

export default EditClient;
