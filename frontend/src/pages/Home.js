import React, { useContext, useEffect } from 'react';
import { Jumbotron } from "react-bootstrap"
import AuthContect from '../context/Auth/AuthContext';

function Home(props) {
    const authContext = useContext(AuthContect);
    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="bg">
            <Jumbotron className="jumb text-center">
                <h1 id="weltxt">Welcom to your Todo list Web App</h1>
                <h2 id="weltxt2">Let's Make List for Yourself</h2>
                <a href="/register" id="welbtn" type="button" className="btn btn-lg btn-outline-primary">Sign Up</a>
            </Jumbotron>
        </div>

    );
}

export default Home;