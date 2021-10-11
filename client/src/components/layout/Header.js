import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { useState } from 'react';
import "./style/header.css";


const Header = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <div className="head">
            <Navbar color="faded" light>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <NavbarBrand href="/" className="mr-auto">LaundroApp</NavbarBrand>
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="#">Perfil</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Lavado</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Mantenedor Usuarios</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Mantenedor Clientes</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Header;