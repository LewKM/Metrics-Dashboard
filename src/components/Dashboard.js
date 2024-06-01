import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const Dashboard = () => {
    // const [schools, setSchools] = useState([]);
    const [collections, setCollections] = useState(0);
    const [signups, setSignups] = useState({
        total: 0,
        breakdown: {
            Analytics: 0,
            Finance: 0,
            Timetable: 0
        }
    });
    const [revenue, setRevenue] = useState({
        total: 0,
        breakdown: {
            Analytics: 0,
            Finance: 0,
            Timetable: 0
        }
    });
    const [bouncedCheques, setBouncedCheques] = useState(0);
    const [upcomingInvoices, setUpcomingInvoices] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {

                const responseCollections = await axios.get('http://localhost:4000/collections');
                setCollections(responseCollections.data.total);

                const responseSignups = await axios.get('http://localhost:4000/signups');
                setSignups(responseSignups.data);

                const responseRevenue = await axios.get('http://localhost:4000/revenue');
                setRevenue(responseRevenue.data);

                const responseBouncedCheques = await axios.get('http://localhost:4000/bouncedCheques');
                setBouncedCheques(responseBouncedCheques.data.total);

                const responseUpcomingInvoices = await axios.get('http://localhost:4000/upcomingInvoices');
                setUpcomingInvoices(responseUpcomingInvoices.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <Container style={{ marginTop: '50px' }}>
            <h1>Schools</h1>
            <Row>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Collections</Card.Title>
                            <Card.Text>{collections}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Sign-ups</Card.Title>
                            <Card.Text>Total: {signups.total}</Card.Text>
                            <Card.Text>Analytics: {signups.breakdown.Analytics}</Card.Text>
                            <Card.Text>Finance: {signups.breakdown.Finance}</Card.Text>
                            <Card.Text>Timetable: {signups.breakdown.Timetable}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total Revenue</Card.Title>
                            <Card.Text>Total: {revenue.total}</Card.Text>
                            <Card.Text>Analytics: {revenue.breakdown.Analytics}</Card.Text>
                            <Card.Text>Finance: {revenue.breakdown.Finance}</Card.Text>
                            <Card.Text>Timetable: {revenue.breakdown.Timetable}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Bounced Cheques</Card.Title>
                            <Card.Text>{bouncedCheques}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Targets Visualization</h2>
                    {/* Add your code for Targets Visualization here */}
                    <PieChart width={400} height={400}>
                        <Pie dataKey="value" data={[]} fill="#8884d8" />
                        <Tooltip />
                    </PieChart>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Signups Overview</h2>
                    {/* Add your code for Signups Overview here */}
                    <BarChart width={500} height={300} data={[]}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Upcoming Invoices</h2>
                    <ul>
                        {upcomingInvoices.map((invoice, index) => (
                            <li key={index}>
                                <div>{invoice.school}</div>
                                <div>Amount Due: {invoice.amount}</div>
                                <div>Due Date: {invoice.dueDate}</div>
                                <div>Quick Actions: {/* Implement quick actions */}</div>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
