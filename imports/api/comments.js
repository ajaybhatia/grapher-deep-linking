import { Mongo } from "meteor/mongo";
import Posts from "./posts";
import Users from "./users";

const Comments = new Mongo.Collection("Comments");

const normalize = ({
  results,
  arrayKeyName,
  newObjectKeyName,
  linkedKeyName,
  arrayObjectKeyName,
}) => {
  return results
    .map((r) => ({
      ...r,
      [arrayKeyName]: r[arrayKeyName].map((m) => ({
        ...m,
        [newObjectKeyName]: r[linkedKeyName].find(
          (p) => p._id === m[arrayObjectKeyName]
        ),
      })),
    }))
    .map((o) => {
      delete o[linkedKeyName];
      return o;
    });
};

export const getComments = Comments.createQuery({
  $postFilter(results) {
    return normalize({
      results,
      arrayKeyName: "more",
      newObjectKeyName: "post",
      linkedKeyName: "posts",
      arrayObjectKeyName: "postId",
    });
  },
  title: 1,
  user: {
    firstName: 1,
    lastName: 1,
  },
  more: 1,
  posts: {
    title: 1,
  },
});

Comments.addLinks({
  user: {
    type: "one",
    collection: Users,
    field: "userId",
  },
  posts: {
    type: "many",
    collection: Posts,
    field: "more.postId",
  },
});

Users.addLinks({
  comments: {
    collection: Comments,
    inversedBy: "user",
  },
});

Meteor.startup(() => {
  if (Meteor.isServer) {
    Comments.expose({});
  }
});

export default Comments;
