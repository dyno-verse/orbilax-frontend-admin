import {defineNuxtPlugin} from '#app';
import {$fetch, FetchOptions} from "ofetch";
import BusinessModule from "../repository/modules/business";
import MenuModule from "~/repository/modules/menu";
import MenuCategoryModule from "~/repository/modules/category";
import ItemModule from "~/repository/modules/item";
import StaffModule from "~/repository/modules/staff";
import AuthModule from "~/repository/modules/auth";


/** ApiInstance interface provides us with good typing */
interface IApiInstance {
    business: BusinessModule,
    menuCategory: MenuCategoryModule,
    menu: MenuModule,
    item: ItemModule,
    staff: StaffModule,
    auth: AuthModule
}

export default defineNuxtPlugin(nuxtApp => {
    const {data, signOut, getSession} = useAuth()

    let token = ''
    if (data.value !== null) {
        token = data.value.access_token
    }

    const fetchOptions: { headers: { Authorization: string; Accept: string }; baseURL: string } = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        baseURL: "https://api.orbilax.com",
    }

    /** create a new instance of $fetcher with custom option */
    const apiFetcher = $fetch.create(fetchOptions);

    /** an object containing all repositories we need to expose */
    const modules: IApiInstance = {
        business: new BusinessModule(apiFetcher),
        menuCategory: new MenuCategoryModule(apiFetcher),
        menu: new MenuModule(apiFetcher),
        item: new ItemModule(apiFetcher),
        staff: new StaffModule(apiFetcher),
        auth: new AuthModule(apiFetcher)
    };

    return {
        provide: {
            api: modules,
        },
    };
});
