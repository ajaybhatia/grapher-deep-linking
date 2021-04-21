import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

const Users = new Mongo.Collection("Users");

export const getUsers = Users.createQuery({
  firstName: 1,
  lastName: 1,
  // posts: 1,
  comments: 1,
});

Meteor.startup(() => {
  if (Meteor.isServer) {
    Users.expose({});
  }
});

export default Users;
