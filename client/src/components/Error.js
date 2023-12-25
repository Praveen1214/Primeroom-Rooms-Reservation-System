import React from "react";

function Error({ message }) {
  return (
    <div>
      <div className="alert alert-danger" role="alert">
        Something went wrong, Plese try again later...
      </div>
    </div>
  );
}

export default Error;
