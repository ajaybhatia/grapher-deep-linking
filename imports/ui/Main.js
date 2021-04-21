import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { getComments } from "../api/comments";

const Main = () => {
  const { loading, data } = useTracker(() => {
    const query = getComments.clone();
    const handle = query.subscribe();

    return {
      data: query.fetch(),
      loading: !handle.ready(),
    };
  }, []);

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Main;
