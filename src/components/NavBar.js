import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            {!isAuthenticated && (
                <button
                    onClick={() =>
                        loginWithRedirect({})
                    }
                >
                    Log in
        </button>
            )}

            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

            {isAuthenticated && (
                <div className="navbar">
                    <button><Link to="/">Profile</Link></button>
                    <button><Link to="/profile">Profile</Link></button>
                    <button><Link to="/external-api">External API</Link></button>
                </div>
            )}
        </div>
    );
};

export default NavBar;