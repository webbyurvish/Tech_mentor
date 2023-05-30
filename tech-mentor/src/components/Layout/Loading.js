//  loading component

import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div class="content">
          <div className="sbl-circ-ripple"></div>
        </div>
      </div>
    </div>
  );
}
