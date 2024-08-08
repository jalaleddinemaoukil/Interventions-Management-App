
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import Header from '../components/ui/Header';
import SideNav from '../components/ui/SideNav';
import Footer from '../components/ui/Footer';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

export const Client = () => {
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [interventions, setInterventions] = useState([]);
  const [currentClient, setCurrentClient] = useState(null);
  const [currentIntervention, setCurrentIntervention] = useState(null);
  const navigate = useNavigate();
  const currentuser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (currentuser) {
      fetchClients();
    }
  }, [currentuser]);

  const fetchClients = async () => {
    try {
      const response = await axiosInstance.get('api/clients/clients');
      setClients(response.data.clients);
    } catch (error) {
      console.error(error);
    }
  };


  const handleAddClient = async (client) => {
    try {
      await axiosInstance.post('api/clients/add-client', client);
      fetchClients(); // Refresh client list
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClient = async (client) => {
    try {
      await axiosInstance.put(`api/clients/client/${client._id}`, client);
      fetchClients(); // Refresh client list
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClient = async (clientId) => {
    try {
      await axiosInstance.delete(`api/clients/client/${clientId}`);
      fetchClients(); // Refresh client list
    } catch (error) {
      console.error(error);
    }
  };




  return (
    <>
      <div className='wrapper'>
        <Header />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              {/* Sidebar for managing clients */}
              <div className='sidebar'>
                <h3>Manage Clients</h3>
                <button className='btn btn-primary mb-3' onClick={() => setCurrentClient({})}>Add Client</button>
                {currentClient && (
                  <div>
                    <h4>{currentClient._id ? 'Edit' : 'Add'} Client</h4>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const client = {
                        name: formData.get('name'),
                        address: formData.get('address'),
                        contact: formData.get('contact'),
                      };
                      currentClient._id ? handleEditClient({ ...currentClient, ...client }) : handleAddClient(client);
                      setCurrentClient(null);
                    }}>
                      <div className="mb-3">
                        <label htmlFor="clientName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="clientName" name="name" defaultValue={currentClient?.name || ''} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="clientAddress" className="form-label">Address</label>
                        <input type="text" className="form-control" id="clientAddress" name="address" defaultValue={currentClient?.address || ''} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="clientContact" className="form-label">Contact</label>
                        <input type="text" className="form-control" id="clientContact" name="contact" defaultValue={currentClient?.contact || ''} required />
                      </div>
                      <button type="submit" className="btn btn-primary">{currentClient._id ? 'Save Changes' : 'Add Client'}</button>
                    </form>
                    {currentClient._id && <button className='btn btn-danger mt-2' onClick={() => handleDeleteClient(currentClient._id)}>Delete Client</button>}
                  </div>
                )}
                <h4>Client List</h4>
                <ul className='list-group'>
                  {clients.map(client => (
                    <li key={client._id} className='list-group-item'>
                      {client.name}
                      <button className='btn btn-link' onClick={() => setCurrentClient(client)}>Edit</button>
                    </li>
                  ))}
                </ul>
              </div>


            </div>


          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Client;
