import App from '../index'
import axios from "axios";
import history from '../history.js'
import getCookieValue from "../util/cookie";

export default class Authentication {
    static async login() {
        if (App.instance.state.user.id != null)
            return;
        let oauth = {};
        await axios.get(`${App.DISTRO_API_ENDPOINT}/authentication/discord/info`)
            .then(res => res.data)
            .then(async json => {
                await json;
                oauth.id = json.data.id;
                oauth.scopes = json.data.scopes;
            })
            .catch((err) => {
                console.error("Could not fetch DISTRO/authentication/discord/info! Error: " + err);
                alert("Could not fetch data from our API! Please try again later or ask for help in our Community Discord Server");
            });

        if (oauth.id === undefined)
            return;

        window.location.href = `${App.DISCORD_API_ENDPOINT}/oauth2/authorize?response_type=code&client_id=${oauth.id}&scope=${encodeURI(oauth.scopes)}&redirect_uri=${encodeURI(`${App.URL}/discordcallback`)}`;
    }

    // CALLED BY POPUP WINDOW
    static async onOAuthRes() {
        const search = window.location.search;
        await App.httpClient.get(`${App.DISTRO_API_ENDPOINT}/authentication/discord${search}&redirect_uri=${encodeURI(`${App.URL}/discordcallback`)}`)
            .then(res => res.data)
            .then(async json => {
                await json;
                let userGet = await this.buildUser(json.data.jwt.key);
                document.cookie = `s-token=${userGet.token}${App.HTTPS ? ";secure" : ""}`;

                App.instance.setState({
                    user: userGet
                });

                history.push("/dashboard");
                App.instance.setState({
                    loaded: true
                })
            })
            .catch(err => console.error("Could not fetch DISTRO/authentication/discord! Error: " + err));
    }

    static async buildUser(token) {
        let user = {
            token: token
        };
        let userRes = await App.httpClient.get(`${App.DISTRO_API_ENDPOINT}/user/@me`, {headers: {"Authorization": `Bearer ${user.token}`}})
            .then(res => res.data)
            .then(userJson => {
                return userJson
            })
            .catch(async err => {
                console.error("Could not fetch DISTRO/user/@me! Error: " + err);
                return null;
            });

        let res = await userRes;
        if (res == null)
            return null;
        Object.assign(user, res.data);

        if (user.id === undefined)
            throw new Error("USER ID IS NULL");
        return user;
    }

    static async isAuthenticatedAndSetStateIfSo() {
        if (App.instance.state.user.id != null)
            return true;
        let sToken = getCookieValue("s-token");
        if (sToken == null)
            return false;
        let user = await this.buildUser(sToken);
        if (user == null)
            return false;
        App.instance.setState({
            user: user
        });
        return true;
    }

    static logout() {
        if (App.instance.state.user.token == null)
            return;
        App.httpClient.get(`${App.DISTRO_API_ENDPOINT}/authentication/revoke`, {headers: {"Authorization": `Bearer ${App.instance.state.user.token}`}});
        App.instance.setState({
            user: {}
        });
        history.push("/");
    }
}
