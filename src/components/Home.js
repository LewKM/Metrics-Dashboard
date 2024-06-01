import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container style={{ marginTop: '50px' }}>
            <Row>
                <Col md={6} className="text-center mb-4 mb-md-0">
                    <h1 className="text-white" style={{ fontSize: '3rem', marginBottom: '30px' }}>Welcome to the Metric Dashboard Website</h1>
                    <p className="text-white" style={{ fontSize: '1.2rem', marginBottom: '20px' }}>This website provides a comprehensive metric dashboard for monitoring and analyzing key performance indicators (KPIs) relevant to your business or organization.</p>
                    <p className="text-white" style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Our dashboard offers real-time insights into various aspects of your operations, allowing you to make data-driven decisions and track your progress towards business goals.</p>
                    <ul className="text-white" style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                        <li>Visual representation of key metrics through charts and graphs.</li>
                        <li>Monitoring of sales, collections, sign-ups, revenue, and other crucial metrics.</li>
                        <li>Customizable dashboard layout to focus on the metrics most relevant to your business.</li>
                        <li>User-friendly interface for easy navigation and interaction with data.</li>
                    </ul>
                    <Button as={Link} to="/dashboard" variant="success" style={{ fontSize: '1.2rem' }}>Go to Dashboard</Button>
                </Col>
                <Col md={6}>
                    <img src="https://via.placeholder.com/400x300" className="img-fluid rounded" alt="Dashboard" style={{ boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)', animation: 'float 5s infinite' }} />
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
