const printModel = require('./print.js');
const { printCocktailsBegginingWhithLetter, printExtravagantCocktails, printPrettyCoctails } = printModel;
const fetch = require('node-fetch');

const checkIsExtravagantCocktail = (cocktail) => cocktail['strIngredient5'] != null;

const getArrayOfIngredientsToArray = (cocktail) => {
	return Object.entries(cocktail)
		.filter(([ key, value ]) => key.startsWith('strIngredient') && value != null)
		.map(([ key, value ]) => value);
};

const getArrayOfIngredientsAndQuantitiesToArray = (cocktail) => {
	return Object.entries(cocktail)
		.filter(([ key, value ]) => key.startsWith('strIngredient') && value != null)
		.map(([ key, value ], index) => ({
			name: value,
			quantity: cocktail[`strMeasure${index + 1}`]
		}));
};

const prettifyCocktailsResult = ({ cocktails, ingredientsWithQuantities = false }) => {
	return cocktails.map((cocktail) => {
		const { idDrink: id, strDrink: name } = cocktail;

		const ingredients = ingredientsWithQuantities
			? getArrayOfIngredientsAndQuantitiesToArray(cocktail)
			: getArrayOfIngredientsToArray(cocktail);

		return {
			id,
			name,
			ingredients
		};
	});
};

const showCockTailsWithIngredientsQuantities = ({ cocktails }) => {
	const ingredientsWithQuantities = true;
	const prettyCocktails = prettifyCocktailsResult({cocktails, ingredientsWithQuantities})

	printPrettyCoctails({cocktails: prettyCocktails, title:'** Cocktails with ingredients quantities:**'});
};

const showAlcochilicAndNonAlcoholicCockTails = ({ cocktails }) => {
    const strAlcoholic = 'Alcoholic'
    const isAlcoholic = cocktail => cocktail.strAlcoholic == strAlcoholic
	let alcoholic = cocktails.filter(isAlcoholic)
    let nonAlcoholic = cocktails.filter(cocktail => !isAlcoholic(cocktail))

	const prettyAlcoholic = prettifyCocktailsResult({cocktails: alcoholic, ingredientsWithQuantities: true})
	const prettyNoAlcoholic = prettifyCocktailsResult({cocktails: nonAlcoholic, ingredientsWithQuantities: true})

	printPrettyCoctails({cocktails: prettyAlcoholic, title:'Alcoholic ✔'})
	printPrettyCoctails({cocktails: prettyNoAlcoholic, title:'Non Alcoholic'})
};

fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=g').then((res) => res.json()).then(({ drinks }) => {
	const cocktailsNames = drinks.map((drink) => `"${drink.strDrink}"`);
	printCocktailsBegginingWhithLetter('G', cocktailsNames)

	const extravagantCocktail = drinks.filter(checkIsExtravagantCocktail)
	printExtravagantCocktails({cocktails: extravagantCocktail});

	const prettyCoctails = prettifyCocktailsResult({cocktails: drinks});
	printPrettyCoctails({ cocktails: prettyCoctails});

	showCockTailsWithIngredientsQuantities({cocktails: drinks});
	showAlcochilicAndNonAlcoholicCockTails({cocktails: drinks});
});
