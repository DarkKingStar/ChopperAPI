export type HomeDto = {
    title: string;
    description: string;
    author: string;
    brand: string;
    routes: {
        name: string;
        path: string;
        method: string;
        description: string;
        queries?:{
            name: string;
            type: string;
            description: string;
        }[],
        params?: {
            name: string;
            type: string;
            description: string;
        }[]
    }[]
}