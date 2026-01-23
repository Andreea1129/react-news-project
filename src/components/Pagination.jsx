// Componenta Pagination o sa primeasca 2 props: activePage(pagina curenta) si baseUrl(url-ul complet al paginii pe care trebuie sa o deschida)

import { useNavigate } from "react-router-dom";
import { Pagination as BootstrapPagination} from "react-bootstrap";
import './Pagination.css';
export function Pagination (props){
    // Facem destructuring la props
    const { baseUrl} = props;
    let {activePage}=props;
    // Ca sa pastram aceeasi functionalitate de la componenta Link (fara refresh la pagina), o sa folosim hook-ul de useNavigate din react
    const navigate = useNavigate();

    // Daca nu se primeste nici o valoare pentru prop-ul activePage, inseamna ca pagina 1 este activa
    if(!activePage){
        activePage=1;
    }

    // O sa pastram intr-un array toate paginile pe care o sa le trimitem mai departe la paginarea din bootstrap
    let items = [];
    // O sa folosim un for pentru a construi cele 5 numerotari
    for (let number = 1; number<=5; number++){
        // La fiecare iteratie in for vom face push in items cu o componenta de BootstrapPagination.Item
        items.push(
            <BootstrapPagination.Item
                key={number}
                // prop-ul active va fi true daca pagina curenta este cea activa
                active={number === Number(activePage)}
                // daca pagina este activa, adaugam un id pentru stilizare
                id={activePage? 'pagination-active' : null}
                onClick={ () => {
                    // La click pe numar
                    navigate(`${baseUrl}?page=${number}`);
                    // Si apoi scrollam inapoi in varful paginii
                    window.scrollTo({
                        top:0,
                        behavior: 'smooth'
                    })
                }}
                >

                    {number}
                </BootstrapPagination.Item>,
        );
    }
    // console.log(items);
    // Returnam html-ul
    return (
        <div className="d-flex justify-content-center">
            {/* Pentru a afisa itemii de numerotare de mai sus, folosim componenta BootstrapPagination */}
            <BootstrapPagination clame="Pagination">{items}</BootstrapPagination>
        </div>
    )
    
}
