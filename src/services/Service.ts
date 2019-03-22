import {AuthenticationService} from "./Authentication.service";
import {GuildService} from "./Guild.service";
import {UserService} from "./User.service";

export class Services {
    public static readonly AUTHENTICATION_SERVICE = new AuthenticationService();
    public static readonly GUILD_SERVICE = new GuildService();
    public static readonly USER_SERVICE = new UserService();

    private constructor() {
    }
}
