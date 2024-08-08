import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No token found, please login.");
                    return;
                }

                const response = await axios.get("/get-user", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUser(response.data.user);
            } catch (err) {
                setError("Failed to fetch user data.");
            }
        };

        fetchUser();
    }, []);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Welcome, {user.fullName}</h1>
            {user.role === "admin" ? (
                <div className="admin-menu">
                    <h2>Admin Menu</h2>
                    <ul>
                        <li><a href="/clients">Manage Clients</a></li>
                        <li><a href="/users">Manage Users</a></li>
                        <li><a href="/interventions">Manage Interventions</a></li>
                    </ul>
                </div>
            ) : (
                <div className="user-menu">
                    <h2>User Menu</h2>
                    <ul>
                        <li><a href="/interventions">View Interventions</a></li>
                        <li><a href="/interventions/add">Add Intervention</a></li>
                        <li><a href="/interventions/update">Update Intervention</a></li>
                        <li><a href="/interventions/delete">Delete Intervention</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;
