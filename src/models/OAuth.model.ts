import {Adapter} from "./Adapter";

export class OAuth {
    constructor(public id: string, public scopes: string) {
    }
}

export class OAuthAdapter implements Adapter<OAuth> {
    adapt(item: any): OAuth {
        return new OAuth(
            item.id,
            item.scopes
        )
    }
}
