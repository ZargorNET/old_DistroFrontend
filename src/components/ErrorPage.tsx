import React from "react";
import App from "../index";
import styles from "./ErrorPage.module.css";

export default class ErrorPage extends React.Component {
    componentWillMount(): void {
        App.instance.setState({
            showHeader: false,
            loaded: true
        });
    }

    render(): React.ReactNode {
        return (
            <div className={styles.errorPage}>
                <h2>Whoops! That should not have happened!</h2>
                <p>You can now close this site and try again.</p>
                <p>If the error still occurs, you're welcomed to join our community Discord server for help!</p>
            </div>
        )
    }
}
