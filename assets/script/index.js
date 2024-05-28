'use strict';

import movies from './movies-info.js';
import { onEvent, select } from './utils.js';

/* - - - - - SELECTIONS - - - - - */
const searchInput = select('.searchInput');
const dropdown = select('.dropdown');
const searchBtn = select('.btn-search');
const movieImg = select('.movie-img');
const title = select('.title');
const year = select('.year');
const duration = select('.duration');
const summary = select('.summary');
const genres = select('.genres');
const circleElement = select(".time .fa-circle");

/* - - - - - MAIN CODE - - - - - */

/* - - - - - SEARCH  - - - - - */
function handleSearchInput(searchInput, dropdown) {
    const searchQuery = searchInput.value.trim().toLowerCase(); 
    if (searchQuery === '') {
        hideDropdown(dropdown); 
    } else {
        const filteredMovies = filterMovies(searchQuery);
        updateDropdown(dropdown, filteredMovies.slice(0, 5), searchInput);
    }
}

function filterMovies(searchQuery) {
    return movies.filter(movie => movie.title.toLowerCase().includes(searchQuery));
}

function updateDropdown(dropdown, movies, searchInput) {
    clearDropdown(dropdown);
    if (movies.length === 0) {
        showNoMatchFound(dropdown);
        return;
    }
    populateDropdown(dropdown, movies, searchInput);
    showDropdown(dropdown);
}

function clearDropdown(dropdown) {
    dropdown.innerHTML = '';
}

function hideDropdown(dropdown) {
    dropdown.classList.remove('visible');
}

function showDropdown(dropdown) {
    dropdown.classList.add('visible');
}

function showNoMatchFound(dropdown) {
    const item = document.createElement('div');
    item.classList.add('dropdown-item', 'no-click');
    item.textContent = 'No match found';
    dropdown.appendChild(item);
    showDropdown(dropdown);
}

function populateDropdown(dropdown, movies, searchInput) {
    movies.forEach(movie => {
        const item = createDropdownItem(movie.title, searchInput, dropdown);
        dropdown.appendChild(item);
    });
}

function createDropdownItem(title, searchInput, dropdown) {
    const item = document.createElement('div');
    item.classList.add('dropdown-item');
    item.textContent = title;
    item.addEventListener('click', () => {
        searchInput.value = title;
        hideDropdown(dropdown);
    });
    return item;
}

/* - - - Movies- Info - - - - */
function updateMovieImage(selectedMovie) {
    movieImg.innerHTML = `<img src="${selectedMovie.poster}" alt="${selectedMovie.title}">`;
}

function updateMovieInfo(selectedMovie) {
    title.textContent = selectedMovie.title;
    year.textContent = selectedMovie.year;
    duration.textContent = selectedMovie.runningTime;
    summary.textContent = selectedMovie.description;
}

function updateMovieGenres(selectedMovie) {
    genres.innerHTML = '';

    selectedMovie.genre.forEach(genre => {
        const genreTag = document.createElement('span');
        genreTag.textContent = genre;
        genreTag.classList.add('genre-tag');
        genres.appendChild(genreTag);
    });
}

function updateCircleVisibility() {
    if (year.textContent.trim() && duration.textContent.trim()) {
        circleElement.style.display = 'inline';
    } else {
        circleElement.style.display = 'none';
    }
}

function updateMovieDetails(selectedMovie) {
    updateMovieImage(selectedMovie);
    updateMovieInfo(selectedMovie);
    updateMovieGenres(selectedMovie);
    updateCircleVisibility();
}


/* - - - - - EVENTS - - - - - */
onEvent('load', window, () => {
    searchInput.value = ''; 
});

onEvent('input', searchInput, () =>{
    handleSearchInput(searchInput, dropdown);
});

onEvent('click', searchBtn, () => {
    const selectedMovieTitle = searchInput.value.trim().toLowerCase();
    const selectedMovie = movies.find(movie => movie.title.toLowerCase() === selectedMovieTitle);
    if (selectedMovie) {
        updateMovieDetails(selectedMovie);
    }
});

