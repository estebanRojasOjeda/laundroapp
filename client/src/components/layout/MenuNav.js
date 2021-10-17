import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useHistory } from "react-router-dom";
import "./style/menu.nav.css";



const MenuNav = () => {

    const history = useHistory();

  
    const washes = () => {
        history.push('/main')
    }
    const users = () => {
        history.push('/main/user')
    }
    const customers = () => {
        history.push('/main/customer')
    }


    return (
        <div className="nav">
            <ListGroup>
                <ListGroupItem><Button size="sm" onClick={washes}>Lavados</Button></ListGroupItem>
                <ListGroupItem><Button size="sm" onClick={users}>Mantenedor Usuarios</Button></ListGroupItem>
                <ListGroupItem><Button size="sm" onClick={customers}>Mantenedor Clientes</Button></ListGroupItem>
            </ListGroup>
        </div>
    );
}

export default MenuNav;
