import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";

class Movies extends Component {
  state = { movies: getMovies(), pageSize: 4, currentPage: 1 };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  render() {
    const count = this.state.movies.length;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <div>
        {count === 0 ? (
          <h1>There are no movies</h1>
        ) : (
          <>
            <h1>There are {count} movies in the database</h1>
            <div className="row">
              <div className="col-3 mt-4">
                <ListGroup />
              </div>
              <div className="col-9">
                <table width="100%" className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Genre</th>
                      <th>In Stock</th>
                      <th>Rental rate</th>
                      <th>Like</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {movies.map((movie) => (
                      <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>
                          <Like
                            liked={movie.liked}
                            onClick={() => this.handleLike(movie)}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              deleteMovie(movie._id);
                              // handleDeleteMovies();
                              this.setState({ movies: getMovies() });
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  itemsCount={count}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
  handlePageChange = (page) => {
    const currentPage = page;
    this.setState({ currentPage });
  };
}

export default Movies;
