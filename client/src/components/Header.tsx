import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from 'reactstrap';

export interface IHeaderProps {
    title: string;
    headline: string;
}

const Header: React.FC<IHeaderProps> = props => {
    const { headline, title} = props;
    let img2=  'https://cdn.create.vista.com/api/media/small/468642598/stock-vector-electric-scooter-icon-comic-style-bike-cartoon-vector-illustration-white'
    const headerStyle= {
        background: 'url(' + img2 + ')  center center',
        backgroundPosition: 'center',
        minHeight: '350px',
    }

const navigate = useNavigate()
const handleLogOut = () =>[
    navigate('/')
]
    return (
    <header style={headerStyle}>
        <Button className="btn-info mt-4 ml-4" onClick={handleLogOut}>Log Out</Button>
        <Container>
            <Row className="align-items-center text-center">
                <Col>
                    <h1 className="display-4 text-success mt-5 mb-2 font-weight-bold">{title}</h1>
                    <h3 className="mb-5 text- font-weight-bold bg-light">{headline}</h3>
                </Col>
            </Row>
        </Container>
    </header>
    )
}

// Header.defaultProps = {
//     // height: '100%',
    
// }

export default Header;