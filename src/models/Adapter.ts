import {GuildAdapter} from "./Guild.model";
import {LocalUserAdapter, UserAdapter} from "./User.model";
import {OAuthAdapter} from "./OAuth.model";
import {JwtAdapter} from "./Jwt.model";

export interface Adapter<T> {
    adapt(item: any): T;
}

export class Adapters {
    public static readonly GUILD_ADAPTER = new GuildAdapter();
    public static readonly USER_ADAPTER = new UserAdapter();
    public static readonly LOCALUSER_ADAPTER = new LocalUserAdapter();
    public static readonly OAUTH_ADAPTER = new OAuthAdapter();
    public static readonly JWT_ADAPTER = new JwtAdapter();

    private constructor() {
    }
}
