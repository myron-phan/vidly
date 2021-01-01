import React, { Component } from "react";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
	state = {
		movies: getMovies(),
		pageSize: 4,
		currentPage: 1,
	};

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies]; //this uses the same reference, so we need to clone movies
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked; //this will serve as a toggle function
		this.setState({ movies });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	render() {
		const { length: count } = this.state.movies;
		const { pageSize, currentPage, movies: allMovies } = this.state;

		if (count === 0) return <p>There are no movies in the database.</p>;

		const movies = paginate(allMovies, currentPage, pageSize);

		return (
			<React.Fragment>
				<p>Showing {count} movies in the database.</p>
				<table className="table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Genre</th>
							<th>Stock</th>
							<th>Rate</th>
							<th></th>
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
										liked={movie.liked} //this feeds into "like.jsx" so that itll know if this particular movie was liked or not
										onLike={() => this.handleLike(movie)} // this is a prop that can be triggered by something (clicking) or whatever else condition
									/>
								</td>
								<td>
									<button
										onClick={() => this.handleDelete(movie)}
										className="btn btn-danger btn-sm"
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
					onPageChange={this.handlePageChange}
					currentPage={currentPage}
				/>
			</React.Fragment>
		);
	}
}

export default Movies;
