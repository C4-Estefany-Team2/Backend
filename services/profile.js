const MongoLib = require('../lib/mongo');

class PerfilesService {
    constructor() {
        this.collection = 'perfiles';
        this.mongoDB = new MongoLib();
    }
    async getPerfiles({ tags }) {
        const query = tags && {
            tags: {
                $in:tags,
            },
        };
        const perfiles = await this.mongoDB.getAll(this.collection, query);
        return perfiles || [];
    }
    async getPerfile({ perfileId }) {
        const perfile = await this.mongoDB.get(this.collection, perfileId);
        return perfile || {};
    }

    async createPerfile ({ perfile }) {
        const newPerfile = {
            ...perfile,
            createdAt: Date.now(),
        };
        const createPerfileId = await this.mongoDB.create(this.collection, newPerfile);
        return createPerfileId;
    }

    async deletePerfile( PerfileId ) {
        const deletedPerfile = await this.mongoDB.delete(this.collection, PerfileId);
        return deletedPerfile;
    }

    async filterPerfiles(perfile) {
        const filterPerfiles = await this.mongoDB.filterProfiles(this.collection, perfile)
        return filterPerfiles;
    }

    async getPerfilesRecents() {
        const perfilesRecents = await this.mongoDB.getPerfilesRecents(this.collection);
        return  perfilesRecents;
    }

}

module.exports =  PerfilesService;