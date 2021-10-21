import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button, NavbarText } from 'reactstrap';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import "./style/header.css";
import { BsFillArrowRightCircleFill } from "react-icons/bs";


const Header = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    const history = useHistory();

    const context = useContext(UserContext);

    const washes = () => {
        history.push('/main')
    }
    const users = () => {
        history.push('/main/user')
    }
    const customers = () => {
        history.push('/main/customer')
    }

    const logOut = () => {
        sessionStorage.removeItem('USER_DATA');
        history.push('/')
    }

    return (
        <div className="head">
            <Navbar color="faded" light>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <NavbarBrand className="mr-auto logo">LaundroApp</NavbarBrand>
                <Collapse isOpen={!collapsed} navbar>
                    <div className="asdf">
                        <Nav navbar>
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
                <NavbarText className="user-name">Hola {context.user?.firstName}!  <BsFillArrowRightCircleFill onClick={logOut}>logOut</BsFillArrowRightCircleFill></NavbarText>
            </Navbar>
        </div>
    )
}

export default Header;