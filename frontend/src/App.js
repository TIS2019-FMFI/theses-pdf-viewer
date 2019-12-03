import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "react-bootstrap/Pagination";
import Image from "react-bootstrap/Image";

function App() {
    return (
        <div className="App">
            <Container>
                <Row style={{padding: '1em 0'}}>
                    <Col>
                        <h2>Bebej, Jakub - Slovenská štátnosť v rokoch 1939-1945</h2>
                        <h5>diplomova praca</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">Kniznicny system</Breadcrumb.Item>
                            <Breadcrumb.Item href="#">Slovenská štátnosť v rokoch 1939-1945</Breadcrumb.Item>
                            <Breadcrumb.Item active>Viewer</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <h4>Kapitoly</h4>
                        <ListGroup style={{marginBottom: '1em'}}>
                            <ListGroup.Item active>Introduction</ListGroup.Item>
                            <ListGroup.Item>The origin of Catalan numbersup.</ListGroup.Item>
                            <ListGroup.Item>Various encounters with Catalan numbers</ListGroup.Item>
                            <ListGroup.Item>Hankel matrices (and Catalan numbers)</ListGroup.Item>
                            <ListGroup.Item>Hidden Markov model</ListGroup.Item>
                            <ListGroup.Item>Implementation</ListGroup.Item>
                            <ListGroup.Item>What I found out</ListGroup.Item>
                            <ListGroup.Item>Conclusion</ListGroup.Item>
                        </ListGroup>
                        <h4>Navigacia</h4>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="number" placeholder="cislo strany"/>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Prejst na stranu
                            </Button>
                        </Form>
                    </Col>

                    <Col lg={8}>
                        <Row>
                            <Col>
                                <Image src="https://is.muni.cz/th/rtekt/posudek_oponenta.jpg" rounded style={{width: '100%'}} />
                            </Col>
                        </Row>

                        <Row style={{marginTop: '1em'}}>
                            <Col>
                                <Pagination style={{justifyContent: 'center'}}>
                                    <Pagination.First />
                                    <Pagination.Prev />
                                    <Pagination.Item>{1}</Pagination.Item>
                                    <Pagination.Item>{2}</Pagination.Item>
                                    <Pagination.Item>{3}</Pagination.Item>
                                    <Pagination.Item>{4}</Pagination.Item>
                                    <Pagination.Item>{5}</Pagination.Item>
                                    <Pagination.Next />
                                    <Pagination.Last />
                                </Pagination>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
