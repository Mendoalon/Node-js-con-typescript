import { Validators } from "../../../config";

export interface ProductInput {
    name: string;
    available: boolean;
    price: number;
    description: string;
    user: string; // ID
    category: string; // ID
}

export class CreateProductDto {
    constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string, // ID
        public readonly category: string // ID
    ) { }

    static create(object: ProductInput): [string?, CreateProductDto?] {

        const { name, available, price, description, user, category } = object;

        if (!name) return ['Missing name'];

        if (!user) return ['Missing user'];
        if( !Validators.isMongoId(user)) return ['Invalid User ID'];

        if (!category) return ['Missing category'];
        if( !Validators.isMongoId(category)) return ['Invalid Category ID'];
        

        let availableBoolean: boolean;

        if (typeof available === 'boolean') {
            availableBoolean = available;
        } else {
            availableBoolean = available === 'true';
        }


        return [undefined, new CreateProductDto(name, availableBoolean, price, description, user, category)];
    }
}
