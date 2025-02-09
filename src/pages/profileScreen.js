import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import UpdateProfile from "./updateProfileScreen";
import NewPasswordScreen from "./newPasswordScreen";
import EditPasswordScreen from "./editPasswordScreen";

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin"); // Điều hướng đến trang đăng nhập nếu không có user
    } else {
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/users/profile`, // Đường dẫn API chính xác
            {
              headers: {
                Authorization: `Bearer ${user.token}`, // Gửi token xác thực
              },
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
    setProfileData(updatedData); // Cập nhật profileData ngay khi modal lưu thành công
  };

  const handleShowUpdateProfile = () => {
    setModalType("updateProfile"); // Chỉ rõ modal cần hiển thị
    setShowModal(true); // Hiển thị modal
  };

  const handleShowChangePassword = () => {
    setModalType("changePassword"); // Chỉ rõ modal cần hiển thị
    setShowModal(true); // Hiển thị modal
  };

  const handleChangepassword = async (currentPassword, newPassword) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/users/edit-password`, // API for password change
        { password: currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert("Password updated successfully");
      setShowModal(false); // Close modal on success
    } catch (error) {
      console.error("Password change failed", error);
      alert("Password change failed");
    }
  };

  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  if (!profileData) {
    return <p>Loading profile data...</p>;
  }

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
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-right">Profile Settings</h4>
          </div>

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
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="labels">Email</label>
              <input
                type="text"
                className="form-control"
                value={profileData.email}
                disabled
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="labels">Mobile number</label>
              <input
                type="text"
                className="form-control"
                value={profileData.phoneNumber}
                disabled
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="labels">Address</label>
              <input
                type="text"
                className="form-control"
                value={profileData.address}
                disabled
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
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
            <div className="button-container">
              <Button
                variant="primary"
                className="profile-button me-3"
                onClick={handleShowUpdateProfile}
              >
                Update Profile
              </Button>
            </div>
            <div className="button-container">
              <Button
                variant="primary"
                className="profile-button"
                onClick={handleShowChangePassword}
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal component to update profile */}
      {modalType === "updateProfile" && (
        <UpdateProfile
          show={showModal}
          handleClose={() => setShowModal(false)}
          profileData={profileData}
          onProfileUpdate={handleProfileUpdate}
        />
      )}
      {modalType === "changePassword" && (
        <EditPasswordScreen
          show={showModal}
          handleClose={() => setShowModal(false)}
          onResetPassword={handleChangepassword}
        />
      )}
    </div>
  );
};

export default Profile;
