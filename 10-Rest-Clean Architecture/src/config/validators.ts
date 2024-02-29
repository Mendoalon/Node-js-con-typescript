import mongoose from "mongoose";

export class Validators {

    // email
    static get email() {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    }

    // Is Mongo Id
    static isMongoId(id: string) {
        return mongoose.isValidObjectId(id);

    }

}