import React from "react";
import {Guild} from "../../../models/Guild.model";
import App from "../../../index";
import Dashboard from "../Dashboard";

interface IServerState {
    selectedServer: Guild | null
}

export default class Server extends React.Component<any, IServerState> {

    constructor(props: any) {
        super(props);

        this.state = {
            selectedServer: null
        }
    }

    componentWillMount(): void {
        Dashboard.ensureLoggedIn().then(() => {
            const guildId = this.props.match.params.id;
            if (guildId == null)
                return;
            if (App.instance.state.guilds == null)
                throw "guild id specified but no guilds cached";
            const guild: Guild | null = App.instance.state.guilds.filter(g => g.id == guildId)[0];
            if (guild == null)
                throw "guild could not be found";

            this.setState({
                selectedServer: guild
            });
        }).catch(e => {
            App.instance.redirectTo500();
            throw e;
        });
    }

    render() {
        let server = this.state.selectedServer;
        if (server == null)
            return (<p>Server not found</p>);

        return (
            <div>

            </div>
        )
    }
}
