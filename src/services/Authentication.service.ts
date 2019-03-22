import App from "../index";
import {Adapters} from "../models/Adapter";
import {Jwt} from "../models/Jwt.model";
import {LocalUser} from "../models/User.model";
import getCookieValue from "../util/cookie";
import {Services} from "./Service";

export class AuthenticationService {
    private discordInfoPath = "/authentication/discord/info";
    private authenticationPath = "/authentication/discord";
    private logoutPath = "/authentication/revoke";

    public async startLoginProcess() {
        const oauth = await App.DISTRO_API_CLIENT.get(this.discordInfoPath).then(res => Adapters.OAUTH_ADAPTER.adapt(res.data.data))
            .catch(e => {
                App.redirect("/500");
                throw e;
            });

        window.location.href = `${App.DISCORD_API_ENDPOINT}/oauth2/authorize?response_type=code&client_id=${oauth.id}&scope=${encodeURI(oauth.scopes)}&redirect_uri=${encodeURI(`${App.URL}/callback/discord`)}`;
    }

    // Called by the callback (discord redirect)
    public async getJwtTokenByOAuthResponse(): Promise<Jwt> {
        return await App.DISTRO_API_CLIENT.get(`${this.authenticationPath}${window.location.search}` /*window.location.search => ?code...&state=...*/)
            .then(res => Adapters.JWT_ADAPTER.adapt(res.data.data.jwt)).catch(e => {
                App.redirect("/500");
                throw e;
            });
    }

    public getJwtTokenByCookie(): Jwt | null {
        const cookie = getCookieValue("s-token");
        if (cookie == null)
            return null;

        const cookieSplit = cookie.split("||");
        if (cookieSplit.length != 2) {
            throw "invalid cookie format"
        }

        return new Jwt(cookieSplit[0], new Date(cookieSplit[1]));
    }

    public saveJwtTokenToCookie(jwt: Jwt) {
        document.cookie = `s-token=${jwt.key}||${jwt.expiresAt.getDate()};Path=/${App.HTTPS ? ";secure" : ""}`;
    }

    public async tryToGetUserViaCookie(): Promise<LocalUser | null> {
        if (App.instance.state.localUser != null)
            return App.instance.state.localUser;

        const jwt = this.getJwtTokenByCookie();
        if (jwt == null)
            return null;

        App.instance.setState({
            jwtToken: jwt
        });

        return await Services.USER_SERVICE.getLocalUser()
    }

    public async logout() {
        if (App.instance.state.localUser == null)
            return;

        await App.DISTRO_API_CLIENT.get(this.logoutPath)
    }


}


