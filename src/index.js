import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, Switch} from 'react-router-dom'
import IndexSite from "./components/IndexSite";
import Header from "./components/Header";
import DiscordCallback from "./components/DiscordCallback";
import axios from "axios";
import history from './history'
import './index.css'
import Authentication from "./services/Authentication";
import NotFound from "./components/NotFound";
import Dashboard from "./components/dashboard/Dashboard";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        App.instance = this;
        App.httpClient = axios.create();
        App.httpClient.defaults.timeout = 2000;

        this.state = {
            loaded: false,
            user: {}
        }
    }

    async componentWillMount() {
        await Authentication.isAuthenticatedAndSetStateIfSo();
        this.setState({
            loaded: true
        })
    }

    render() {
        if (!this.state.loaded)
            return false;
        return (
            <Router history={history}>
                <div>
                    <Header user={this.state.user}/>
                    <main>
                        <Switch>
                            <Route path="/" exact component={IndexSite}/>
                            <Route path="/dashboard" component={Dashboard}/>
                            <Route path="/discordcallback" exact component={DiscordCallback}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </main>
                </div>
            </Router>
        )
    }

    static instance;
    static httpClient;
    static DISCORD_API_ENDPOINT = "https://discordapp.com/api";
    static DISTRO_API_ENDPOINT = "http://localhost:8080";
    static URL = "http://localhost:3000";
    static COMMUNITY_INVITE_LINK = "https://discord.gg/pBV3685";
    static HTTPS = false
}

ReactDOM.render(< App/>, document.getElementById('root'));


