const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  async getUser({ email }) {
    const [ user ] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  async getRoom({ roomId }) {
    const room = await this.mongoDB.get(this.collection, roomId);
    return room || {};
  }

  async createUser({ user }) {
    const { name, email, password, data, phone } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      data,
      phone,
      password: hashedPassword
    });

    return createUserId;
  }
}


module.exports =  UsersService;