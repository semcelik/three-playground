import "./CustomControlPanel.scss";

import React from "react";

function CustomControlPanel({ className, children }) {
  return <div className={`custom-control-panel ${className}`}>{children}</div>;
}

CustomControlPanel.Row = ({ label, children }) => (
  <div className="custom-control-panel-row">
    <label>{label}</label>
    {children}
  </div>
);

export default CustomControlPanel;
