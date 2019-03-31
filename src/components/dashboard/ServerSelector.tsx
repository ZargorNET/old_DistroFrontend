import React from "react";
import styles from "./ServerSelector.module.css"
import {Guild} from "../../models/Guild.model";
import App from "../..";


export default class ServerSelector extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }


    private selectServer = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        App.instance.redirect(`/guild/${e.currentTarget.getAttribute("guild-id")}`);
    };

    private getInitialLetterName = (name: string) => {
        let splitted: string[];
        if (name.includes(" "))
            splitted = name.split(" ");
        else
            splitted = [name];

        let output = "";
        splitted.forEach(t => output += t.charAt(0));

        return output;
    };

    render() {
        if (App.instance.state.guilds == null)
            throw "guilds are null!";

        const servers = App.instance.state.guilds.map((s: Guild) => {

            let icon;
            if (s.icon !== "") {
                icon = <img src={s.icon} alt={s.name} className={styles.icon}/>
            } else {
                icon = <p>{this.getInitialLetterName(s.name)}</p>
            }

            return (
                <li key={s.id} guild-id={s.id} onClick={e => this.selectServer(e)}>
                    <div className={styles.container}>
                    <span className={styles.icon}>
                           {icon}
                    </span>
                        <div className={styles.servername}>
                            <p>{s.name}</p>
                        </div>
                    </div>
                </li>)
        });

        return (
            <div className={styles.selector}>
                <h2>Select a guild</h2>
                <br/>
                <ul>
                    {servers}
                </ul>
            </div>
        )
    }
}
