import React from "react";
import styles from "./Server.module.css";
import ServerSelector from "./ServerSelector";

export default class Server extends React.Component {
    render() {
        return (
            <div className={styles.servers}>
                <ServerSelector/>
            </div>
        )
    }
}
