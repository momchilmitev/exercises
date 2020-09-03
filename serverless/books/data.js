const appId = 'BA890A12-D286-C316-FF98-58D21280C700';
const restApiKey = 'A289E8C4-BFFE-4C58-8204-40C7C037D554';

async function url(endpoint) {
	return `https://api.backendless.com/${appId}/${restApiKey}/data/${endpoint}`;
}

async function getAllBooks() {
	const response = await fetch(url('books'));
	const data = await response.jason();
	return data;
}

async function createBook(book) {
	const response = await fetch(url('books'), {
		method: 'POST',
		body: JSON.stringify(book),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();
	return data;
}

async function updateBook(book) {
	const id = book.objectId;
	const response = await fetch(url('books/' + id), {
		method: 'PUT',
		body: JSON.stringify(book),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();
	return data;
}

async function deleteBook(id) {
	const response = await fetch(url('books/' + id), {
		method: 'DELETE',
	});
	const data = await response.json();
	return data;
}
