const siteUrl = 'https://www.omdbapi.com/'
const searchString = 'Iron man'

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
		el.setAttribute(key, attrs[key])
		if (key !== 'innerHTML') el.setAttribute(key, attrs[key])
		else el.innerHTML = attrs[key]
	})

	if (container && position === 'append') container.append(el)
	if (container && position === 'prepend') container.prepend(el)

	return el
}

const createMarkup = () => {
	const container = createElement({
		tagName: 'div',
		attrs: {class: 'container'},
		container: document.body,
		position: 'prepend'
	})
	console.log(container)
}

createMarkup()


const getData = (url) => fetch(url)
	.then(res => res.json())
	.then(json => {
		if (!json || !json.Search) throw Error('Сервер вернул не правильный объект')
		return json.Search
	})

getData(`${siteUrl}?apikey=9ef2c1f1&s=${searchString}`)
	// .then(movies => movies.forEach(movie => console.log(movie)))
	.catch(err => console.error(err));