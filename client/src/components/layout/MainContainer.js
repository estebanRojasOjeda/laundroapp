import "./style/main.container.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";

import MenuNav from "./MenuNav";
import WashList from "../functionalities/WashList";
import UserList from "../functionalities/UserList";
import UserForm from "../functionalities/UserForm";
import CustomerList from "../functionalities/CustomerList";
import CustomerForm from "../functionalities/CustomerForm";
import WashForm from "../functionalities/WashForm";
import Dashboard from "../functionalities/Dashboard";
import PdfDocument from "../functionalities/PdfDocument";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const MainContainer = () => {

    const { path } = useRouteMatch();

    const context = useContext(UserContext);

    const history = useHistory();

    useEffect(()=>{
        if(sessionStorage.getItem('USER_DATA')){
            context.setUser(JSON.parse(sessionStorage.getItem('USER_DATA')));
        }else{
            history.push('/');
        }
    }, [])

    return (
        <Router>

            <div className="main-container">
                
                <div className="menu">
                    <MenuNav></MenuNav>
                </div>
                <div className="content">
                    <Switch>
                        <Route exact path={`${path}`}>
                            <WashList></WashList>
                        </Route>
                        <Route exact path={`${path}/document`}>
                            <PdfDocument></PdfDocument>
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
                            <UserForm new={true}></UserForm>
                        </Route>
                        <Route path={`/user/edit/:id`}>
                            <UserForm edit={true}></UserForm>
                        </Route>
                        <Route path={`/customer/new`}>
                            <CustomerForm new={true}></CustomerForm>
                        </Route>
                        <Route path={`/customer/edit/:id`}>
                            <CustomerForm edit={true}></CustomerForm>
                        </Route>
                        <Route path={`/dashboard`}>
                            <Dashboard></Dashboard>
                        </Route>
                    </Switch>
                </div>
            </div>

        </Router>
    );
}

export default MainContainer;