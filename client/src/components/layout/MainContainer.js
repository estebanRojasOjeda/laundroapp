import "./style/main.container.css";
import Header from "./Header";
import MenuNav from "./MenuNav";
import Content from "./Content";

const MainContainer = () => {
    return (
        <div className="main-container">
            <Header></Header>
            <div className="menu">
            <MenuNav></MenuNav>
            </div>
            <div className="content">
            <Content></Content>
            </div>
        </div>
    );
}

export default MainContainer;