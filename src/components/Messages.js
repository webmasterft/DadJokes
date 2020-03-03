import React from "react";

const Messages = props =>(
  <div className={"alert alert-dismissible alert-" + props.type}>
    <button type="button" className="close" data-dismiss="alert">&times;</button>
    <strong>{props.message}</strong> 
  </div>
);

export default Messages;


