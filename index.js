//========config for autocomplete
const autoCompleteConfig = {
	renderOption (movie) {
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
                <img src="${imgSrc}" />
                ${movie.Title} (<b>${movie.Year}</b>)
            `;
	},

	inputValue (movie) {
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
};

createAutoComplete({
	...autoCompleteConfig, //spread
	root           : document.querySelector('#left-autocomplete'),
	onOptionSelect (movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#left-summary'));
	}
});
createAutoComplete({
	...autoCompleteConfig,
	root           : document.querySelector('#right-autocomplete'),
	onOptionSelect (movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#right-summary'));
	}
});

//=======================getting data from clicked movie===================
const onMovieSelect = async (movie, summaryElement) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : '187db6ca',
			i      : movie.imdbID
		}
	});
	summaryElement.innerHTML = movieTemplate(response.data);
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
