import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import moment from "moment/moment";

const Profile = () => {
    const { loading, user } = useAuth0();
    console.log(user)

    if (loading || !user) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <Fragment>
            <img src={user.picture} alt="Profile" />

            <h2>{user.name}</h2>
            <p>{user.email}</p>
            {moment().format('MMMM Do YYYY, h:mm:ss a')}
        </Fragment>
    );
};

export default Profile;