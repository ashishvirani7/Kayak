import React,{Component} from 'react';
import { Navbar,Nav,NavItem } from 'react-bootstrap';
import CustomNavbar from './CustomNavbar';

const Background = "https://a1.r9cdn.net/dimg/phoenix-images/v1/phoenix-flights-bg.jpg";
class HomePage extends Component {
    render() {
        return (
            <div className="App">
                <div className="row"  style={{width:'fit',height:'80vh',clip:'1200px 500px 1200px 500px',backgroundImage:'url('+Background+')'}}>
                    <div className="col-md-12">
                        <div className="row" style={{marginLeft:'200px',marginRight:'200px'}}>
                        <CustomNavbar />
                        {/* <Navbar  collapseOnSelect>
                            <Navbar.Header>
                                <Navbar.Brand>
                                <a href="#">Kayak</a>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav>
                                <NavItem eventKey={1} href="#">Hotels</NavItem>
                                <NavItem eventKey={2} href="#">Flights</NavItem>
                                <NavItem eventKey={1} href="#">Cars</NavItem>
                                <NavItem eventKey={2} href="#">More</NavItem>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;