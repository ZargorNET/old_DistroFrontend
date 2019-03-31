import App from "../index";
import {Adapters} from "../models/Adapter";
import {Jwt} from "../models/Jwt.model";
import {LocalUser} from "../models/User.model";
import {Services} from "./Service";
import Cookies from "js-cookie";

export class AuthenticationService {
    private discordInfoPath = "/authentication/discord/info";
    private authenticationPath = "/authentication/discord";
    private logoutPath = "/authentication/revoke";

    public async startLoginProcess() {
        const oauth = await App.DISTRO_API_CLIENT.get(this.discordInfoPath).then(res => Adapters.OAUTH_ADAPTER.adapt(res.data.data))
            .catch(e => {
                App.instance.redirectTo500();
                throw e;
            });

        window.location.href = `${App.DISCORD_API_ENDPOINT}/oauth2/authorize?response_type=code&client_id=${oauth.id}&scope=${encodeURI(oauth.scopes)}&redirect_uri=${encodeURI(`${App.URL}/callback/discord`)}`;
    }

    // Called by the callback (discord redirect)
    public async getJwtTokenByOAuthResponse(): Promise<Jwt> {
        return await App.DISTRO_API_CLIENT.get(`${this.authenticationPath}${window.location.search}` /*window.location.search => ?code...&state=...*/)
            .then(res => Adapters.JWT_ADAPTER.adapt(res.data.data.jwt)).catch(e => {
                App.instance.redirectTo500();
                throw e;
            });
    }

    public getJwtTokenByCookie(): Jwt | null {
        const cookie = Cookies.getJSON("s-token");
        if (cookie == null || cookie === '')
            return null;

        const key = cookie.key;
        const expiresAt = cookie.expiresAt;

        if (key == null || expiresAt == null)
            throw "invalid cookie format";


        return new Jwt(key, new Date(Number(expiresAt)));
    }

    public saveJwtTokenToCookie(jwt: Jwt) {
        Cookies.set("s-token", {key: jwt.key, expiresAt: jwt.expiresAt.getTime()}, {path: '/', secure: App.HTTPS});
    }

    public async tryToGetUserViaCookie(): Promise<LocalUser | null> {
        if (App.instance.state.localUser != null)
            return App.instance.state.localUser;

        const jwt = this.getJwtTokenByCookie();
        if (jwt == null)
            return null;

        await App.instance.setState({
            jwtToken: jwt
        });

        App.instance.setDistroApiAuthorizationHeader(jwt);

        return await Services.USER_SERVICE.getLocalUser()
    }

    public async logout() {
        if (App.instance.state.localUser == null)
            return;

        Cookies.remove("s-token", {path: '/'});

        await App.DISTRO_API_CLIENT.get(this.logoutPath)
    }
}


