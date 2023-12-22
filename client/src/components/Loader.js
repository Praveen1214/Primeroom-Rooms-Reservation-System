import React, { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  let [loading, setLoading] = useState(true);

  return (
    <div style={{ marginTop: "150px" }}>
      <center>
        <div className="sweet-loading">
          <HashLoader
            color="#000"
            loading={loading}
            cssOverride=""
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </center>
    </div>
  );
};

export default Loader;
