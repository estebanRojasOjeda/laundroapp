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
import Washes from "../functionalities/Washes";
import UserMaintainer from "../functionalities/UserMaintainer";
import CustomerMantainer from "../functionalities/CustomerMantainer";

const MainContainer = () => {


    const { path, url } = useRouteMatch();

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
                            <Washes></Washes>
                        </Route>
                        <Route path={`${path}/profile`}>
                            <Profile></Profile>
                        </Route>
                        <Route path={`${path}/user-mantainer`}>
                            <UserMaintainer></UserMaintainer>
                        </Route>
                        <Route path={`${path}/customer-mantainer`}>
                            <CustomerMantainer></CustomerMantainer>
                        </Route>
                    </Switch>
                </div>
            </div>

        </Router>
    );
}

export default MainContainer;