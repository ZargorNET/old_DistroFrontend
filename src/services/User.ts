export type UUID = string;

export class User {
    private readonly _id: UUID;
    private readonly _discordId: string;
    private _username: Username;
    private _avatar: string;

    constructor(id: UUID, discordId: string, username: Username, avatar: string) {
        this._id = id;
        this._discordId = discordId;
        this._username = username;
        this._avatar = avatar;
    }


    get id(): UUID {
        return this._id;
    }

    get username(): Username {
        return this._username;
    }

    set username(value: Username) {
        this._username = value;
    }

    get avatar(): string {
        return this._avatar;
    }

    set avatar(value: string) {
        this._avatar = value;
    }

    get discordId(): string {
        return this._discordId;
    }
}

export class LocalUser extends User {
    private _jwtToken: string;
    private _email: string;


    constructor(id: UUID, discordId: string, username: Username, avatar: string, jwtToken: string, email: string) {
        super(id, discordId, username, avatar);
        this._jwtToken = jwtToken;
        this._email = email;
    }


    get jwtToken(): string {
        return this._jwtToken;
    }

    set jwtToken(value: string) {
        this._jwtToken = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }
}

export class Username {
    private _name: string;
    private _discriminator: number;

    constructor(name: string, discriminator: number) {
        this._name = name;
        this._discriminator = discriminator;
    }


    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get discriminator(): number {
        return this._discriminator;
    }

    set discriminator(value: number) {
        this._discriminator = value;
    }
}
