import React from "react";
import faker from "faker";
import CommentDetail from "./CommentDetail";
import ApprovalCard from "./ApprovalCard";

const App = () => {
  return (
    <div className="ui container comments">
      <ApprovalCard>
        <div>
          <h4>Warning!</h4>
          Are you sure ?
        </div>
        
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail author="Sam" dateTimestamp="Today at 6:00 PM" content=" Nice blog post" avatar={faker.image.image()} />
      </ApprovalCard>
      <CommentDetail author="Alex" dateTimestamp="Today at 10:00 PM" content=" Very good written my new post" avatar={faker.image.image()} />
      <CommentDetail author="Raj" dateTimestamp="Today at 7:00 PM" content=" Hey my second post" avatar={faker.image.image()} />
      <CommentDetail author="Rocky" dateTimestamp="Today at 9:00 PM" content=" Hey my new post" avatar={faker.image.image()} />
    </div>
  );
};

export default App;
