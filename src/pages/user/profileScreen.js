import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import UpdateProfile from "./updateProfileScreen";
import EditPasswordScreen from "./editPasswordScreen";

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/users/profile`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
          setProfileData(response.data);
        } catch (error) {
          console.error("Failed to fetch profile data", error);
        }
      };
      fetchProfileData();
    }
  }, [user, navigate]);

  const handleProfileUpdate = (updatedData) => {
    setProfileData(updatedData);
  };

  const handleShowUpdateProfile = () => {
    setModalType("updateProfile");
    setShowModal(true);
  };

  const handleShowEditPassword = () => {
    setModalType("editPassword");
    setShowModal(true);
  };

  if (!user) return <p>Redirecting to login...</p>;
  if (!profileData) return <p>Loading profile data...</p>;

  return (
    <div className="row">
      <div className="col-md-3 border-right">
        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
          <img
            className="rounded-circle mt-5"
            width="150px"
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            alt="Profile"
          />
          <span className="font-weight-bold">{profileData.username}</span>
          <span className="text-black-50">{profileData.email}</span>
        </div>
      </div>
      <div className="col-md-5 border-right">
        <div className="p-3 py-5">
          <h4 className="text-right">Profile Settings</h4>
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="labels">Username</label>
              <input
                type="text"
                className="form-control"
                value={profileData.username}
                disabled
              />
            </div>
            <div className="col-md-12 mt-3">
              <label className="labels">Email</label>
              <input
                type="text"
                className="form-control"
                value={profileData.email}
                disabled
              />
            </div>
            <div className="col-md-12 mt-3">
              <label className="labels">Mobile number</label>
              <input
                type="text"
                className="form-control"
                value={profileData.phoneNumber}
                disabled
              />
            </div>
            <div className="col-md-12 mt-3">
              <label className="labels">Address</label>
              <input
                type="text"
                className="form-control"
                value={profileData.address}
                disabled
              />
            </div>
            <div className="col-md-12 mt-3">
              <label className="labels">Role</label>
              <input
                type="text"
                className="form-control"
                value={profileData.role}
                disabled
              />
            </div>
          </div>
          <div className="mt-5 text-center d-flex">
            <Button
              variant="primary"
              className="me-3"
              onClick={handleShowUpdateProfile}
            >
              Update Profile
            </Button>
            <Button variant="primary" onClick={handleShowEditPassword}>
              Change Password
            </Button>
          </div>
        </div>
      </div>

      {modalType === "updateProfile" && (
        <UpdateProfile
          show={showModal}
          handleClose={() => setShowModal(false)}
          profileData={profileData}
          onProfileUpdate={handleProfileUpdate}
        />
      )}
      {modalType === "editPassword" && (
        <EditPasswordScreen
          show={showModal}
          handleClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Profile;
