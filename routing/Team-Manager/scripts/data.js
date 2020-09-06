const appId = '7B639C51-2C5E-B9D6-FF7C-CD76CE07FA00';
const restId = 'FB510AF4-0AEA-4095-A310-F6D9B0EB095E';

const endpoints = {
	register: 'users/register',
	login: 'users/login',
	teams: 'data/teams',
	updateUser: 'users/',
	logout: 'users/logout',
};

function genUrl(endpoint) {
	return `https://api.backendless.com/${appId}/${restId}/${endpoint}`;
}

export async function register(username, password) {
	const url = genUrl(endpoints.register);
	return (
		await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})
	).json();
}

export async function login(username, password) {
	const url = genUrl(endpoints.login);
	return (
		await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				login: username,
				password,
			}),
		})
	).json();
}

export async function logout() {
	const url = genUrl(endpoints.logout);

	const token = localStorage.getItem('userToken');

	if (!token) {
		throw new Error('User is not logged in!');
	}

	return fetch(url, {
		method: 'GET',
		headers: {
			'user-token': token,
		},
	});
}

export async function createTeam(team) {
	const url = genUrl(endpoints.teams);
	const token = localStorage.getItem('userToken');

	if (!token) {
		throw new Error('User is not logged in!');
	}

	const result = await (
		await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'user-token': token,
			},
			body: JSON.stringify(team),
		})
	).json();

	if (result.hasOwnProperty('errorData')) {
		const error = new Error();
		Object.assign(error, result);
		throw error;
	}

	const userUpdateResult = await setUserTeamId(result.ownerId, result.objectId);

	if (userUpdateResult.hasOwnProperty('errorData')) {
		const error = new Error();
		Object.assign(error, userUpdateResult);
		throw error;
	}

	return result;
}

export async function getTeams() {
	const url = genUrl(endpoints.teams);
	return (await fetch(url)).json();
}

export async function getTeamById(id) {
	const url = genUrl(endpoints.teams) + '/' + id;
	return (await fetch(url)).json();
}

async function setUserTeamId(userId, teamId) {
	const token = localStorage.getItem('userToken');
	const url = genUrl(endpoints.updateUser);

	if (!token) {
		throw new Error('User is not logged in!');
	}

	return (
		await fetch(url + userId, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'user-token': token,
			},
			body: JSON.stringify({ teamId }),
		})
	).json();
}
