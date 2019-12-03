import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Breadcrumb, Col, Container, Image, ListGroup, Pagination, Row} from "react-bootstrap";

function App() {
    return (
        <div className="App">
            <Container>
                <Row style={{padding: '1em 0'}}>
                    <Col>
                        <h1>Bebej, Jakub - Slovenská štátnosť v rokoch 1939-1945</h1>
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
                    </Col>

                    <Col lg={8}>
                        <Row>
                            <Col>
                                <Image src="https://place-hold.it/820x840" rounded style={{width: '100%'}} />
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
