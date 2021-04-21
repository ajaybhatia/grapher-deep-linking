import { Mongo } from "meteor/mongo";
import Users from "./users";

const Posts = new Mongo.Collection("Posts");

export const getPosts = Posts.createQuery({
  title: 1,
  userId: 1,
  createdAt: 1,
  updatedAt: 1,
  user: 1,
});

Posts.addLinks({
  user: {
    type: "one",
    collection: Users,
    field: "userId",
  },
});

Users.addLinks({
  posts: {
    collection: Posts,
    inversedBy: "user",
  },
});

Meteor.startup(() => {
  if (Meteor.isServer) {
    Posts.expose({});
  }
});

export default Posts;
