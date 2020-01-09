const createAutoComplete = ({ root }) => {
	root.innerHTML = `
        <label><b>Search For a Movie</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results">
                </div>
            </div>
        </div>
    `;
	//======================================================
	//===============Creating Dropdown======================
	const input = root.querySelector('input');
	const dropdown = root.querySelector('.dropdown');
	const resultsWrapper = root.querySelector('.results');

	const onInput = async (event) => {
		const movies = await fetchData(event.target.value);

		if (!movies.length) {
			dropdown.classList.remove('is-active');
			return;
		}

		resultsWrapper.innerHTML = '';

		dropdown.classList.add('is-active');
		for (let movie of movies) {
			const option = document.createElement('a');
			const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

			option.classList.add('dropdown-item');
			option.innerHTML = `
                <img src="${imgSrc}" />
                ${movie.Title} (<b>${movie.Year}</b>)
            `;
			//show Title when clicked
			option.addEventListener('click', () => {
				dropdown.classList.remove('is-active');
				input.value = movie.Title;
				onMovieSelect(movie);
			});

			resultsWrapper.appendChild(option);
		}
	};
	//==================================================================
	//when typing in input          restrict API requests(in utils.js)
	input.addEventListener('input', debounce(onInput, 500));

	//make dropdown disappear if click outside
	document.addEventListener('click', (event) => {
		if (!root.contains(event.target)) {
			dropdown.classList.remove('is-active');
		}
	});
};
