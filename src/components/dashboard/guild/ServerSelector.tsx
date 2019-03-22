import React from "react";
import styles from "./ServerSelector.module.css"
import {Guild} from "../../../models/Guild.model";
import App from "../../../index";

interface IServerSelectorStates {
    value: string
}

export default class ServerSelector extends React.Component<{}, IServerSelectorStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: ""
        };
    }

    handleChange = (event: any) => {
        this.setState({value: event.target.value});
        //       this.props.updateMethod(this.state.value);
    };

    render() {
        if (App.instance.state.guilds == null)
            throw "guilds are null!";
        const servers = App.instance.state.guilds.map((s: Guild) =>
            <option value={s.name} key={s.id}>{s.name}</option>
        );

        return (
            <span>
                <h2>Server</h2>
                <select value={this.state.value} onChange={this.handleChange} className={styles.serverSelector}>
                    <option key=""/>
                    {servers}
                </select>
            </span>
        )
    }
}
