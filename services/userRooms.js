const MongoLib = require('../lib/mongo');


class UserRoomsService {
    constructor() {
        this.collection = 'user-rooms';
        this.mongoDB = new MongoLib();
    }

    async getUserRooms({ userId }){
        const query = userId && { userId };
        const userRooms = await this.mongoDB.getAll(this.collection, query);

        return userRooms || [];
    }

    async createUserRoom({ userRoom }) {
        const createdUserRoomId = await this.mongoDB.create(this.collection, userRoom);

        return createdUserRoomId;
    }

    async deleteUserRoom({ userRoomId }) {
        const deletedUserRoomId = await this.mongoDB.delete(this.collection, userRoomId);

        return deletedUserRoomId;
    }

}

module.exports = UserRoomsService;