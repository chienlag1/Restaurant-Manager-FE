import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Form,
  Card,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminTableScreen = () => {
  const [tables, setTables] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [showModal, setShowModal] = useState(false);
  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const tablesPerPage = 10;

  const token = localStorage.getItem("token");

  // Hàm lấy danh sách bàn
  const fetchTables = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/tables", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTables(response.data.tables);
    } catch (error) {
      console.error("Error fetching tables", error);
    }
  }, [token]);

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  // Xử lý thay đổi input số lượng
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  // Xử lý submit form thêm bàn
  const handleAddTables = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/tables",
        { quantity: Number(quantity) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const newTables = response.data.tables;
      // Nối bàn cũ và bàn mới, sau đó sắp xếp theo tableNumber
      setTables((prevTables) =>
        [...prevTables, ...newTables].sort(
          (a, b) => a.tableNumber - b.tableNumber
        )
      );
      setShowModal(false);
      setQuantity("");
      setCurrentPage(1);
    } catch (error) {
      console.error("Error adding tables", error);
    }
  };

  // Hàm xoá từng bàn với xác nhận có hiển thị số bàn cần xoá
  const handleDeleteTable = async (id, tableNumber) => {
    if (
      window.confirm(`Bạn có chắc chắn muốn xoá bàn số ${tableNumber} không?`)
    ) {
      try {
        await axios.delete(`http://localhost:5000/admin/tables/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTables((prevTables) =>
          prevTables.filter((table) => table._id !== id)
        );
      } catch (error) {
        console.error("Error deleting table", error);
      }
    }
  };

  // Hàm xoá tất cả bàn
  const deleteAllTables = async () => {
    if (window.confirm("Bạn có chắc muốn xoá tất cả các bàn không?")) {
      try {
        await Promise.all(
          tables.map((table) =>
            axios.delete(`http://localhost:5000/admin/tables/${table._id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          )
        );
        setTables([]);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error deleting all tables", error);
      }
    }
  };

  // Phân trang
  const indexOfLastTable = currentPage * tablesPerPage;
  const indexOfFirstTable = indexOfLastTable - tablesPerPage;
  const currentTables = tables.slice(indexOfFirstTable, indexOfLastTable);
  const totalPages = Math.ceil(tables.length / tablesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return (
      <Pagination className="justify-content-center mt-3">{items}</Pagination>
    );
  };

  return (
    <div className="container mt-4">
      <h2>Quản lý Bàn</h2>
      <div className="mb-3">
        <Button
          variant="primary"
          onClick={() => setShowModal(true)}
          className="me-3"
        >
          Thêm Bàn
        </Button>
        <Button variant="danger" onClick={deleteAllTables} className="ml-3">
          Xoá tất cả bàn
        </Button>
      </div>

      {/* Modal nhập số bàn cần thêm */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Bàn Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddTables}>
            <Form.Group controlId="formQuantity">
              <Form.Label>Số bàn muốn thêm</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập số bàn"
                value={quantity}
                onChange={handleQuantityChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Thêm Bàn
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <h3 className="mt-4">Danh sách bàn</h3>
      <div style={{ minHeight: "500px" }}>
        <Row>
          {currentTables.map((table) => (
            <Col key={table._id} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Bàn {table.tableNumber}</Card.Title>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      handleDeleteTable(table._id, table.tableNumber)
                    }
                  >
                    Xoá
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
          {tables.length === 0 && (
            <Col>
              <p>Không có bàn nào</p>
            </Col>
          )}
        </Row>
      </div>

      {totalPages > 1 && renderPagination()}
    </div>
  );
};

export default AdminTableScreen;
