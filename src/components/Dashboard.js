import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
const [data, setData] = useState(null);

useEffect(() => {
    // Fetch data from JSON db
    fetch('/path-to-your-json-db')
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error('Error fetching data:', error));
}, []);

if (!data) return <div>Loading...</div>;

// Extract data for different sections
const { collections, signUps, totalRevenue, bouncedCheques, invoices } = data;

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Calculate metrics
const totalCollections = collections.filter(c => c.status === 'valid').length;
const totalSignups = signUps.length;
const totalRevenueAmount = totalRevenue.reduce((acc, item) => acc + item.amount, 0);
const totalBouncedCheques = bouncedCheques.length;

// Group signups by product
const signupsByProduct = signUps.reduce((acc, signup) => {
    acc[signup.product] = (acc[signup.product] || 0) + 1;
    return acc;
}, {});

// Group revenue by product
const revenueByProduct = totalRevenue.reduce((acc, revenue) => {
    acc[revenue.product] = (acc[revenue.product] || 0) + revenue.amount;
    return acc;
}, {});

// Group signups by school type and product
const signupsBySchoolType = signUps.reduce((acc, signup) => {
    const school = data.schools.find(school => school.id === signup.schoolId);
    if (school) {
    acc[signup.product] = acc[signup.product] || {};
    acc[signup.product][school.type] = (acc[signup.product][school.type] || 0) + 1;
    }
    return acc;
}, {});

const signupBarData = Object.entries(signupsBySchoolType).map(([product, types]) => {
    return {
    product,
    Primary: types.Primary || 0,
    Secondary: types.Secondary || 0,
    IGCSE: types.IGCSE || 0
    };
});

// Calculate targets for pie charts
const targets = [
    { product: 'Zeraki Analytics', target: 50, achieved: signupsByProduct['Zeraki Analytics'] || 0 },
    { product: 'Zeraki Finance', target: 50, achieved: signupsByProduct['Zeraki Finance'] || 0 },
    { product: 'Zeraki Timetable', target: 50, achieved: signupsByProduct['Zeraki Timetable'] || 0 }
];

return (
    <Container fluid>
    <Row className="mb-4">
        <Col>
        <h1>Sales Agent Dashboard</h1>
        </Col>
    </Row>

    {/* Top Card Metrics */}
    <Row className="mb-4">
        <Col md={3}>
        <Card>
            <Card.Body>
            <Card.Title>Collections</Card.Title>
            <Card.Text>{totalCollections}</Card.Text>
            </Card.Body>
        </Card>
        </Col>
        <Col md={3}>
        <Card>
            <Card.Body>
            <Card.Title>Sign-ups</Card.Title>
            <Card.Text>{totalSignups}</Card.Text>
            <ListGroup variant="flush">
                {Object.entries(signupsByProduct).map(([product, count]) => (
                <ListGroup.Item key={product}>{product}: {count}</ListGroup.Item>
                ))}
            </ListGroup>
            </Card.Body>
        </Card>
        </Col>
        <Col md={3}>
        <Card>
            <Card.Body>
            <Card.Title>Total Revenue</Card.Title>
            <Card.Text>${totalRevenueAmount}</Card.Text>
            <ListGroup variant="flush">
                {Object.entries(revenueByProduct).map(([product, amount]) => (
                <ListGroup.Item key={product}>{product}: ${amount}</ListGroup.Item>
                ))}
            </ListGroup>
            </Card.Body>
        </Card>
        </Col>
        <Col md={3}>
        <Card>
            <Card.Body>
            <Card.Title>Bounced Cheques</Card.Title>
            <Card.Text>{totalBouncedCheques}</Card.Text>
            </Card.Body>
        </Card>
        </Col>
    </Row>

    {/* Targets Visualization */}
    <Row className="mb-4">
        {targets.map(target => (
        <Col md={4} key={target.product}>
            <Card>
            <Card.Body>
                <Card.Title>{target.product} Signups</Card.Title>
                <PieChart width={400} height={400}>
                <Pie
                    data={[
                    { name: 'Target Achieved', value: target.achieved },
                    { name: 'Target Remaining', value: target.target - target.achieved }
                    ]}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {[
                    { name: 'Target Achieved', value: target.achieved },
                    { name: 'Target Remaining', value: target.target - target.achieved }
                    ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                </PieChart>
            </Card.Body>
            </Card>
        </Col>
        ))}
    </Row>

    {/* Signups Overview */}
    <Row className="mb-4">
        {signupBarData.map(productData => (
        <Col md={4} key={productData.product}>
            <Card>
            <Card.Body>
                <Card.Title>{productData.product} Signups</Card.Title>
                <BarChart
                width={400}
                height={300}
                data={[productData]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Primary" fill="#8884d8" />
                <Bar dataKey="Secondary" fill="#82ca9d" />
                <Bar dataKey="IGCSE" fill="#ffc658" />
                </BarChart>
            </Card.Body>
            </Card>
        </Col>
        ))}
    </Row>

    {/* Upcoming Invoices */}
    <Row className="mb-4">
        <Col>
        <Card>
            <Card.Body>
            <Card.Title>Upcoming Invoices</Card.Title>
            <ListGroup variant="flush">
                {invoices.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).map(invoice => {
                const school = data.schools.find(school => school.id === invoice.schoolId);
                return (
                    <ListGroup.Item key={invoice.id}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                        <strong>{school.name}</strong>
                        <div>Amount Due: ${invoice.amount}</div>
                        <div>Due Date: {invoice.dueDate}</div>
                        </div>
                        <Button variant="primary" onClick={() => handleCollectPayment(invoice)}>Collect Payment</Button>
                    </div>
                    </ListGroup.Item>
                );
                })}
            </ListGroup>
            </Card.Body>
        </Card>
        </Col>
    </Row>
    </Container>
);
};

const handleCollectPayment = (invoice) => {
// Handle payment collection logic here
alert(`Collecting payment for invoice: ${invoice.id}`);
};

export default Dashboard;
