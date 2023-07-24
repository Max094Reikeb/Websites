function searchMovies() {
    var query = document.getElementById('search-input').value;
    if (query === '') {
        // If the search bar is empty, show the latest movies
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=66bbbec74be84702eebab7c21a8e3830')
            .then(response => response.json())
            .then(data => {
                displayMovies(data.results);
            });
    } else {
        // If the search bar is not empty, search for movies
        fetch('https://api.themoviedb.org/3/search/movie?api_key=66bbbec74be84702eebab7c21a8e3830&query=' + query)
            .then(response => response.json())
            .then(data => {
                displayMovies(data.results);
            });
    }
}

function displayMovies(movies) {
    var results = document.getElementById('results');
    results.innerHTML = '';
    movies.forEach(movie => {
        var movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        var imgWrapper = document.createElement('div');
        imgWrapper.classList.add('img-wrapper');
        movieElement.appendChild(imgWrapper);

        var poster = document.createElement('img');
        poster.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
        imgWrapper.appendChild(poster);

        var services = document.createElement('div');
        services.setAttribute('data-jw-widget', '');
        services.setAttribute('data-api-key', 'ABCdef12');
        services.setAttribute('data-object-type', 'movie');
        services.setAttribute('data-title', movie.title);
        services.setAttribute('data-year', movie.release_date.split('-')[0]);
        services.setAttribute('data-theme', 'dark');
        services.setAttribute('data-scale', '0.9');
        services.setAttribute('data-no-offers-message', '');
        services.setAttribute('data-title-not-found-message', '')
        imgWrapper.appendChild(services);

        var title = document.createElement('p');
        title.textContent = movie.title;
        movieElement.appendChild(title);

        results.appendChild(movieElement);
    });

    // We need to call manually the script when the user searches for movies
    if (window.JustWatch && window.JustWatch.reloadWidgets) {
        window.JustWatch.reloadWidgets();
    }
}

// Call the searchMovies function when the page loads to display the latest movies
searchMovies();
