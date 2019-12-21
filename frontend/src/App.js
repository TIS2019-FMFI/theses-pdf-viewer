import React, {useEffect, useState} from 'react';
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
import {documentTypeName, getMetadata, getPage} from "./api";
import Spinner from "react-bootstrap/Spinner";
import styles from './App.module.css';
import {useLocation} from "./hooks";
import queryString from 'query-string';


/**
 * Renders list of chapters of the document.
 */
function Chapters({chapters, setPageFunction}) {
    return chapters.map(it => {
        return <ListGroup.Item action key={it.name}
                               onClick={() => setPageFunction(it.pages[0])}>{it.name}</ListGroup.Item>
    })
}

/**
 * Renders pagination of the document.
 */
function DocumentPagination({pages, currentPage, goTo}) {
    return (<Pagination style={{justifyContent: 'center'}}>
        <Pagination.First onClick={() => goTo(0)}/>
        <Pagination.Prev onClick={() => goTo(currentPage - 1)}/>
        {[...Array(5).keys()]
            .map(it => currentPage + (it - 2))
            .filter(it => it > 0 && it < pages)
            .map(it => <Pagination.Item key={it} onClick={() => goTo(it)}>{it}</Pagination.Item>)
        }
        <Pagination.Next onClick={() => goTo(currentPage + 1)}/>
        <Pagination.Last onClick={() => goTo(pages)}/>
    </Pagination>)
}

/**
 * Renders loading while image is loading and then renders the image in non-copiable way.
 */
function LoadingImage({src}) {
    const [loading, setLoading] = useState(true);
    const [prevSrc, setPrevSrc] = useState(null);

    if (prevSrc !== src) {
        setLoading(true);
        setPrevSrc(src);
    }

    return (
        <>
            <div className={styles.imageLoading} style={{display: loading ? 'flex' : 'none'}}>
                <Spinner animation="border"/>
            </div>
            <div style={{display: loading ? 'none' : 'block'}}>
                <Image className={styles.blockInteraction}
                       src={src}
                       rounded
                       style={{width: '100%'}}
                       onLoad={() => setLoading(false)}
                />
                <div className={styles.blocker}/>
            </div>
        </>
    );
}

/**
 * Renders whole viewer application.
 */
function App() {
    let location = useLocation();
    let [id, setId] = useState(null);
    let [metadata, setMetadata] = useState(null);
    let [page, setPage] = useState(0);
    let [pageUrl, setPageUrl] = useState(null);
    let [goToPageNumber, setGoToPageNumber] = useState("");

    useEffect(() => {
        const params = queryString.parse(location.search);
        setId(params.id || 'invalid-document');
    }, [location]);

    useEffect(() => {
        (async () => {
            if (id !== null) {
                setMetadata(await getMetadata(id));
                setPage(0);
            }
        })();
    }, [id]);

    useEffect(() => {
        (async () => {
            if (id !== null) {
                setPageUrl(await getPage(id, page));
            }
        })();
    }, [id, page]);

    if (metadata == null) {
        return <Spinner animation="border"/>
    }

    return (
        <div className="App">
            <Container>
                <Row style={{padding: '1em 0'}}>
                    <Col>
                        <h2>{metadata.author} - {metadata.title}</h2>
                        <h5>{documentTypeName(metadata.type)}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">Kniznicny system</Breadcrumb.Item>
                            <Breadcrumb.Item href="#">{metadata.title}</Breadcrumb.Item>
                            <Breadcrumb.Item active>Viewer</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        {metadata.chapters && <>
                            <h4>Kapitoly</h4>
                            <ListGroup style={{marginBottom: '1em'}}>
                                <Chapters chapters={metadata.chapters} setPageFunction={setPage}/>
                            </ListGroup>
                        </>}
                        <h4>Navigacia</h4>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="number" placeholder="cislo strany" value={goToPageNumber}
                                          onChange={(ev) => setGoToPageNumber(ev.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={() => {
                            setPage(parseInt(goToPageNumber));
                            setGoToPageNumber("");
                        }}>
                            Prejst na stranu
                        </Button>
                    </Col>

                    <Col lg={8}>
                        <Row>
                            <Col>
                                <LoadingImage src={pageUrl}/>
                            </Col>
                        </Row>

                        <Row style={{marginTop: '1em'}}>
                            <Col>
                                <DocumentPagination currentPage={page} pages={metadata.pages} goTo={(p) => setPage(p)}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
