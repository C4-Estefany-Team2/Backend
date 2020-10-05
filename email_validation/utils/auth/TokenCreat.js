//This script creates a Token as the user is sign-in.
//Token expires in 43200s
//NOTE: This action is already be on the main back-end prroject.
//EV-02: If a user does not activate their account, then they cannot log-in and the account is deleted.

const tokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});