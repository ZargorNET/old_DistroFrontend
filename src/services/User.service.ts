import {LocalUser} from "../models/User.model";
import App from "../index";
import {Adapters} from "../models/Adapter";

export class UserService {
    private localUserPath = "/user/@me";

    async getLocalUser(): Promise<LocalUser | null> {
        return await App.DISTRO_API_CLIENT.get(this.localUserPath).then(res => Adapters.LOCALUSER_ADAPTER.adapt(res.data.data)).catch(() => null)
    }
}
