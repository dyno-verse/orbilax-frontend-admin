import HttpFactory from "~/repository/factory";
import {IApiResponse} from "~/repository/models/appData";
import {ILogin} from "~/repository/models/ApiResponse";

class AuthModule extends HttpFactory {
    private RESOURCE = 'auth';

    async login(email: string, password: string): Promise<IApiResponse<ILogin>> {
        const data = {
            email: email,
            password: password
        }
        return await this.call<IApiResponse<ILogin>>('POST', `${this.RESOURCE}/email`, data)
    }
}

export default AuthModule;
