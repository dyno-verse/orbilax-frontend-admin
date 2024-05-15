export interface ICreateRequestDemo {
    fullName: string
    restaurantName: string
    phoneNumber: string
    email: string
}

{

}

export interface ICreateMenu {
    name: string
    description: string
    branchId: string
    color?: string
}


export interface ICreateCategory {
    name: string
    description: string
    color?: string
    branchId?: string
}

export interface ICreateCategoryItem {
    id: string,
    name: string;
    description: string;
    position: number;
    price: number;
    imageUrl?: string;
    color?: string,
    ingredients: string[];
    branchId: string;
}

export interface IUpdateBusiness {
    name: string;
    slug: string;
    tag: string;
    websiteUrl: string;
    twitterUrl: string;
    facebookUrl: string;
    instagramUrl: string;
    primaryColor: string;
    textColor: string;
    backgroundColor: string;
}

export interface ICreateStaff {
    id: string,
    position?: number,
    fullName: string,
    phoneNumber: string,
    receiptName: string,
    code: string,
    isActive: boolean
}

export interface IUpdateStaff {
    id: string,
    fullName: string,
    phoneNumber: string,
    receiptName: string,
    isActive: boolean
}

export interface IStaff {
    userId: number
    id: number
    title: string
    completed: boolean
}


