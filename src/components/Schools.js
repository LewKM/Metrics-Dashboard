import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, Form, Badge, Table } from 'react-bootstrap';
import './Schools.css';

const Schools = () => {
    const [schools, setSchools] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [invoiceFormData, setInvoiceFormData] = useState({
        item: '',
        amount: '',
        dueDate: ''
    });
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [collections, setCollections] = useState([]);
    const [showCollectionsModal, setShowCollectionsModal] = useState(false);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await axios.get('http://localhost:4000/schools');
                setSchools(response.data);
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        };

        fetchSchools();
    }, []);

    const handleSchoolSelect = async (school) => {
        setSelectedSchool(school);
        try {
            const invoicesResponse = await axios.get(`http://localhost:4000/invoices?schoolId=${school.id}`);
            setInvoices(invoicesResponse.data);
            setFilteredInvoices(invoicesResponse.data);
        } catch (error) {
            console.error('Error fetching invoices:', error);
        }
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        resetInvoiceFormData();
    };

    const handleShowAddModal = () => setShowAddModal(true);

    const handleCloseEditModal = () => setShowEditModal(false);

    const handleShowEditModal = (invoice) => {
        setSelectedInvoice(invoice);
        setShowEditModal(true);
    };

    const handleCloseDeleteModal = () => setShowDeleteModal(false);

    const handleShowDeleteModal = (invoice) => {
        setSelectedInvoice(invoice);
        setShowDeleteModal(true);
    };

    const handleInvoiceFormChange = (e) => {
        const { name, value } = e.target;
        setInvoiceFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const resetInvoiceFormData = () => {
        setInvoiceFormData({
            item: '',
            amount: '',
            dueDate: ''
        });
    };

    const handleAddInvoice = async () => {
        try {
            const newInvoice = {
                ...invoiceFormData,
                schoolId: selectedSchool.id
            };
            const response = await axios.post('http://localhost:4000/invoices', newInvoice);
            setInvoices(prevState => [...prevState, response.data]);
            setFilteredInvoices(prevState => [...prevState, response.data]);
            handleCloseAddModal();
        } catch (error) {
            console.error('Error adding invoice:', error);
        }
    };

    const handleEditInvoice = async () => {
        try {
            const updatedInvoice = {
                ...selectedInvoice,
                ...invoiceFormData
            };
            await axios.put(`http://localhost:4000/invoices/${selectedInvoice.id}`, updatedInvoice);
            const updatedInvoices = invoices.map(invoice =>
                invoice.id === selectedInvoice.id ? { ...invoice, ...updatedInvoice } : invoice
            );
            setInvoices(updatedInvoices);
            setFilteredInvoices(updatedInvoices);
            handleCloseEditModal();
        } catch (error) {
            console.error('Error editing invoice:', error);
        }
    };

    const handleDeleteInvoice = async () => {
        try {
            await axios.delete(`http://localhost:4000/invoices/${selectedInvoice.id}`);
            const updatedInvoices = invoices.filter(invoice => invoice.id !== selectedInvoice.id);
            setInvoices(updatedInvoices);
            setFilteredInvoices(updatedInvoices);
            handleCloseDeleteModal();
        } catch (error) {
            console.error('Error deleting invoice:', error);
        }
    };

    const handleFilterInvoices = (status) => {
        if (status === 'All') {
            setFilteredInvoices(invoices);
        } else {
            const filtered = invoices.filter(invoice => invoice.status === status);
            setFilteredInvoices(filtered);
        }
    };

    const handleViewCollections = async (invoiceId) => {
        try {
            const collectionsResponse = await axios.get(`http://localhost:4000/collections?invoiceId=${invoiceId}`);
            setCollections(collectionsResponse.data);
            setShowCollectionsModal(true);
        } catch (error) {
            console.error('Error fetching collections:', error);
       
        }
    };

    return (
        <Container className="mt-5">
            <Col>
                <h1 className="dashboard-heading">Schools Management</h1>
            </Col>
            <Row>
                {schools.map(school => (
                    <Col key={school.id} md={4} sm={6} className="mb-4">
                        <Card className="school-card" onClick={() => handleSchoolSelect(school)}>
                            <Card.Body>
                                <Card.Title>{school.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{school.type}</Card.Subtitle>
                                <Card.Text>Product: {school.product}</Card.Text>
                                <Card.Text>County: {school.county}</Card.Text>
                                <Button variant="primary" onClick={() => handleSchoolSelect(school)}>View Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {selectedSchool && (
                <>
                    <h2 className="mt-5 mb-3">{selectedSchool.name} Invoices</h2>
                    <Row>
                        <Col>
                            <Button variant="primary" onClick={handleShowAddModal}>Add Invoice</Button>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Invoice Item</th>
                                        <th>Creation Date</th>
                                        <th>Due Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInvoices.map((invoice, index) => (
                                        <tr key={invoice.id}>
                                            <td>{index + 1}</td>
                                            <td>{invoice.item}</td>
                                            <td>{invoice.creationDate}</td>
                                            <td>{invoice.dueDate}</td>
                                            <td>${invoice.amount}</td>
                                            <td>
                                                <Badge variant={invoice.status === 'Paid' ? 'success' : 'danger'}>{invoice.status}</Badge>
                                            </td>
                                            <td>
                                                <Button variant="info" size="sm" onClick={() => handleShowEditModal(invoice)}>Edit</Button>{' '}
                                                <Button variant="danger" size="sm" onClick={() => handleShowDeleteModal(invoice)}>Delete</Button>{' '}
                                                <Button variant="secondary" size="sm" onClick={() => handleViewCollections(invoice.id)}>View Collections</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </>
            )}

            {/* Add Invoice Modal */}
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Invoice Item</Form.Label>
                            <Form.Control type="text" name="item" value={invoiceFormData.item} onChange={handleInvoiceFormChange} placeholder="Enter invoice item" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" name="amount" value={invoiceFormData.amount} onChange={handleInvoiceFormChange} placeholder="Enter amount" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type="date" name="dueDate" value={invoiceFormData.dueDate} onChange={handleInvoiceFormChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddInvoice}>
                        Add Invoice
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Invoice Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Invoice Item</Form.Label>
                            <Form.Control type="text" name="item" value={invoiceFormData.item} onChange={handleInvoiceFormChange} placeholder="Enter invoice item" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" name="amount" value={invoiceFormData.amount} onChange={handleInvoiceFormChange} placeholder="Enter amount" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type="date" name="dueDate" value={invoiceFormData.dueDate} onChange={handleInvoiceFormChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditInvoice}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Invoice Modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this invoice?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteInvoice}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Collections Modal */}
            <Modal show={showCollectionsModal} onHide={() => setShowCollectionsModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Collections</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Collection Number</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collections.map((collection, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{collection.collectionNumber}</td>
                                    <td>{collection.date}</td>
                                    <td>{collection.status}</td>
                                    <td>${collection.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCollectionsModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Schools;
