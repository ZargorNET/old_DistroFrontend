import {LocalUser, User} from "../models/User.model";
import App from "../index";
import {Adapters} from "../models/Adapter";
import {UUID} from "../models/Types";

export class UserService {
    private localUserPath = "/user/@me";
    private userPath = "/user/";

    async getLocalUser(): Promise<LocalUser | null> {
        return await App.DISTRO_API_CLIENT.get(this.localUserPath).then(res => Adapters.LOCALUSER_ADAPTER.adapt(res.data.data)).catch(() => null);
    }

    async getUser(id: UUID): Promise<User | null> {
        return await App.DISTRO_API_CLIENT.get(`${this.userPath}${id}`).then(res => Adapters.USER_ADAPTER.adapt(res.data.data)).catch(() => null);
    }
}
