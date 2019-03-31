import React from "react";
import PersonalData from "./PersonalData";
import App from "../../index";

import styles from "./Dashboard.module.css";
import {Services} from "../../services/Service";
import ServerSelector from "./ServerSelector";

export default class Dashboard extends React.Component<any, {}> {
    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        Dashboard.ensureLoggedIn().catch(e => {
            App.instance.redirectTo500();
            throw e;
        });
    }

    render() {
        if (App.instance.state.localUser == null || App.instance.state.guilds == null)
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
                <span className={styles.servers}>
                       <ServerSelector/>
                </span>
            </div>
        )
    }

    public static async ensureLoggedIn() {
        App.instance.setState({
            loaded: false
        });

        if (App.instance.state.localUser == null) {
            App.instance.redirect("/");
            App.instance.setState({
                loaded: true
            });
            return
        }

        if (App.instance.state.guilds == null) {
            await Services.GUILD_SERVICE.getAll().then(guilds => {
                App.instance.setState({
                    guilds: guilds
                });
            }).catch(e => {
                throw e;
            })
        }

        App.instance.setState({
            loaded: true
        });
    }
}
