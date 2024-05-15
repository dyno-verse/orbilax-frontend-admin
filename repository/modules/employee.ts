import HttpFactory from "~/repository/factory";
// import {IEmployees, ISkill} from "~/repository/models/appData";
// import {ICreateIndustry, IUpdateEmployee} from "~/repository/models/inputModels";

class EmployeeModule extends HttpFactory {
    private RESOURCE = '/users/employee';

    // async update(request: IUpdateEmployee, id: string): Promise<IUpdateEmployee> {
    //     return await this.call<IUpdateEmployee>('PUT', `${this.RESOURCE}/${id}`, request);
    // }
    //
    //
    // async getAllEmployees(): Promise<IEmployees> {
    //     const {data, code} = await this.call<IEmployees>('GET', `${this.RESOURCE}`)
    //     return data
    // }
}

export default EmployeeModule;
