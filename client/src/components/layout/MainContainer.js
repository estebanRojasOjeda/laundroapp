import "./style/main.container.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import Header from "./Header";
import MenuNav from "./MenuNav";
import Profile from "../functionalities/Profile";
import WashList from "../functionalities/WashList";
import UserList from "../functionalities/UserList";
import CustomerList from "../functionalities/CustomerList";
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
                        <Route path={`${path}/profile`}>
                            <Profile></Profile>
                        </Route>
                        <Route path={`${path}/user-mantainer`}>
                            <UserList></UserList>
                        </Route>
                        <Route path={`${path}/customer-mantainer`}>
                            <CustomerList></CustomerList>
                        </Route>
                        <Route exact path={`${path}/new`}>
                            <WashForm></WashForm>
                        </Route>
                    </Switch>
                </div>
            </div>

        </Router>
    );
}

export default MainContainer;