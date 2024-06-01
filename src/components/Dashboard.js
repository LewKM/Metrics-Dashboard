import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Schools = () => {
    const [schools, setSchools] = useState([]);

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

    return (
        <Container style={{ marginTop: '50px' }}> {/* Add top margin to avoid overlap with Navbar */}
            <h1>Schools</h1>
            <Row>
                {schools.map(school => (
                    <Col key={school.id} md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{school.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{school.type}</Card.Subtitle>
                                <Card.Text>Product: {school.product}</Card.Text>
                                <Card.Text>County: {school.county}</Card.Text>
                                {/* Add more details as needed */}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Schools;
