import { ListGroup, ListGroupItem } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    useHistory,
    Link,
    useRouteMatch
} from "react-router-dom";
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
                <ListGroupItem><button onClick={profile}>Perfil</button></ListGroupItem>
                <ListGroupItem><button onClick={washes}>Lavados</button></ListGroupItem>
                <ListGroupItem><button onClick={users}>Mantenedor Usuarios</button></ListGroupItem>
                <ListGroupItem><button onClick={customers}>Mantenedor Clientes</button></ListGroupItem>
            </ListGroup>
        </div>
    );
}

export default MenuNav;
