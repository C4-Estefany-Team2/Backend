const MongoLib = require('../lib/mongo');

class RoomsService {
    constructor() {
        this.collection = 'rooms';
        this.mongoDB = new MongoLib();
    }
    async getRooms({ tags }) {
        const query = tags && {
            tags: {
                $in:tags,
            },
        };
        const rooms = await this.mongoDB.getAll(this.collection, query);
        return rooms || [];
    }
    async getRoom({ roomId }) {
        const room = await this.mongoDB.get(this.collection, roomId);
        return room || {};
    }

    async createRoom({ room }) {
        const newRoom = {
            ...room,
            createdAt: Date.now(),
        };
        const createRoomId = await this.mongoDB.create(this.collection, newRoom);
        return createRoomId;
    }

    async deleteRoom( roomId ) {
        const deletedRoom = await this.mongoDB.delete(this.collection, roomId);
        return deletedRoom;
    }

    async filterBedroom(room) {
        const filterRoom = await this.mongoDB.filterBedroom(this.collection, room)
        return filterRoom;
    }

    async getBedroomRecents() {
        const bedroomRecents = await this.mongoDB.getBedroomRecents(this.collection);
        return  bedroomRecents;
    }

}

module.exports = RoomsService;