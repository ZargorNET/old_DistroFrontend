import React from "react";
import styles from "./Server.module.css";
import ServerSelector from "./ServerSelector";

export default class Server extends React.Component {
    serverSelectUpdate = (server) => {
        alert("dwwd")
    };

    render() {
        return (
            <div className={styles.servers}>
                <ServerSelector servers={["a", "b", "c", "w"]} updateMethod={this.serverSelectUpdate}/>
            </div>
        )
    }
}
