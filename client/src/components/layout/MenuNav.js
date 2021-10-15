import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useHistory } from "react-router-dom";
import "./style/menu.nav.css";



const MenuNav = () => {

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
        <div className="nav">
            <ListGroup>
                <ListGroupItem><Button size="sm" block onClick={profile}>Perfil</Button></ListGroupItem>
                <ListGroupItem><Button size="sm" onClick={washes}>Lavados</Button></ListGroupItem>
                <ListGroupItem><Button size="sm" onClick={users}>Mantenedor Usuarios</Button></ListGroupItem>
                <ListGroupItem><Button size="sm" onClick={customers}>Mantenedor Clientes</Button></ListGroupItem>
            </ListGroup>
        </div>
    );
}

export default MenuNav;
