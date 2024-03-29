import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, Switch} from 'react-router-dom';
import IndexSite from "./components/IndexSite";
import Header from "./components/Header";
import history from './history'
import './index.css'
import NotFound from "./components/NotFound";
import Dashboard from "./components/dashboard/Dashboard";
import DiscordCallback from "./components/callback/DiscordCallback";
import ErrorPage from "./components/ErrorPage";
import FullscreenSpinner from "./components/FullscreenSpinner";
import {HttpClient} from "./util/HttpClient";
import {LocalUser} from "./models/User.model";
import {Jwt} from "./models/Jwt.model";
import {Services} from "./services/Service";
import {Guild} from "./models/Guild.model";
import Server from "./components/dashboard/guild/Server";

interface IAppState {
    loaded: boolean,
    showHeader: boolean,
    localUser: LocalUser | null,
    jwtToken: Jwt | null,
    guilds: Guild[] | null
}

export default class App extends React.Component<any, IAppState> {
    constructor(props: any) {
        super(props);
        App.instance = this;
        App.DISTRO_API_CLIENT = new HttpClient(App.DISTRO_API_ENDPOINT);

        this.state = {
            loaded: false,
            showHeader: true,
            localUser: null,
            jwtToken: null,
            guilds: null
        }
    }

    componentWillMount(): void {
        Services.AUTHENTICATION_SERVICE.tryToGetUserViaCookie().then(user => {
            if (user != null) {
                this.setState({
                    localUser: user
                })
            }

            this.setState({
                loaded: true
            })
        });
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<IAppState>, snapshot?: any): void {
        this.setDistroApiAuthorizationHeaderViaState();
    }

    render() {
        if (!this.state.loaded) {
            return <FullscreenSpinner/>
        }
        return (
            <Router history={history}>
                <span>
                    {this.state.showHeader &&
                    <Header user={this.state.localUser}/>
                    }
                    <Switch>
                        <Route path="/" exact component={IndexSite}/>
                        <Route path="/dashboard" component={Dashboard}/>
                        <Route path="/guild/:id" component={Server}/>
                        <Route path="/callback/discord" exact component={DiscordCallback}/>
                        <Route path="/500" exact component={ErrorPage}/>
                        <Route component={NotFound}/>
                    </Switch>
                </span>
            </Router>
        )
    }

    static instance: App;
    static DISCORD_API_ENDPOINT = "https://discordapp.com/api";
    static DISTRO_API_ENDPOINT = "http://localhost:8080";
    static DISTRO_API_CLIENT: HttpClient;
    static URL = "http://localhost:3000";
    static COMMUNITY_INVITE_LINK = "https://discord.gg/pBV3685";
    static HTTPS = false;

    public redirect(to: string) {
        history.push(to);
    }

    public redirectTo500() {
        history.push("/500");
        App.instance.setState({
            loaded: true,
            showHeader: false
        })
    }

    public setDistroApiAuthorizationHeader(jwt: Jwt) {
        App.DISTRO_API_CLIENT.axios.defaults.headers.common['Authorization'] = `Bearer ${jwt.key}`
    }

    private setDistroApiAuthorizationHeaderViaState() {
        if (this.state.jwtToken != null)
            this.setDistroApiAuthorizationHeader(this.state.jwtToken)
    }
}

ReactDOM.render(< App/>, document.getElementById('root'));


