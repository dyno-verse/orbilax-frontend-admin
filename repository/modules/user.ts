import HttpFactory from "~/repository/factory";
import {IApiResponse} from "~/repository/models/appData";
import {IUser} from "~/repository/models/ApiResponse";

class UserModule extends HttpFactory {
    private RESOURCE = '/user';


    async getUser(): Promise<IApiResponse<[IUser]>> {
        return await this.call<IApiResponse<[IUser]>>('GET', `${this.RESOURCE}/profile`);
    }

}

export default UserModule;
