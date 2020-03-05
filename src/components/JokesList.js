import React from "react";

const JokesList = props => (
  <div className="bs-component my-5">
    {props.results}
    <ul className="list-group">
      {props.jokes.map((item, index) => (
        <li
          className={
            "list-group-item d-flex justify-content-between align-items-center" +
            (index % 2 === 0 ? " active" : "")
          }
          key={item.id}
        >
          {item.joke}
        </li>
        ))}
    </ul>
  </div>
);

export default JokesList;
