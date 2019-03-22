import {Guild} from "../models/Guild.model";
import App from "../index";
import {Adapters} from "../models/Adapter";

export class GuildService {
    private path = "/user/@me/guilds";

    async list(): Promise<Guild[]> {
        let guilds = await App.DISTRO_API_CLIENT.get(this.path).then(res => {
            return Adapters.GUILD_ADAPTER.adapt(res.data.data);
        });
        return []
    }
}
