import {Guild} from "../models/Guild.model";
import App from "../index";
import {Adapters} from "../models/Adapter";

export class GuildService {
    private path = "/user/@me/guilds";

    async getAll(): Promise<Guild[]> {
        const httpRes = await App.DISTRO_API_CLIENT.get(this.path).then(res => res);
        let ownerOf = httpRes.data.data.ownerOf.map((v: any) => Adapters.GUILD_ADAPTER.adapt(v));
        let moderatorOf = httpRes.data.data.moderatorOf.map((v: any) => Adapters.GUILD_ADAPTER.adapt(v));

        return ownerOf.concat(moderatorOf)
    }
}
