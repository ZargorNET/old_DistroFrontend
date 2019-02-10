import React from "react";
import Authentication from "../../services/Authentication";
import App from "../../index.js"
import styles from "./Dashboard.module.css"
import PersonalData from "./PersonalData";
import Server from "./server/Server";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentWillMount() {
        if (!await Authentication.isAuthenticatedAndSetStateIfSo())
            Authentication.login();
    }

    render() {
        if (App.instance.state.user.id == null)
            return false;

        return (
            <div className={styles.dashboard}>
                <div className={styles.user}>
                    <img src={App.instance.state.user.avatar} className={styles.avatar} alt="Avatar"/>
                    <h3>{App.instance.state.user.username.name}<span
                        className={styles.discriminator}>#{App.instance.state.user.username.discriminator}</span></h3>
                    <PersonalData/>
                </div>
                <Server/>
            </div>
        )
    }
}
