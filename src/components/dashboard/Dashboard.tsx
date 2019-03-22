import React from "react";
import PersonalData from "./PersonalData";
import App from "../../index";

import styles from "./Dashboard.module.css";
import Server from "./guild/Server";
import {Services} from "../../services/Service";

export default class Dashboard extends React.Component {
    constructor(props: any) {
        super(props);
    }

    async componentWillMount() {
        if (App.instance.state.localUser == null) {
            Services.AUTHENTICATION_SERVICE.tryToGetUserViaCookie().then(user => {
                if (user == null) {
                    Services.AUTHENTICATION_SERVICE.startLoginProcess();
                    return;
                }
                App.instance.setState({
                    localUser: user
                })
            });
        }
    }

    render() {
        if (App.instance.state.localUser == null)
            return false;

        return (
            <div className={styles.dashboard}>
                <div className={styles.user}>
                    <img src={App.instance.state.localUser!.avatar} className={styles.avatar} alt="Avatar"/>
                    <h3>{App.instance.state.localUser!.username.name}<span
                        className={styles.discriminator}>#{App.instance.state.localUser!.username.discriminator}</span>
                    </h3>
                    <PersonalData/>
                </div>
                <Server/>
            </div>
        )
    }
}
