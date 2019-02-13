import React from "react";
import Authentication from "../services/Authentication";
import App from "../index";

export default class DiscordCallback extends React.Component {
    componentWillMount() {
        App.instance.setState({
            loaded: false
        });
        Authentication.onOAuthRes();
    }

    render() {
        return false;
    }
}
