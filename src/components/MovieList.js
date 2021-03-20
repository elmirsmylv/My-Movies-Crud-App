import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = (props) =>{

    const truncateOverview = (string, maxlength) => {
        if(!string) return null;
        if(string.length <= maxlength) return string;
        return `${string.substring(0,maxlength)} ...`;
    }
    
        return(
            <div className="row">
                {props.movies.map((movie,i) => (
                    <div className="col-lg-4" key={i}>
                        <div className="card mb-4 shadow-sm">
                            <img className="card-img-top" src={movie.imageURL} alt={movie.name}/>
                            <div className="card-body">
                                <h5 className="card-title">{movie.name}</h5>
                                <p className="card-text">{truncateOverview(movie.overview, 100)}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button onClick={() => props.deleteMovieProp(movie)} className="btn btn-md btn-outline-danger" type="button">Delete</button>
                                    <Link to={`/edit/${movie.id}`}>
                                    <button style={{position:"relative", right:"100%"}} className="btn btn-md btn-outline-primary">Edit</button>
                                    </Link>
                                    <h5><span className="badge badge-info">{movie.rating}</span></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        )
    }


export default MovieList;