import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

const AdminProfileScreen = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [image, setImage] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/admin/profile`, // API endpoint lấy thông tin admin
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
          setProfileData(response.data);
          setAvatarUrl(response.data.avatar || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"); // Default avatar if none exists
        } catch (error) {
          console.error("Failed to fetch profile data", error);
        }
      };
      fetchProfileData();
    }
  }, [user, navigate]);

  // Xử lý khi người dùng chọn ảnh
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
    }
  };

  // Upload avatar image for the admin
  const uploadImage = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("profile-image", image);

      try {
        const response = await axios.post(
          "http://localhost:5000/admin/upload-avatar-admin", // Endpoint upload ảnh avatar
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        // Cập nhật avatar mới
        setAvatarUrl(response.data.avatarUrl);

        // Lấy lại dữ liệu admin mới
        const updatedProfileData = await axios.get("http://localhost:5000/admin/profile", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setProfileData(updatedProfileData.data); // Cập nhật lại dữ liệu admin
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  if (!user) return <p>Redirecting to login...</p>;
  if (!profileData) return <p>Loading profile data...</p>;

  return (
    <div className="row">
      <div className="col-md-3 border-right">
        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
          <img
            className="rounded-circle mt-5"
            width="200px"
            height="250px"
            src={`http://localhost:5000${avatarUrl}`} // Hiển thị avatar từ backend
            alt="Profile"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} // Lắng nghe sự kiện chọn ảnh
            id="file-input"
            className="d-none" // Ẩn input file đi
          />
          <Button
            variant="outline-secondary"
            onClick={() => document.getElementById("file-input").click()} // Kích hoạt input file khi click vào nút
          >
            Choose file
          </Button>
          <span>{image ? image.name : "No file chosen"}</span>
          <Button
            variant="primary"
            className="mt-2"
            onClick={uploadImage} // Xử lý upload ảnh
            disabled={!image} // Disable nút nếu không có file
          >
            Upload
          </Button>
        </div>
      </div>
      <div className="col-md-5 border-right">
        <div className="p-3 py-5">
          <h4 className="text-right">Admin Profile Settings</h4>
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
              <label className="labels">Role</label>
              <input
                type="text"
                className="form-control"
                value={profileData.role}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileScreen;
