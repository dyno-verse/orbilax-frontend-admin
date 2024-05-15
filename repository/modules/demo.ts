import HttpFactory from "~/repository/factory";
import {ICreateRequestDemo} from "~/repository/models/inputModels";
import {IRequestADemo} from "~/repository/models/appData";

// import {IBusinessInfo} from "~/repository/models/ApiResponse";

class RequestADemoModule extends HttpFactory {
    private RESOURCE = 'business/demo/request';

    // async getBusinessInfoBySlug(slug: string): Promise<IBusinessInfo> {
    //     return await this.call<IBusinessInfo>('GET', `${this.RESOURCE}/${slug}`)
    // }

    async create(request: ICreateRequestDemo): Promise<IRequestADemo> {
        return await this.call<IRequestADemo>('POST', `${this.RESOURCE}`, request)
    }
}

export default RequestADemoModule;
