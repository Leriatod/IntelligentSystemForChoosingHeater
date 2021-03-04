export class Product {
    key?: string;
    title: string = '';
    price: number = null;
    power: number = null;
    category: string = '';
    imageUrl: string = '';
    description: string = '';
    features: { 
        [featureKey: string]: { 
            name: string 
        } 
    } = {};
}