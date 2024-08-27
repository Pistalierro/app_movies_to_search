const siteUrl = 'https://www.omdbapi.com/'

let moviesList = null
let inputSearch = null
let searchLust = null
let triggerMode = false

const createElement = ({
	                       tagName,
	                       attrs,
	                       container = null,
	                       position = 'append',
	                       evt = null,
	                       handler = null
                       }) => {
	const el = document.createElement(tagName)
	Object.keys(attrs).forEach((key) => {
		if (key !== 'innerHTML') el.setAttribute(key, attrs[key])
		else el.innerHTML = attrs[key]
	})

	if (container && position === 'append') container.append(el)
	if (container && position === 'prepend') container.prepend(el)

	if (evt && handler && typeof handler === 'function') el.addEventListener(evt, handler)

	return el
}

const createStyle = () => {
	createElement({
		tagName: 'style',
		attrs: {
			innerHTML:
				`
			*::before,
*::after,
* {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

body {
  margin: 0;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}

.container {
  max-width: 992px;
  margin: 0 auto;
  padding: 20px;
}

.movies {
  display: grid;

  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.movie {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  -ms-flex-line-pack: center;
  align-content: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.movie__image {
  width: 100%;

  -o-object-fit: cover;
     object-fit: cover;
}

.search__box:last-of-type {
  margin-top: 10px;
  margin-bottom: 30px;
}
.search__input {
  display: block;

  width: 100%;
  max-width: 400px;
  padding: 10px 15px;

  border: 1px solid lightsteelblue;
  border-radius: 4px;
}
.search__label-input {
  display: block;

  margin-bottom: 7px;
}
.search__label-checkbox {
  display: inline-block;

  -webkit-transform: translate(5px, -1px);
      -ms-transform: translate(5px, -1px);
          transform: translate(5px, -1px);
}

			`
		},
		container: document.head
	})
}

const createMarkup = () => {
	const container = createElement({
		tagName: 'div',
		attrs: {class: 'container'},
		container: document.body,
		position: 'prepend'
	})
	createElement({
		tagName: 'h1',
		attrs: {innerHTML: 'Приложение для поиска фильмов'},
		container
	})

	const searchContainer = createElement({
		tagName: 'div',
		attrs: {class: 'search'},
		container
	})
	const searchBoxInput = createElement({
		tagName: 'div',
		attrs: {class: 'search__box'},
		container: searchContainer
	})
	const searchBoxCheckBox = createElement({
		tagName: 'div',
		attrs: {class: 'search__box'},
		container: searchContainer
	})
	createElement({
		tagName: 'label',
		attrs: {class: 'search__label-input', for: 'search', innerHTML: 'Поиск фильмов'},
		container: searchBoxInput
	})
	inputSearch = createElement({
		tagName: 'input',
		attrs: {class: 'search__input', type: 'search', id: 'search', placeholder: 'Начните вводить название фильма...'},
		container: searchBoxInput
	})

	createElement({
		tagName: 'input',
		attrs: {class: 'search__checkbox', type: 'checkbox', id: 'checkbox'},
		container: searchBoxCheckBox,
		evt: 'click',
		handler: () => triggerMode = !triggerMode
	})
	createElement({
		tagName: 'label',
		attrs: {class: 'search__label-checkbox', for: 'checkbox', innerHTML: 'Добавить фильмы к существующему списку '},
		container: searchBoxCheckBox
	})

	moviesList = createElement({
		tagName: 'div',
		attrs: {class: 'movies'},
		container
	})
}

const addMoviesToList = (movie) => {
	const item = createElement({
		tagName: 'div',
		attrs: {class: 'movie'},
		container: moviesList
	})
	createElement({
		tagName: 'img',
		attrs: {
			class: 'movie__image',
			src: /^(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'assets/img/no-image.jpg',
			alt: movie.Title,
			title: movie.Title
		},
		container: item
	})
}

createMarkup()
createStyle()

const getData = (url) => fetch(url)
	.then(res => res.json())
	.then(json => {
		if (!json || !json.Search) throw Error('Сервер вернул не правильный объект')
		return json.Search
	})

const clearMoviesMarkup = (el) => el && (el.innerHTML = '')

const debounce = (() => {
	let timer = 0

	return (cb, ms) => {
		if (timer) {
			clearTimeout(timer)
			timer = null
		}
		timer = setTimeout(cb, ms);
	}
})()

const inputSearchHandler = (e) => {
	const searchString = e.target.value.trim();

	debounce(() => {
		if (searchString && searchString.length > 3 && searchString !== searchLust) {
			if (!triggerMode) clearMoviesMarkup(moviesList)
			getData(`${siteUrl}?apikey=9ef2c1f1&s=${searchString}`)
				.then(movies => movies.forEach(movie => addMoviesToList(movie)))
				.catch(err => console.error(err));
		}
		searchLust = searchString
	}, 2000)
}
inputSearch.addEventListener('keyup', inputSearchHandler)

