import React from "react";
import Authentication from "../services/Authentication";

import styles from "./IndexSite.module.css";

class IndexSite extends React.Component {
    render() {
        return (
            <div className={styles.info}>
                <h1>It's time to simplify your life.</h1>
                <p>All-in-one bot for moderation and memes that's fully configurable in a pretty web interface.</p>
                <p>What are you waiting for? Let's begin to add the bot to your server!</p>
                <button className={styles.addToDc} onClick={Authentication.login}><i className="fab fa-discord"/> Add to
                    Discord
                </button>
            </div>
        )
    }
}

export default IndexSite;
