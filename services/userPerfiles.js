const MongoLib = require('../lib/mongo');


class UserPefilesService {
    constructor() {
        this.collection = 'user-rooms';
        this.mongoDB = new MongoLib();
    }

    async getUserPerfiles({ userId }){
        const query = userId && { userId };
        const userPerfiles = await this.mongoDB.getAll(this.collection, query);

        return userPerfiles|| [];
    }

    async createUserPerfile({ userPerfile }) {
        const createdUserPerfileId = await this.mongoDB.create(this.collection, userPerfile);

        return createdUserPerfileId;
    }

    async deleteUserPerfile({ userPerfileId }) {
        const deletedUserPerfileId = await this.mongoDB.delete(this.collection, userPerfileId);

        return deletedUserPerfileId;
    }

}

module.exports = UserPefilesService;