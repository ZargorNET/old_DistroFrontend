import React from "react";
import styles from "./ServerSelector.module.css"

export default class ServerSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
        this.props.updateMethod(this.state.value);
    };

    render() {
        const servers = this.props.servers.map(s =>
            <option value={s} key={s}>{s}</option>
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
