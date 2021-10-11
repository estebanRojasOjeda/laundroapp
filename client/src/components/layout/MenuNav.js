import { ListGroup, ListGroupItem } from 'reactstrap';
import "./style/menu.nav.css";

const MenuNav = (props) => {
    return (
        <div className="nav">
            <ListGroup>
                <ListGroupItem>Perfil</ListGroupItem>
                <ListGroupItem>Lavados</ListGroupItem>
                <ListGroupItem>Mantenedor Usuarios</ListGroupItem>
                <ListGroupItem>Mantenedor Clientes</ListGroupItem>
            </ListGroup>
        </div>

    );
}

export default MenuNav;
