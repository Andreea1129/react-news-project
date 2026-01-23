// Exportam functia care adapteaza datele primite de la API pentru o categorie de stiri
export function getNewsList(apiResponse) {
    // Daca raspunsul de la API nu contine date atunci o sa returnam un array gol
    if (!apiResponse || !apiResponse.response) {
        return [];
    }

    // Extragem datele doar cu stirile din raspunsul de la API
    const rawNewsList = apiResponse.response.results;
    // Iteram prin stiri si transformam datele in formatul in care avem noi nevoie
    const adaptedNewsList = rawNewsList.map((currentIteratedNews) => {
        return {
            id: currentIteratedNews.id,
            thumbnail: currentIteratedNews.fields.thumbnail,
            title: currentIteratedNews.fields.headline,
            description: currentIteratedNews.fields.trailText
        }
    });

    // Dupa ce am adaptat raspunsul de la API, trebuie doar sa intoarcem datele
    return adaptedNewsList;
}

// Exportam functia care adapteaza datele primite de la API pentru o stire singulara
export function getNewsDetails(apiResponse){
    // Daca raspunsul de la API nu contine date atunci o sa returnam un array gol 
    if(!apiResponse || !apiResponse.response) {
        return [];
    }

    // Extragem datele necesare din raspunsul de la API:
    const rawNewsDetails = apiResponse.response.content;
    // Din cheia content de mai jos o sa extragem doar campurile necesare si o sa le salvam in cheile corespunzatoare
    const adaptedNewsDetails = {
        date: rawNewsDetails.webPublicationDate,
        title: rawNewsDetails.fields.headline,
        description: rawNewsDetails.fields.trailText,
        image: rawNewsDetails.fields.main,
        content: rawNewsDetails.fields.body,
        author: rawNewsDetails.fields.byline,
        thumbnail: rawNewsDetails.fields.thumbnail
    }

    // Returnam datele adaptate
    return adaptedNewsDetails;
}