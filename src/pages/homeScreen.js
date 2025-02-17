import React from "react";
import Carousel from "react-bootstrap/Carousel";
import carousel1 from "../assets/carousel1.png";
import aboutus from "../assets/aboutus.png";
import { useState } from "react";
import main1 from "../assets/main1.png";
import main2 from "../assets/main2.png";
import main3 from "../assets/main3.png";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const HomeScreen = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Starters");
  const menuData = {
    Starters: [
      { id: 1, name: "Magnam Tiste", image: main1 },
      { id: 2, name: "Aut Luia", image: main2 },
      { id: 3, name: "Est Eligendi", image: main3 },
    ],
    "Main Courses": [
      { id: 4, name: "Grilled Chicken", image: "main_course1.jpg" },
      { id: 5, name: "Pasta Carbonara", image: "main_course2.jpg" },
      { id: 6, name: "Beef Steak", image: "main_course3.jpg" },
    ],
    Desserts: [
      { id: 10, name: "Chocolate Cake", image: "dessert1.jpg" },
      { id: 11, name: "Cheesecake", image: "dessert2.jpg" },
      { id: 12, name: "Ice Cream", image: "dessert3.jpg" },
    ],
  };
  return (
    <>
      {/* Navigation */}
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top py-3"
        id="mainNav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1030,
          backgroundColor: "white",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="#page-top">
            Hikari Restaurant
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarResponsive"
          >
            <ul className="navbar-nav mx-auto my-2 my-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#menu">
                  Menu
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <button
            type="button"
            class="btn btn-primary"
            onClick={() => navigate("/signin")}
          >
            Book a table
          </button>
        </div>
      </nav>

      {/* Carousel */}
      <div
        style={{
          backgroundColor: "white",
          padding: "40px 0",
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        <Carousel indicators={false} controls={true}>
          <Carousel.Item>
            <img
              className="d-block mx-auto"
              src={carousel1}
              style={{
                height: "600px",
                width: "80%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Chào mừng đến với Hikari Restaurant</h3>
              <p>Trải Nghiệm Ẩm Thực Hoàn Hảo!</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block mx-auto"
              src={carousel1}
              style={{
                height: "600px",
                width: "80%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Chào mừng đến với Hikari Restaurant</h3>
              <p>Trải Nghiệm Ẩm Thực Hoàn Hảo!</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block mx-auto"
              src={carousel1}
              style={{
                height: "600px",
                width: "80%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Chào mừng đến với Hikari Restaurant</h3>
              <p>Trải Nghiệm Ẩm Thực Hoàn Hảo!</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      {/*About Us */}
      <div id="about" className="AboutUs container mt-2 ">
        <div className="text-center mb-4">
          <h5 className="">About Us</h5>
          <h2>Learn More About Us</h2>
        </div>
        <div className="d-flex">
          <div className="left ">
            <img src={aboutus} alt="aboutus" />
          </div>
          <div className="right ms-4">
            <div className="">
              <p>
                ✅ Thực đơn đa dạng, hấp dẫn – Chúng tôi mang đến những món ăn
                tinh tế, kết hợp giữa hương vị truyền thống và hiện đại, được
                chế biến từ nguồn nguyên liệu tươi ngon nhất.
              </p>
              <p>
                ✅ Không gian sang trọng, ấm cúng – Với thiết kế tinh tế, Hikari
                Restaurant tạo nên một không gian hoàn hảo cho những buổi hẹn
                hò, gặp gỡ đối tác hay sum họp gia đình.
              </p>
              <p>
                ✅ Đội ngũ đầu bếp hàng đầu – Mỗi món ăn là một tác phẩm nghệ
                thuật, được chế biến bởi các đầu bếp dày dặn kinh nghiệm, luôn
                đặt tâm huyết vào từng chi tiết.
              </p>
              <p>
                ✅ Dịch vụ chuyên nghiệp, tận tâm – Đội ngũ nhân viên thân
                thiện, sẵn sàng phục vụ, mang đến cho bạn trải nghiệm ẩm thực
                đáng nhớ.
              </p>
            </div>
            <div>
              <p className="text-center">
                🍷 <strong>Đặc biệt hơn</strong>
              </p>
              <p>🌿 Nguyên liệu tươi sạch, đảm bảo an toàn thực phẩm</p>
              <p>🎶 Không gian có nhạc nhẹ, tạo cảm giác thư giãn</p>
              <p>🎂 Nhận đặt tiệc, tổ chức sự kiện, sinh nhật, họp mặt</p>
              <p>
                📍 <strong>Địa chỉ:</strong> [Nhập địa chỉ nhà hàng]
              </p>
              <p>
                📞 <strong>Hotline:</strong> [Nhập số điện thoại]
              </p>
              <p>
                🌐 <strong>Website/Facebook:</strong> [Nhập link]
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*Menu */}
      <div id="menu" className="Menu container mt-5">
        <div className="text-center mb-4">
          <h5 className="">Our Menu</h5>
          <h2>Check Our Yummy Menu</h2>
        </div>

        <div style={styles.menuContainer}>
          <nav style={styles.menuNav}>
            {Object.keys(menuData).map((category) => (
              <button
                key={category}
                style={
                  selectedCategory === category
                    ? styles.activeButton
                    : styles.menuNavButton
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </nav>

          <div className="container">
            <div className="row">
              {menuData[selectedCategory].map((item) => (
                <div key={item.id} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={item.image}
                      className="menuCardImage"
                      alt={item.name}
                      style={{ width: "100%", height: "100%" }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">
                        Some quick example text to describe the dish.
                      </p>
                      <a href="/" className="btn btn-primary">
                        Order Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*Footer */}
      <div
        id="contact"
        className="footer w-100"
        style={{
          backgroundColor: "#111",
          color: "white",
          padding: "40px 0",
          marginTop: "40px",
        }}
      >
        <div className="container text-center text-md-start">
          <div className="row justify-content-center">
            {/* Địa chỉ */}
            <div className="col-md-3 col-6 mb-3">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                <FaMapMarkerAlt size={20} color="red" className="me-2" />
                <h6 style={{ fontWeight: "bold" }}>Address</h6>
              </div>
              <p className="mb-0">123 Đường ABC</p>
              <p>Quận XYZ, TP HCM</p>
            </div>

            {/* Liên hệ */}
            <div className="col-md-3 col-6 mb-3">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                <FaPhoneAlt size={20} color="red" className="me-2" />
                <h6 style={{ fontWeight: "bold" }}>Contact</h6>
              </div>
              <p className="mb-0">Phone: 0987 654 321</p>
              <p>Email: info@hikari.com</p>
            </div>

            {/* Giờ mở cửa */}
            <div className="col-md-3 col-6 mb-3">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                <FaClock size={20} color="red" className="me-2" />
                <h6 style={{ fontWeight: "bold" }}>Opening Hours</h6>
              </div>
              <p className="mb-0">
                <strong>Mon-Sat:</strong> 10:00 AM - 10:00 PM
              </p>
              <p>
                <strong>Sunday:</strong> Closed
              </p>
            </div>

            {/* Mạng xã hội */}
            <div className="col-md-3 col-6 mb-3 text-center text-md-start">
              <h6 style={{ fontWeight: "bold" }}>Follow Us</h6>
              <div className="d-flex justify-content-center justify-content-md-start mt-2">
                <a href="/" className="social-icon me-2">
                  <FaFacebookF size={18} />
                </a>
                <a href="/" className="social-icon me-2">
                  <FaInstagram size={18} />
                </a>
                <a href="/" className="social-icon me-2">
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          <hr style={{ backgroundColor: "white", margin: "20px 0" }} />

          <p className="text-center" style={{ fontSize: "14px" }}>
            © 2025 Hikari Restaurant. All Rights Reserved.
          </p>
        </div>

        {/* CSS cho icon mạng xã hội */}
      </div>
    </>
  );
};

const styles = {
  menuContainer: {
    textAlign: "center",
  },
  menuNavButton: {
    margin: "10px",
    padding: "10px 20px",
    border: "none",

    background: "none",
    fontSize: "18px",
    transition: "all 0.5s ease-in-out",
  },
  activeButton: {
    backgroundColor: "white",
    color: "red",
    border: "none",
  },
  menuItems: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  menuCard: {
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    maxWidth: "220px",
    background: "white",
    textAlign: "center",
    padding: "15px",
    cursor: "pointer",
  },

  menuCardImage: {
    width: "100%",
    height: "200px", // Đặt chiều cao cố định
    objectFit: "cover", // Giữ tỷ lệ ảnh mà không bị méo
  },

  menuCardImageHover: {
    transform: "scale(1.1)",
  },
};

export default HomeScreen;
