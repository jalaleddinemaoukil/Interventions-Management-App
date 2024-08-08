import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/css/dashboard.css'; // Custom styles

export const Intervention = () => {
  const [clients, setClients] = useState([]);
  const [user, setUser] = useState([]);
  const [interventions, setInterventions] = useState([]);
  const [currentIntervention, setCurrentIntervention] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (currentUser) {
      fetchClients();
     // fetchUser();
      //fetchInterventions();
    }
  }, [currentUser]);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get('/api/users/user');
      setUser(response.data.user);
    } catch (error) {
      setError('Failed to fetch user.');
      console.error(error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axiosInstance.get('/api/clients/clients');
      setClients(response.data.clients);
    } catch (error) {
      setError('Failed to fetch clients.');
      console.error(error);
    }
  };

  const fetchInterventions = async () => {
    try {
      const response = await axiosInstance.get('/api/interventions/interventions');
      setInterventions(response.data.interventions);
    } catch (error) {
      setError('Failed to fetch interventions.');
      console.error(error);
    }
  };

  const handleAddIntervention = async (intervention) => {
    try {
      await axiosInstance.post('/api/interventions/add-intervention', intervention);
      fetchInterventions(); // Refresh intervention list
    } catch (error) {
      setError('Failed to add intervention.');
      console.error(error);
    }
  };

  const handleEditIntervention = async (intervention) => {
    try {
      await axiosInstance.put(`/api/interventions/interventions/${intervention._id}`, intervention);
      fetchInterventions(); // Refresh intervention list
    } catch (error) {
      setError('Failed to edit intervention.');
      console.error(error);
    }
  };

  const handleDeleteIntervention = async (interventionId) => {
    try {
      await axiosInstance.delete(`/api/interventions/interventions/${interventionId}`);
      fetchInterventions(); // Refresh intervention list
    } catch (error) {
      setError('Failed to delete intervention.');
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>
                <h3>Manage Interventions</h3>
                <button className='btn btn-primary mb-3' onClick={() => setCurrentIntervention({})}>Add Intervention</button>
                {error && <div className='alert alert-danger'>{error}</div>}
              </div>
              <div className='card-body'>
                {currentIntervention && (
                  <div>
                    <h4>{currentIntervention._id ? 'Edit' : 'Add'} Intervention</h4>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const intervention = {
                        client: formData.get('client'),
                        type: formData.get('type'),
                        date: new Date(formData.get('date')),
                        technician: currentUser.id, // Assuming technician is the current user
                        status: formData.get('status'),
                        description: formData.get('description'),

                      };
                      currentIntervention._id ? handleEditIntervention({ ...currentIntervention, ...intervention }) : handleAddIntervention(intervention);
                      setCurrentIntervention(null);
                    }}>
                      <div className="mb-3">
                        <label htmlFor="interventionClient" className="form-label">Client</label>
                        <select className="form-control" id="interventionClient" name="client" defaultValue={currentIntervention?.client || ''} required>
                          <option value="">Select a client</option>
                          {clients.map(client => (
                            <option key={client._id} value={client._id}>{client.name}</option>
                          ))}
                        </select>

                      </div>
                      <div className="mb-3">
                        <label htmlFor="interventionType" className="form-label">Type</label>
                        <input type="text" className="form-control" id="interventionType" name="type" defaultValue={currentIntervention?.type || ''} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="interventionDate" className="form-label">Date</label>
                        <input type="date" className="form-control" id="interventionDate" name="date" defaultValue={currentIntervention?.date ? new Date(currentIntervention.date).toISOString().split('T')[0] : ''} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="interventionStatus" className="form-label">Status</label>
                        <select className="form-control" id="interventionStatus" name="status" defaultValue={currentIntervention?.status || ''} required>
                          <option value="planned">Planned</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="interventionDescription" className="form-label">Description</label>
                        <textarea className="form-control" id="interventionDescription" name="description" defaultValue={currentIntervention?.description || ''} required></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary">{currentIntervention._id ? 'Save Changes' : 'Add Intervention'}</button>
                      {currentIntervention._id && <button className='btn btn-danger mt-2' onClick={() => handleDeleteIntervention(currentIntervention._id)}>Delete Intervention</button>}
                    </form>
                  </div>
                )}
                <h4>Intervention List</h4>
                <ul className='list-group'>
                  {interventions.map(intervention => (
                    <li key={intervention._id} className='list-group-item'>
                      {intervention.type}
                      <button className='btn btn-link' onClick={() => setCurrentIntervention(intervention)}>Edit</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Intervention;
