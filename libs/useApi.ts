import { Product } from "../types/Product";
import { User } from "../types/User";
import { CartItem } from '../types/CartItem'
import { Address } from "../types/Address";

const TEMPORARYoneProdcut : Product = {
    id: 1,
    image: '/tmp/burguer.png',
    categoryName :'Tadicional', 
    name :'Texas Burguer', 
    price : 25.50,
    description: '2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Modo de casa  e Pão brioche artesnal'
}

export const useApi = (tenantSlug : string) => ({

    getTenant : async () => {
        switch(tenantSlug) {
            case 'b7burguer':
                return {
                    slug : 'b7burguer',
                    name : 'B7burguer',
                    mainColor : '#FB9400',
                    secondColor : '#FFF9F2'
                }
            break;

            case 'b7pizza':
                return {
                    slug : 'b7pizza',
                    name : 'B7pizza',
                    mainColor : '#6AB70A',
                    secondColor : '#E0E0E0'
                }
            break;

            default: return false;
        }
    },

    getAllProducts : async () => {
        let products = []
        for(let q =0; q<10; q++){
            products.push({
                ...TEMPORARYoneProdcut,
                id: q+1
            })
        }
        return products;
    },

    getProduct : async (id: number) => {
        return {
            ...TEMPORARYoneProdcut,
            id: id
        }
    },

    authorizeToken: async (token: string): Promise<User | false> => {
        if(!token) return false;

        return {
            name: 'Tarcisio Silva',
            email: 'tarcisio101093@gmail.com'
        }
    },

    getCartProducts: async (cartCookie: string) =>{
        let cart: CartItem[] = []

        if(!cartCookie) return cart

        const cartJson = JSON.parse(cartCookie)

        for(let i in cartJson){
            if(cartJson[i].id && cartJson[i].qt){
                const product = {
                    ...TEMPORARYoneProdcut,
                    id: cartJson[i].id
                }
                cart.push({
                    qt: cartJson[i].qt,
                    product
                })
            }

        }

        return cart;
    },

    getUserAddresses : async (email: string) => {
        const addresses: Address[] = [];

        for(let i = 0; i < 4; i++){
            addresses.push({
                id: i+1,
                street: 'Rua das Flores',
                number: `${i+1}00`,
                cep: '99999999',
                city: 'São Paulo',
                neighborhood: 'Jardins',
                state: 'SP'
            })
        }
        return addresses;
    }
})