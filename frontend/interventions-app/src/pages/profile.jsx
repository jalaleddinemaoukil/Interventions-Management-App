import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  //currentuser
  const currentuser = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    setUser(currentuser);

  }, []);

  return (
    <div className="container">
      <h2>Profile</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Created On:</strong> {new Date(user.createdOn).toLocaleDateString()}</p>
          <p><strong>Updated On:</strong> {new Date(user.updatedOn).toLocaleDateString()}</p>
          <button className="btn btn-primary">Edit Profile</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
