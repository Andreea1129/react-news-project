// Ne generam un api key la acest url https://bonobo.capi.gutools.co.uk/register/developer si il salvam intr-o constanta (nu este safe sa tinem api key-uri aici, de preferat este sa stea pe un server)
const API_KEY = "6d9a49cd-6855-42da-b986-83324ad33920";

// Definim functia care o sa ne returneze endpoint-ul pentru o a anumita categorie de stiri. 
export function getNewsCategoriesEndpoint(
    category,
    pageNumber = 1, // parametrul pageNumber va avea valoarea default 1 in cazul in care el nu este trimis cand se apeleaza functia getNewsCategoriesEndpoint
    pageSize = 20 // pageSize va avea valoare default 20 daca el nu va fi trimis ca argument cand se apeleaza functia
){
    // Construim query string-ul care va fi trimis la API si va contine api-key-ul, sectiunea de stire (section), optiunea de afisare a tututor campurilor unei stiri (show-fiels), numarul de stiri returnate (page-size) si numarul paginii (page)
    const queryString = `?api-key=${API_KEY}&section=${category}&show-fields=all&page-size=${pageSize}&page=${pageNumber}`;

    // Returnam link-ul aferent API-ului de la The Guardian
    return `https://content.guardianapis.com/search${queryString}`;
}

// Definim functia care returneaza endpoint-ul pentru o stire singulara
export function getNewsDetailsEnpoint(newsId) {
    // Construim query string-ul care va contine api-key-ul si show-fields=all (sa ne dea toate detaliile stirii)
    const queryString = `?api-key=${API_KEY}&show-fields=all`;

    return `https://content.guardianapis.com/${newsId}${queryString}`;
}