import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css'; // Import custom styles for additional enhancements

const Dashboard = () => {
    const [collections, setCollections] = useState(0);
    const [signUps, setSignUps] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [bouncedCheques, setBouncedCheques] = useState(0);

    // Sample data for pie chart
    const pieChartData = [
        { name: 'Zeraki Analytics', value: 30 },
        { name: 'Zeraki Finance', value: 20 },
        { name: 'Zeraki Timetable', value: 50 }
    ];

    // Sample data for bar graph
    const barGraphData = [
        { name: 'Primary', 'Zeraki Analytics': 10, 'Zeraki Finance': 15, 'Zeraki Timetable': 20 },
        { name: 'Secondary', 'Zeraki Analytics': 20, 'Zeraki Finance': 10, 'Zeraki Timetable': 15 },
        { name: 'IGCSE', 'Zeraki Analytics': 15, 'Zeraki Finance': 5, 'Zeraki Timetable': 10 }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/dashboard'); // Adjust URL accordingly
                const { collections, signUps, totalRevenue, bouncedCheques } = response.data;
                setCollections(collections);
                setSignUps(signUps);
                setTotalRevenue(totalRevenue);
                setBouncedCheques(bouncedCheques);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container fluid className="sales-dashboard p-4">
            <Row className="mb-4">
            <Col>
    <h1 className="dashboard-heading" style={{ color: 'black' }}>Sales Dashboard</h1>
</Col>

            </Row>
            <Row className="top-card-row mb-4">
                <Col md={3} sm={6} className="mb-4">
                    <Card className="top-card h-100">
                        <Card.Body>
                            <Card.Title>Collections</Card.Title>
                            <Card.Text className="metric-value">{collections}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className="mb-4">
                    <Card className="top-card h-100">
                        <Card.Body>
                            <Card.Title>Sign-ups</Card.Title>
                            <Card.Text className="metric-value">{signUps}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className="mb-4">
                    <Card className="top-card h-100">
                        <Card.Body>
                            <Card.Title>Total Revenue</Card.Title>
                            <Card.Text className="metric-value">{totalRevenue}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className="mb-4">
                    <Card className="top-card h-100">
                        <Card.Body>
                            <Card.Title>Bounced Cheques</Card.Title>
                            <Card.Text className="metric-value">{bouncedCheques}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6} className="mb-4">
                    <Card className="graph-card h-100">
                        <Card.Body>
                            <Card.Title>Targets Visualization (Pie Chart)</Card.Title>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={pieChartData} dataKey="value" nameKey="name" fill="#8884d8" label />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="graph-card h-100">
                        <Card.Body>
                            <Card.Title>Signups Overview (Bar Graph)</Card.Title>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={barGraphData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Zeraki Analytics" fill="#8884d8" />
                                    <Bar dataKey="Zeraki Finance" fill="#82ca9d" />
                                    <Bar dataKey="Zeraki Timetable" fill="#ffc658" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
