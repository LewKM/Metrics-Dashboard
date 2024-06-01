import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import './Home.css'; // Import custom styles for additional enhancements

const HomePage = () => {
    return (
        <div className="homepage">
            <header className="header">
                <Container fluid className="px-0">
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h1 className="heading">Welcome to our Modern Website</h1>
                            <p className="subheading">Discover the latest trends in web design</p>
                            <Button variant="primary" className="btn-lg">Get Started</Button>
                        </Col>
                        <Col md={6} className="d-none d-md-block">
                            <img src="https://via.placeholder.com/500" alt="Modern Website" className="img-fluid animation-slide-right" />
                        </Col>
                    </Row>
                </Container>
            </header>
            <section className="features">
                <Container>
                    <Row>
                        <Col md={4}>
                            <div className="feature">
                                <i className="fas fa-paint-brush"></i>
                                <h3>Stunning Designs</h3>
                                <p>Explore beautiful and creative designs crafted by talented designers.</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="feature">
                                <i className="fas fa-chart-line"></i>
                                <h3>Data-driven Insights</h3>
                                <p>Gain valuable insights and analytics to improve your website performance.</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="feature">
                                <i className="fas fa-mobile-alt"></i>
                                <h3>Responsive</h3>
                                <p>Our designs are fully responsive, ensuring a seamless experience across all devices.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <footer className="footer">
                <Container>
                    <Row>
                        <Col md={6}>
                            <p>&copy; 2024 Modern Website. All rights reserved.</p>
                        </Col>
                        <Col md={6}>
                            <ul className="social-links">
                                <li><a href="/"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="/"><i className="fab fa-facebook"></i></a></li>
                                <li><a href="/"><i className="fab fa-instagram"></i></a></li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};

export default HomePage;
