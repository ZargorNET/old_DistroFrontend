import App from '..'
import axios from "axios";
import history from '../history.js'
import getCookieValue from "../util/cookie";
import {LocalUser, Username} from "./User";

export default class Authentication {

    static async login() {
        if (App.instance.state.localUser != null)
            return;
        let oauth: OAuth | null = null;
        await axios.get(`${App.DISTRO_API_ENDPOINT}/authentication/discord/info`)
            .then(res => res.data)
            .then(async json => {
                await json;
                oauth = new OAuth(json.data.id, json.data.scopes);
            })
            .catch((err) => {
                console.error("Could not fetch DISTRO/authentication/discord/info! Error: " + err);
                alert("Could not fetch data from our API! Please try again later or ask for help in our Community Discord Server");
            });

        if (oauth == null)
            return;

        window.location.href = `${App.DISCORD_API_ENDPOINT}/oauth2/authorize?response_type=code&client_id=${oauth!.id}&scope=${encodeURI(oauth!.scopes)}&redirect_uri=${encodeURI(`${App.URL}/discordcallback`)}`;
    }

    // CALLED BY POPUP WINDOW
    static onOAuthRes() {
        const search = window.location.search;
        App.httpClient.get(`${App.DISTRO_API_ENDPOINT}/authentication/discord${search}&redirect_uri=${encodeURI(`${App.URL}/discordcallback`)}`)
            .then(res => res.data)
            .then(json => {
                this.getLocalUser(json.data.jwt.key).then(user => {
                    if (user == null) {
                        alert("An error occurred!");
                        console.error("onOAuthRes user null check is true!");
                        return;
                    }
                    document.cookie = `s-token=${user!.jwtToken}${App.HTTPS ? ";secure" : ""}`;

                    App.instance.setState({
                        localUser: user
                    });

                    history.push("/dashboard");
                    App.instance.setState({
                        loaded: true
                    })
                });
            })
            .catch(err => console.error("Could not fetch DISTRO/authentication/discord! Error: " + err));
    }

    static async getLocalUser(token: string): Promise<LocalUser | null> {
        let user: LocalUser | null = null;

        let userRes = await App.httpClient.get(`${App.DISTRO_API_ENDPOINT}/user/@me`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => res.data)
            .then(json => json.data)
            .then(userJson => {
                console.log(userJson);
                user = new LocalUser(userJson.id, userJson.discordId, new Username(userJson.username.name, userJson.username.discriminator), userJson.avatar, token, userJson.email);
            })
            .catch(async err => {
                console.error("Could not fetch DISTRO/user/@me! Error: " + err);
                return null;
            });

        await userRes;
        if (user == null)
            return null;

        return user;
    }

    static async isAuthenticatedAndSetStateIfSo() {
        if (App.instance.state != null)
            return true;
        let sToken = getCookieValue("s-token");
        if (sToken == null)
            return false;
        let user = await this.getLocalUser(sToken);
        if (user == null)
            return false;
        App.instance.setState({
            localUser: user
        });
        return true;
    }

    static logout() {
        if (App.instance.state.localUser == null)
            return;
        App.httpClient.get(`${App.DISTRO_API_ENDPOINT}/authentication/revoke`, {headers: {"Authorization": `Bearer ${App.instance.state.localUser.jwtToken}`}});
        App.instance.setState({
            localUser: null
        });
        history.push("/");
    }
}

class OAuth {
    id: string;
    scopes: string;

    constructor(id: string, scopes: string) {
        this.id = id;
        this.scopes = scopes;
    }
}
