import React from "react";
import styles from './Header.module.css'
import Authentication from "../services/Authentication";
import App from "../index.js";
import history from '../history'


class Header extends React.Component {
    community = () => {
        window.open(App.COMMUNITY_INVITE_LINK, "JoinUs", "width=600,height=800,status=yes")
    };

    render() {
        return (
            <header className={styles.header}>
                <div className={styles.nav}>
                    <h3 className={styles.logo}><p onClick={(e) => {
                        history.push("/");
                        e.preventDefault();
                    }}>Distro</p></h3>
                    <ul className={styles.nav}>
                        {this.props.user.id != null ? (
                            <li><p onClick={(e) => {
                                history.push("/dashboard");
                                e.preventDefault();
                            }} className={styles.fade}>Dashboard</p></li>) : (
                            <li><p onClick={(e) => {
                                Authentication.login();
                                e.preventDefault();
                            }}>Login</p></li>
                        )}
                        <li><p onClick={(e) => {
                            history.push("/features");
                            e.preventDefault();
                        }} className={styles.fade}>Features</p></li>
                        <li><p className={styles.fade} onClick={(e) => {
                            this.community();
                            e.preventDefault();
                        }}>Community</p></li>
                        <li><p className={styles.fade}>Blog</p></li>
                        {this.props.user.id != null &&
                        <li><p onClick={(e) => {
                            Authentication.logout();
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
