// Aici avem componenta reutilizabila NewsCard care afiseaza date despre o stire 
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { removeFromFavorites } from '../store/actions';
import { useContext } from 'react';
import { FavouritesContext } from '../store/context';
import './NewsCard.css';

export function NewsCard(props){
    // Extragem functia de dispatch care ne permite modificarea state-ului de stiri favorite
    const {favoritesDispatch} = useContext(FavouritesContext);
    // Extragem props-urile componentei:
    const {newsId, imgSrc, title, description, hasCloseButton} = props;

    function handleRemoveFromFav(id){
        // Apelam actiunea de stergere de la favorite
        const actionResult = removeFromFavorites(id);
        // Trimitem rezultatul actiunii catre reducer
        favoritesDispatch(actionResult);
    }
    return (
        <Card className='NewsCard h-100 d-flex flex-column justify-content-between align-items-center'>
            {/* La click pe continutul card-ului se va deschide pagina cu stirea singulara */}
            {/* Caracterul / din id-ul stirii il deruteaza - asadar il codificam */}
            <Link to={`/news/${encodeURIComponent(newsId)}`}>
                <Card.Img src={imgSrc} variant='top' />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Body>{description}</Card.Body>
                </Card.Body>
            </Link>
                {/* Daca avem buton de stergere de la favorite, atunci il afisam */}
                {hasCloseButton && (
                    <Button variant='light' onClick={()=>{handleRemoveFromFav(newsId)}}>
                        <span className='material-icons text-dark'>close</span>
                    </Button>
                )}
            
        </Card>
    )
}