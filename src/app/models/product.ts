export class Product {
    key?: string;
    title: string = '';
    price: number = null;
    power: number = null;
    imageUrl: string = '';
    description: string = '';
    features: { [featureId: string]: { name: string } } = {};
}