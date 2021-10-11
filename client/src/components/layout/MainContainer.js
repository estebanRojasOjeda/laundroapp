import { Container, Row } from 'reactstrap';
import "./style/main.container.css";
import Header from "./Header";
import MenuNav from "./MenuNav";
import Content from "./Content";

const MainContainer = () => {
    return (
        <Container className="container">
            <Header></Header>
            <MenuNav></MenuNav>
            <Content></Content>
        </Container>
    );
}

export default MainContainer;