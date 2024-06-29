import CredentialsProvider from 'next-auth/providers/credentials'
import {NuxtAuthHandler} from '#auth'
import business from "~/repository/modules/business";

export default NuxtAuthHandler({
    secret: "679D6A5F47765D7ED",
    pages: {
        signIn: '/login',
        signOut: '/login',
    },
    callbacks: {
        // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
        jwt: async ({token, user}) => {
            const isSignIn = !!user;
            if (isSignIn) {
                token.jwt = user ? (user as any).access_token || 'a' : 'b';
                token.id = user ? user.id || '' : '';
                token.role = user ? (user as any).role || '' : '';
                //
                // if (localStorage.getItem('branchId') !== null) {
                //     token.branchId = localStorage.getItem('branchId')
                // }
                token.businessName = user ? (user as any).businessName || '' : '';
                token.businessId = user ? (user as any).businessId || '' : '';
            }
            return Promise.resolve(token);
        },
        // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
        session: async ({session, token}) => {
            (session as any).role = token.role;
            (session as any).access_token = token.jwt;
            (session as any).businessId = token.businessId;
            (session as any).businessName = token.businessName;
            return Promise.resolve(session);
        },
    },
    providers: [
        // @ts-expect-error
        CredentialsProvider.default({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials: any) {

                const {data, pending} = await $fetch('/auth/email', {
                    method: 'POST',
                    body: {
                        email: credentials.email,
                        password: credentials.password
                    },
                    headers: {
                        'Accept': 'application/json',
                    },
                    baseURL: "https://api.orbilax.com/",
                })
                if (data) {
                    // return data
                    return {
                        name: data.firstName + " " + data.lastName,
                        email: data.email,
                        access_token: data.accessToken,
                        role: data.role,
                        businessId: data.businesses.filter(business => business.id === '6f372ee4-92f5-42bc-814b-9f7bad7235ed')[0].id,
                        businessName: data.businesses.filter(business => business.id === '6f372ee4-92f5-42bc-814b-9f7bad7235ed')[0].name
                    };
                } else {
                    throw createError({
                        statusCode: 403,
                        statusMessage: "Credentials not working",
                    });
                }

            }
        })
    ]
})
