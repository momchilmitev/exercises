window.addEventListener('load', async function () {
	// Variables
	const root = document.getElementById('allCats');
	// Initialize templates
	const mainString = await (await fetch('./main.hbs')).text();
	const catString = await (await fetch('./cat.hbs')).text();
	Handlebars.registerPartial('cat', catString);
	const mainTemplateFn = Handlebars.compile(mainString);

	// Render HTML
	const html = mainTemplateFn({ cats });
	root.innerHTML = html;

	// Set up interaction
	root.addEventListener('click', onClick);

	function onClick(e) {
		const btn = e.target;
		const infoDiv = e.target.parentNode.querySelector('.status');

		if (btn.className === 'showBtn') {
			btn.textContent =
				btn.textContent === 'Show status code'
					? 'Hide status code'
					: 'Show status code';
			infoDiv.style.display =
				infoDiv.style.display === 'none' ? 'block' : 'none';
		}
	}
});
