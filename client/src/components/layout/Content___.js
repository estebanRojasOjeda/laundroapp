import { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import Profile from "../functionalities/Profile";
import Washes from "../functionalities/Washes";
import UserMaintainer from "../functionalities/UserMaintainer";
import CustomerMantainer from "../functionalities/CustomerMantainer";
//import "./style/manager.css";
import "./style/content.css";

const Content = () => {
    const { path, url } = useRouteMatch();

    const [pirates, setPirates] = useState([]);

    return (
       /* <Router>
            <Switch>
                <div className="content-func">

                    <Route path={`${path}`}>
                        <Washes></Washes>
                    </Route>
                    <Route exact path={`${path}/profile`}>
                        <Profile></Profile>
                    </Route>
                    <Route path={`${path}/user-mantainer`}>
                        <UserMaintainer></UserMaintainer>
                    </Route>
                    <Route path={`${path}/customer-mantainer`}>
                        <CustomerMantainer></CustomerMantainer>
                    </Route>

                </div>
            </Switch>
        </Router>*/
        <></>
    )
}

export default Content;
