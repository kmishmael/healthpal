import React, { useState } from 'react';
//import { useAuth } from '../context/AuthContext'; // You can replace this with your authentication context

const ProfilePage: React.FC = () => {
  const user = {name: 'Kibet Ismael',email: 'kmishmael@gmail.com', profilePicture: '', weight: 90, height: 90, goals: 2000};
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    profilePicture: user.profilePicture,
    weight: user.weight,
    height: user.height,
    goals: user.goals,
    newPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    // Call API to update user profile
   // await updateUserProfile(formData);
    setEditing(false);
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account?');
    if (confirmed) {
      // Call API to delete user account
      //await deleteUserAccount();
      //logout(); // Log the user out after deleting the account
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4">
      <h2 className="text-3xl font-semibold mb-4">My Profile</h2>

      <div className="flex items-center mb-4">
        <img
          src={formData.profilePicture}
          alt="Profile"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <p className="text-xl font-semibold">{formData.name}</p>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          readOnly={!editing}
          className="form-input"
        />
      </div>

      {/* Add similar input fields for other profile information (weight, height, goals) */}

      {editing && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
      )}

      <div className="flex justify-end">
        {!editing ? (
          <button onClick={handleEditClick} className="btn-primary mr-2">
            Edit
          </button>
        ) : (
          <>
            <button onClick={handleSaveClick} className="btn-primary mr-2">
              Save
            </button>
            <button onClick={() => setEditing(false)} className="btn-secondary">
              Cancel
            </button>
          </>
        )}
      </div>

      <div className="mt-8">
        <button onClick={handleDeleteAccount} className="btn-danger">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
