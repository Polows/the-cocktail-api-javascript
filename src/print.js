const extractCocktailsNames = cocktails => cocktails.map(cocktail => cocktail.strDrink)

const printCocktailsBegginingWhithLetter = (letter, cocktails) => {
    const cockTailsNames = extractCocktailsNames(cocktails)

    console.log(`** Coktails beginning with ${letter}: **

    Totals: ${cocktails.length}
    Names: ${cockTailsNames.join(', ')}

    
    `)
}

const printExtravagantCocktails = ( {cocktails}) => {
    const cockTailsNames = extractCocktailsNames(cocktails)
    console.log(`** Coktails with more than 4 ingredients: **

    Names: 
    ${cockTailsNames.join('\n')}
    `)
}

const printPrettyCoctails = ({cocktails, title = '** Cocktails with just id/name/ingredients:**'}) => {
    const listOfCocktails = cocktails.map(c => JSON.stringify(c)).join('\n\n')
    
    console.log(`${title}

    ${listOfCocktails}

    `)   

}

module.exports = {printCocktailsBegginingWhithLetter, printExtravagantCocktails, printPrettyCoctails};