import React from "react";

const Pagination = props => {
  if (props.total_pages > 1 ){
    return (
      <div>
        <p className="text-center">
        <small >
          Page {props.current_page} of {props.total_pages} pages
        </small>
      </p>
        <ul className="pagination pagination-sm d-flex justify-content-center">
          <li
            className={
              "page-item" + (props.previous_page === 1 ? " disabled" : "")
            }
          >
            <button
              className="page-link"
              onClick={props.firstPage}
              disabled={props.previous_page === 1}
            >
              &laquo;
            </button>
          </li>
          <li
            className={
              "page-item" + (props.previous_page === 1 ? " disabled" : "")
            }
          >
            <button
              className="page-link"
              onClick={props.nextPage}
              disabled={props.previous_page === 1}
            >
              Prev
            </button>
          </li>
          <li
            className={
              "page-item" + props.current_page === props.total_pages
                ? " disabled"
                : ""
            }
          >
            <button
              className="page-link"
              onClick={props.nextPage}
              disabled={props.current_page === props.total_pages}
            >
              Next
            </button>
          </li>

          <li
            className={
              "page-item" + props.current_page === props.total_pages
                ? " disabled"
                : ""
            }
          >
            <button
              className="page-link"
              onClick={props.lastPage}
              disabled={props.current_page === props.total_pages}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return <div />;
  }
};

export default Pagination;
