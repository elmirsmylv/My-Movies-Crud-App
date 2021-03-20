import axios from "axios";
import React from "react";
import AddMovie from "./components/AddMovie";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearhBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditMovie from "./components/EditMovie";

require("dotenv").config();

class App extends React.Component {
  state = {
    movies: [],
    searchQuery: "",
  };

  //FETCH API GET REQUEST
  // async componentDidMount(){
  //   const url = await fetch("http://localhost:3001/movies");
  //   const data = await url.json();
  //   this.setState(state =>({movies:data}));
  // }

  //AXIOS ILE GET REQUEST
  componentDidMount() {
    this.getMovies(); 
    console.log();
  }

  async getMovies(){
    const response = await axios.get("http://localhost:3001/movies");

    this.setState({ movies: response.data });
  }

  //FETCH API ILE DELETE REQUEST
  // deleteMovie = async (movie) =>{
  //   const url = `http://localhost:3001/movies/${movie.id}`
  //   await fetch(url,{
  //     method:"DELETE"
  //   })

  //   const newMovieList = this.state.movies.filter(
  //     (m) => m.id !== movie.id
  //   );

  //   this.setState(state =>({
  //     movies:newMovieList
  //   }))

  // }

  //AXIOS ILE DELETE REQUEST
  deleteMovie = async (movie) => {
    axios.delete(`http://localhost:3001/movies/${movie.id}`);

    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);

    this.setState((state) => ({
      movies: newMovieList,
    }));
  };

  //DELETE MOVIE
  // deleteMovie = (movie) =>{
  //   const newMovieList = this.state.movies.filter(
  //     (m) => m.id !== movie.id
  //   );

  //   this.setState(state =>({
  //     movies:newMovieList
  //   }))

  // }

  //SEARCH MOVIE
  searchMovie = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  //ADD MOVIE
  addMovie = async (movie) => {
    await axios.post("http://localhost:3001/movies", movie);
    this.setState((state) => ({
      movies: state.movies.concat([movie]),
    }));
    this.getMovies();
  };

  //EDIT MOVIE
  editMovie = async (id, updatedMovie) => {
    await axios.put(`http://localhost:3001/movies/${id}`, updatedMovie);
    this.getMovies();
  };

  render() {
    let filteredMovies = this.state.movies
      .filter((movie) => {
        return (
          movie.name
            .toLowerCase()
            .indexOf(this.state.searchQuery.toLowerCase()) !== -1
        );
      })
      .sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
      });

    return (
      <Router>
        <div className="container mb-4 shadow-sm">
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <React.Fragment>
                  <div className="row">
                    <div className="col-lg-12" style={{ marginTop: "25px" }}>
                      <SearchBar searchMovieProp={this.searchMovie} />
                    </div>
                  </div>
                  <MovieList
                    movies={filteredMovies}
                    deleteMovieProp={this.deleteMovie}
                  />
                </React.Fragment>
              )}
            ></Route>

            <Route
              path="/add"
              render={({ history }) => (
                <AddMovie
                  onAddMovie={(movie) => {
                    this.addMovie(movie);
                    history.push("/");
                  }}
                />
              )}
            ></Route>

            <Route
              path="/edit/:id"
              render={(props) => (
                <EditMovie
                  {...props}
                  onEditMovie={(id, movie) => {
                    this.editMovie(id, movie);
                  }}
                />
              )}
            ></Route>

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
