import {Adapter} from "./Adapter";

export class Jwt {
    constructor(
        public key: string,
        public expiresAt: Date
    ) {
    }
}

export class JwtAdapter implements Adapter<Jwt> {
    adapt(item: any): Jwt {
        return new Jwt(
            item.key,
            new Date(item.expiresAt)
        )
    }
}
