//==============AUTOCOMPLETE IS NOW REUSEABLE====================
createAutoComplete({
	root           : document.querySelector('.autocomplete'),
	renderOption (movie) {
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
                <img src="${imgSrc}" />
                ${movie.Title} (<b>${movie.Year}</b>)
            `;
	},
	onOptionSelect (movie) {
		onMovieSelect(movie);
	},
	inputValue (movie) {
		s;
		return movie.Title;
	},
	async fetchData (searchTerm) {
		const response = await axios.get('http://www.omdbapi.com/', {
			params : {
				apikey : '187db6ca',
				s      : searchTerm
			}
		});

		if (response.data.Error) {
			return [];
		}

		return response.data.Search;
	}
});

//=======================getting data from clicked movie===================
const onMovieSelect = async (movie) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '187db6ca',
			i      : movie.imdbID
		}
	});
	document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};
//======================display movie data==================================
const movieTemplate = (movieDetail) => {
	return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}"/>
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitile">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitile">Box Office</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitile">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitile">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitile">IMDB Votes</p>
        </article>
    `;
};
