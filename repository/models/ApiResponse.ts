export interface IBusinessInfo {
    id: string;
    name: string;
    slug: string;
    tag: string;
    primaryColor: string;
    phoneNumber: string;
    address: string;
    city: string;
    country: string;
    logoUrl: string;
    bannerUrl: string,
    facebookUrl: string,
    instagramUrl: string,
    twitterUrl: string,
    websiteUrl: string,
    textColor: string,
    backgroundColor: string,
    createdAt: string;
    updatedAt: string;
    branches: Branch[];
}

interface Branch {
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    phoneNumber: string;
    businessId: string;
    createdAt: string;
    updatedAt: string;
    menu: Menu[];
}

interface Menu {
    id: string;
}

export interface IMenuCategory {
    id: string
    name: string
    description: string
    color?: string
}

export interface IMenu {
    id: string
    name: string
    description: string
    color?: string
    price: number
    ingredients: string[]
    imageUrl: string
}

export interface IMenuDetail {
    id: string;
    name: string;
    description: string;
    branchId: string;
    createdAt: string;
    updatedAt: string;
    color?: string
    items: Item[];
    categories: Category[];
}

interface Category {
    id: string;
    name: string;
    description: string;
    parentId?: any;
    createdAt: string;
    updatedAt: string;
    items: Item2[];
    children: any[];
}

interface Item2 {
    id: string;
    name: string;
    description: string;
    price: number;
    ingredients: string[];
    createdAt: string;
    updatedAt: string;
}

interface Item {
    id: string;
    name: string;
    description: string;
    price: number;
    color?: string;
    imageUrl?: string;
    ingredients: string[];
    createdAt: string;
    updatedAt: string;
}


export interface ICategoryItems {
    id: string;
    name: string;
    description: string;
    items: Item[];
    children: any[];
}

export interface Iitem {
    id: string;
    name: string;
    description: string;
    color?: string;
    price: number;
    imageUrl?: string;
    ingredients: string[];
}

export interface ILogin {
    firstName: string
    lastName: string
    otherNames: string
    email: string
    accessToken: string
    role: string
}

export enum ServiceTypes {
    TAKE_OUT = 'TAKE_OUT',
    DINE_IN = 'DINE_IN'
}

export enum PaymentTypes {
    PAID = 'PAID',
    UNPAID = 'UNPAID',
}


export interface IUser {
    id:         string;
    firstName:  string;
    lastName:   string;
    otherNames: string;
    email:      string;
    gender:     string;
    businesses: Business[];
}

export interface Business {
    id:       string;
    name:     string;
    branches: Branch[];
}
