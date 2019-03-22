import {SNOWFLAKE, UUID} from "./Types";
import {Adapter} from "./Adapter";

export class Guild {
    constructor(
        public id: UUID,
        public discordId: SNOWFLAKE,
        public name: string,
        public ownerId: UUID,
        public moderators: UUID[],
        public icon: string
    ) {
    }
}

export class GuildAdapter implements Adapter<Guild> {
    adapt(item: any): Guild {
        return new Guild(
            item.id,
            item.discordId,
            item.name,
            item.ownerId,
            item.moderators,
            item.icon
        )
    }
}
