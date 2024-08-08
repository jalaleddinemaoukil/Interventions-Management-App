import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/ui/Header';
import SideNav from '../components/ui/SideNav';
import Footer from '../components/ui/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/css/dashboard.css'; // Custom styles
import axiosInstance from '../utils/axiosInstance'; // Adjust the path if necessary

export const Dashboard = () => {
  const [clientCount, setClientCount] = useState(0);
  const [interventionCount, setInterventionCount] = useState(0);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const clientsResponse = await axiosInstance.get('/api/clients/clients');
        const interventionsResponse = await axiosInstance.get('/api/interventions/interventions');
        setClientCount(clientsResponse.data.clients.length);
        setInterventionCount(interventionsResponse.data.interventions.length);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <Link to="/profile" className="btn btn-sm btn-outline-secondary">Profile</Link>
                  <Link to="/settings" className="btn btn-sm btn-outline-secondary">Settings</Link>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-header">
                    <h4>User Information</h4>
                  </div>
                  <div className="card-body">
                    <p><strong>Name:</strong> {currentUser.fullName}</p>
                    <p><strong>Role:</strong> {currentUser.role}</p>
                    <p><strong>Authorities:</strong> {currentUser.role === 'admin' ? 'Full Access' : 'Limited Access'}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-header">
                    <h4>Statistics</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h5>Total Clients</h5>
                        <p>{clientCount}</p>
                      </div>
                      <div className="col-md-6">
                        <h5>Total Interventions</h5>
                        <p>{interventionCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mb-4">
                  <div className="card-header">
                    <h4>Menu</h4>
                  </div>
                  <div className="card-body">
                    {currentUser.role === 'admin' ? (
                      <div>
                        <h5>Admin Menu</h5>
                        <ul className="list-group">
                          <li className="list-group-item"><Link to="/clients">Clients</Link></li>
                          <li className="list-group-item"><Link to="/users">Users</Link></li>
                          <li className="list-group-item"><Link to="/interventions">Interventions</Link></li>
                        </ul>
                      </div>
                    ) : (
                      <div>
                        <h5>Technician Menu</h5>
                        <ul className="list-group">
                          <li className="list-group-item"><Link to="/interventions">Interventions</Link></li>
                          <li className="list-group-item"><Link to="/clients">Clients</Link></li>

                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
