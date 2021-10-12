import CoverPage from './CoverPage';
import Login from './Login';
import "./style/landing.css";

const Landing = () => {
    return (
        <div className="landing">
            <div className="cover-page">
                <CoverPage></CoverPage>
            </div>
            <div className="login">
                <Login></Login>
            </div>
        </div>
    )
}

export default Landing;