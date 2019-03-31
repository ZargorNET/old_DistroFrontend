import React from "react";
import App from "../index";
import styles from "./Header.module.css";
import {LocalUser} from "../models/User.model";
import {Services} from "../services/Service";

interface IHeaderProps {
    user: LocalUser | null
}

class Header extends React.Component<IHeaderProps, {}> {
    constructor(props: IHeaderProps) {
        super(props);
    }

    community = () => {
        window.open(App.COMMUNITY_INVITE_LINK, "JoinUs", "width=600,height=800,status=yes")
    };

    logout = () => {
        Services.AUTHENTICATION_SERVICE.logout();

        App.instance.setState({
            localUser: null,
            jwtToken: null
        });
        App.instance.redirect("/");
    };

    render() {
        return (
            <header className={styles.header}>
                <div className={styles.nav}>
                    <h3 className={styles.logo}><p onClick={(e) => {
                        App.instance.redirect("/");
                        e.preventDefault();
                    }}>Distro</p></h3>
                    <ul className={styles.nav}>
                        {this.props.user != null ? (
                            <li><p onClick={(e) => {
                                App.instance.redirect("/dashboard");
                                e.preventDefault();
                            }} className={styles.fade}>Dashboard</p></li>) : (
                            <li><p onClick={(e) => {
                                Services.AUTHENTICATION_SERVICE.startLoginProcess();
                                e.preventDefault();
                            }}>Login</p></li>
                        )}
                        <li><p onClick={(e) => {
                            App.instance.redirect("/features");
                            e.preventDefault();
                        }} className={styles.fade}>Features</p></li>
                        <li><p className={styles.fade} onClick={(e) => {
                            this.community();
                            e.preventDefault();
                        }}>Community</p></li>
                        <li><p className={styles.fade}>Blog</p></li>
                        {this.props.user != null &&
                        <li><p onClick={(e) => {
                            this.logout();
                            e.preventDefault();
                        }}>Logout</p></li>
                        }
                    </ul>
                </div>
            </header>
        )
    }
}

export default Header;
