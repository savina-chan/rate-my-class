// SAVED FOR FUTURE MILESTONE

// import mongoose from 'mongoose';
// import mongooseSlugPlugin from 'mongoose-slug-plugin';

// // Define the User Schema
// const UserSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true }, // hashed password
//     reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
// }, { timestamps: true });

// // Register the User model with Mongoose
// const User = mongoose.model('User', UserSchema);

// // Add a slug based on the username for easy URL referencing
// UserSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=username%>' });

// export default User;