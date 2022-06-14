const button = document.querySelector('.search-button');
const inputEl = document.querySelector('.input');
const moviesContainer = document.querySelector('.movies-container');
const queryUrl = 'https://api.themoviedb.org/3/search/movie?api_key=083b1242cb5596b7b144e74dd743b630&query=';
const imageUrl = 'https://image.tmdb.org/t/p/w500';
const popularUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=083b1242cb5596b7b144e74dd743b630';


function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError)
}

function showPopularMovies() {
    requestMovies(popularUrl, renderSearchMovies, handleError)
}

showPopularMovies();

function searchMovie(value) {
    const url = queryUrl + value;
    requestMovies(url, renderSearchMovies, handleError);
}

function handleError(error) {
    console.log('Error: ', error);
}

function showSearchableMovies(event) {
    if (inputEl.value !== '') {
        event.preventDefault();
        const value = inputEl.value;
        searchMovie(value);
    }
}

button.addEventListener('click', showSearchableMovies);

function renderSearchMovies(data) {
    moviesContainer.innerHTML = '';
    const movies = data.results;
    const movieBlock = getMovies(movies);
    moviesContainer.appendChild(movieBlock);
}

function getMovies(movies) {
    const movieElements = document.createElement('div');
    movieElements.setAttribute('class', 'movies');
    movies.forEach(movie => {
        if (movie.poster_path) {
            const movieElement = document.createElement('div');
            movieElement.setAttribute('class', 'movie');
            const image = document.createElement('img');
            image.setAttribute('class', 'image')
            const overview = document.createElement('div');
            overview.setAttribute('class', 'overview');
            const overviewHeading = document.createElement('h3');
            overviewHeading.setAttribute('class', 'overview-heading');
            const overviewInfo = document.createElement('div');
            overviewInfo.setAttribute('class', 'overview-info');
            const info = document.createElement('div');
            info.setAttribute('class', 'info');
            const title = document.createElement('h3');
            title.setAttribute('class', 'movie-title');
            const averageVote = document.createElement('span');

            averageVote.setAttribute('class', `${getColor(movie.vote_average)} vote-average`);
            title.innerHTML = movie.title;
            averageVote.innerHTML = movie.vote_average;
            image.src = imageUrl + movie.poster_path;
            image['alt'] = movie.title;
            overviewHeading.innerHTML = 'Overview';
            overviewInfo.innerHTML = movie.overview;

            info.append(title);
            info.append(averageVote);
            movieElement.append(info);
            movieElement.append(image);
            overview.append(overviewHeading);
            overview.append(overviewInfo);
            movieElement.append(overview);

            movieElements.append(movieElement);
        }
    })
    return movieElements;
}

function getColor(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }

}



