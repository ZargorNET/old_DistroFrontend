import React from "react";
import App from "../..";
import history from "../../history"
import FullscreenSpinner from "../FullscreenSpinner";
import {Services} from "../../services/Service";

export default class DiscordCallback extends React.Component {
    componentWillMount() {
        App.instance.setState({
            showHeader: false
        });
        Services.AUTHENTICATION_SERVICE.getJwtTokenByOAuthResponse().then(async jwt => {
            await Services.AUTHENTICATION_SERVICE.saveJwtTokenToCookie(jwt);
            await App.instance.setState({
                jwtToken: jwt
            });
            await Services.USER_SERVICE.getLocalUser().then(user => {
                App.instance.setState({
                    localUser: user
                });
            });
            App.instance.redirect("/dashboard");
            history.length = 1;

            App.instance.setState({
                showHeader: true
            });
        });
    }

    render() {
        return <FullscreenSpinner/>
    }
}
