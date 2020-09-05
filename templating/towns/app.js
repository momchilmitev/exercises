window.addEventListener('load', async function () {
	const root = document.getElementById('root');
	const input = document.getElementById('towns');
	const loadBtn = document.getElementById('btnLoadTowns');

	// Loading the template - text
	const mainTemplate = await (await fetch('./templates/main.hbs')).text();
	const townPartial = await (await fetch('./templates/town.hbs')).text();
	Handlebars.registerPartial('town', townPartial);

	loadBtn.addEventListener('click', renderTowns);

	function renderTowns(e) {
		e.preventDefault();
		const towns = input.value.split(', ');

		// Compiling the template - function
		const templateFn = Handlebars.compile(mainTemplate);
		// Executing the template with our data - HTML
		const html = templateFn({ towns });
		// Inserting the HTML in the DOM
		root.innerHTML = html;
	}
});
