import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import "./style/header.css";


const Header = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    const history = useHistory();

    const profile = () => {
        history.push('/main/profile')
    }
    const washes = () => {
        history.push('/main')
    }
    const users = () => {
        history.push('/main/user-mantainer')
    }
    const customers = () => {
        history.push('/main/customer-mantainer')
    }

    return (
        <div className="head">
            <Navbar color="faded" light>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <NavbarBrand href="/" className="mr-auto">LaundroApp</NavbarBrand>
                <Collapse isOpen={!collapsed} navbar>
                    <div className="asdf">
                        <Nav navbar>
                            <NavItem>
                                <NavLink><Button size="sm" block onClick={profile}>Perfil</Button></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink><Button size="sm" onClick={washes}>Lavados</Button></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink><Button size="sm" onClick={users}>Mantenedor Usuarios</Button></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink><Button size="sm" onClick={customers}>Mantenedor Clientes</Button></NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </Collapse>

            </Navbar>
        </div>
    )
}

export default Header;