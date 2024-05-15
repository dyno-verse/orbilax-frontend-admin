import HttpFactory from "~/repository/factory";
import {IApiResponse} from "~/repository/models/appData";
import {ICreateStaff} from "~/repository/models/inputModels";
import {IStaff} from "~/repository/models/inputModels";
import {IUpdateStaff} from "~/repository/models/inputModels";

class StaffModule extends HttpFactory {
    private RESOURCE = '/staff';


    async getAllStaff(branchId: string): Promise<IApiResponse<[IStaff]>> {
        return await this.call<IApiResponse<[IStaff]>>('GET', `${this.RESOURCE}/branch/${branchId}`);
    }


    async create(branchId: string, data: ICreateStaff): Promise<IApiResponse<ICreateStaff>> {
        return await this.call('POST', `${this.RESOURCE}/branch/${branchId}`, data);
    }

    async updateStaff(staffId: string, data: IUpdateStaff): Promise<IApiResponse<ICreateStaff>> {
        return await this.call('PUT', `${this.RESOURCE}/${staffId}`, data);
    }

    async deleteStaff(staffId: string): Promise<IApiResponse<ICreateStaff>> {
        return await this.call('DELETE', `${this.RESOURCE}/${staffId}`);
    }

}

export default StaffModule;
