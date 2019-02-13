import React from "react";
import Authentication from "../../services/Authentication";
import PersonalData from "./PersonalData";
import App from "../../index";

import styles from "./Dashboard.module.css";

export default class Dashboard extends React.Component {
    constructor(props: any) {
        super(props);
    }

    async componentWillMount() {
        if (!await Authentication.isAuthenticatedAndSetStateIfSo())
            Authentication.login();
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
                {/*<Server/>*/}
            </div>
        )
    }
}
