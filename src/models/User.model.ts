import {SNOWFLAKE, UUID} from "./Types";
import {Adapter} from "./Adapter";

export class User {
    constructor(
        public id: UUID,
        public username: Username,
        public discordId: SNOWFLAKE,
        public avatar: string
    ) {
    }
}

export class LocalUser extends User {
    constructor(
        public id: UUID,
        public username: Username,
        public discordId: SNOWFLAKE,
        public avatar: string,
        public email: string,
    ) {
        super(id, username, discordId, avatar)
    }
}

export class Username {
    constructor(
        public name: string,
        public discriminator: string
    ) {
    }
}

export class UserAdapter implements Adapter<User> {
    adapt(item: any): User {
        return new User(
            item.id,
            new Username(item.username.name, item.username.discriminator),
            item.discordId,
            item.avatar
        )
    }
}

export class LocalUserAdapter implements Adapter<LocalUser> {
    adapt(item: any): LocalUser {
        return new LocalUser(
            item.id,
            new Username(item.username.name, item.username.discriminator),
            item.discordId,
            item.avatar,
            item.email,
        )
    }
}


