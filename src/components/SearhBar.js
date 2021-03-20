import React from "react";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  state = {
    searchQuery: "",
  };

  handleFromSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleFromSubmit}>
        <div className="form-row mb-5">
          <div className="col-10">
            <input
              onChange={this.props.searchMovieProp}
              type="text"
              placeholder="Search a movie"
              className="form-control"
            ></input>
          </div>
          <div className="col-2">
            <Link to="/add">
              <button
                type="button"
                className="btn btn-md btn-danger"
                style={{ float: "right" }}
              >
                Add Movie
              </button>
            </Link>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;
