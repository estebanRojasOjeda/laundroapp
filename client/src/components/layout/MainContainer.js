import "./style/main.container.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import Header from "./Header";
import MenuNav from "./MenuNav";
import WashList from "../functionalities/WashList";
import UserList from "../functionalities/UserList";
import UserForm from "../functionalities/UserForm";
import CustomerList from "../functionalities/CustomerList";
import CustomerForm from "../functionalities/CustomerForm";
import WashForm from "../functionalities/WashForm";

const MainContainer = () => {


    const { path } = useRouteMatch();

    return (
        <Router>

            <div className="main-container">
                <Header></Header>
                <div className="menu">
                    <MenuNav></MenuNav>
                </div>
                <div className="content">
                    <Switch>
                        <Route exact path={`${path}`}>
                            <WashList></WashList>
                        </Route>
                        <Route path={`${path}/user`}>
                            <UserList></UserList>
                        </Route>
                        <Route path={`${path}/customer`}>
                            <CustomerList></CustomerList>
                        </Route>
                        <Route path={`${path}/new`}>
                            <WashForm></WashForm>
                        </Route>
                        <Route path={`/user/new`}>
                            <UserForm></UserForm>
                        </Route>
                        <Route path={`/customer/new`}>
                            <CustomerForm></CustomerForm>
                        </Route>
                    </Switch>
                </div>
            </div>

        </Router>
    );
}

export default MainContainer;