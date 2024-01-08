import React from "react";

function Sucess({ message }) {
  return (
    <div>
      <div class="alert alert-success" role="alert">
        {message}
      </div>
    </div>
  );
}

export default Sucess;
