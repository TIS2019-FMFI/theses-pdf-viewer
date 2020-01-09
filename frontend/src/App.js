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
import Alert from "react-bootstrap/esm/Alert";


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
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (startPage < 0) {
        startPage = 0;
        endPage = 4;
    }
    if (endPage > pages - 1) {
        startPage = pages - 5;
        endPage = pages - 1;
    }

    function* range(start, end) {
        for (let i = start; i <= end; i++) {
            yield i;
        }
    }

    return (<Pagination style={{justifyContent: 'center'}}>
        <Pagination.First onClick={() => goTo(0)}/>
        <Pagination.Prev onClick={() => goTo(currentPage - 1)}/>
        {
            [...range(startPage, endPage)]
                .map(it => {
                    if (it === currentPage) {
                        return <Pagination.Item className={styles.expandPaginationItem} active key={it} onClick={() => goTo(it)}>{it + 1}</Pagination.Item>
                    }
                    return <Pagination.Item className={styles.expandPaginationItem}  key={it} onClick={() => goTo(it)}>{it + 1}</Pagination.Item>;
                })
        }
        <Pagination.Next onClick={() => goTo(currentPage + 1)}/>
        <Pagination.Last onClick={() => goTo(pages - 1)}/>
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
    let [error, setError] = useState(null);

    useEffect(() => {
        const params = queryString.parse(location.search);
        setId(params.id || 'invalid-document');
    }, [location]);

    useEffect(() => {
        (async () => {
            if (id !== null) {
                try {
                    setMetadata(await getMetadata(id));
                    setPage(0);
                } catch (e) {
                    setError(e.message);
                }
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

    const safeSetPage = (page) => setPage(Math.max(0, Math.min(page, metadata.pages - 1)));

    if (error != null) {
        return <div className="App">
            <Container>
                <Alert variant="danger" style={{marginTop: '1em'}}>
                    <Alert.Heading>Jejda! Nastala chyba!</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            </Container>
        </div>
    }

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
                                <Chapters chapters={metadata.chapters} setPageFunction={safeSetPage}/>
                            </ListGroup>
                        </>}

                        <h4>Navigacia</h4>
                        <Row style={{marginTop: '1em'}}>
                            <Col>
                                <DocumentPagination currentPage={page} pages={metadata.pages}
                                                    goTo={(p) => safeSetPage(p)}/>
                            </Col>
                        </Row>

                        <h4>Prejsť na stranu</h4>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="number" placeholder="číslo strany" value={goToPageNumber}
                                          onChange={(ev) => setGoToPageNumber(ev.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={() => {
                            safeSetPage(parseInt(goToPageNumber) -1 || page);
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


                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
