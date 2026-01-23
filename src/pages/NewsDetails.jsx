import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getNewsDetailsEnpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsDetails } from "../api/adaptors";
import { getFormattedDate } from "../utils/date";
import {Container, Col, Row, Button, Alert} from "react-bootstrap";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
import './NewsDetails.css';
import { addToFavorites } from "../store/actions";
import { useContext, useState } from "react";
import { FavouritesContext } from "../store/context";

export default function NewsDetails() {
	// Extragem functia care poate modifica state-ul global de stiri favorite
	const {favoritesDispatch}= useContext(FavouritesContext);
	// Extragem parametrul ci id-ul stirii din URL
	let { newsId } = useParams();
	// Trebui sa decodam id-ul extras din url pentru ca vrem sa contina si /-urile
	newsId = decodeURIComponent(newsId);
	// Ne generam endpoint-ul pentru a face call-ul catre server-ul de la TheGuardian cu stirea singulara
	const newsDetailsEndpoint = getNewsDetailsEnpoint(newsId);
	// Facem call-ul catre server
	const newsDetails = useFetch(newsDetailsEndpoint);
	// Folosind design pattern-ul de Adapter o sa importam functia getNewsDetails pentru a adapta datele venite de la server
	const adaptedNewsDetails = getNewsDetails(newsDetails);
	// Facem un object desctruturing pentru a lua cheile din datele adaptate
	const {date, title, description, image, content, author, thumbnail} = adaptedNewsDetails;
	// Formatam data folosind utilitarul din folder-ul utils (date.js)
	const formattedDate = getFormattedDate(date);
	
	const [showAlert, setShowAlert] = useState(false);

	function handleAddToFavorites(news){
		// Apelam actiunea de adaugare la favorite
		const actionResult = addToFavorites(news);
		// Trimitem rezultatul actiunii catre reducer
		favoritesDispatch(actionResult);

		// Afisam alerta
		setShowAlert(true);

		// O ascundem dupa 2 secunde
		setTimeout(() => {
			setShowAlert(false);
		}, 2000);
	}

	return (
		<Layout>
			{showAlert && (
		<Alert
			variant="success"
			className="position-fixed top-0 start-50 translate-middle-x mt-3"
			style={{ zIndex: 1050 }}
		>
			Știrea a fost adăugată la favorite!
		</Alert>
	)}
			<Container className="my-5 newsDetails">
				<Row className="d-flex justify-content-center">
					<Col xs={12} lg={8}>
						<h1 className="pt-3 mb-5">{title}</h1>
						<p className="fw-bold">{description}</p>
						{/* De la API-ul The Guardian imaginea o sa vina fub forma de tag-uri de HTML (<figure>) - iar pentru a afisa html intr-o componenta de React avem nevoie de prop-ul dangerouslySetInnerHTML */}
						<div dangerouslySetInnerHTML={{__html: image}} className="mb-4"></div>
						<div className="d-flex justify-content-between align-items-center mb-4">
							<div className="fw-bold">
								<p>{author}</p>
								<p className="mb-0">{formattedDate}</p>
							</div>
							<Button onClick={()=>{
								// Construim payload-ul actiunii pentru adaugare la favorite si apelam o functie care o sa trimita actiunea la reducer
								const newsPayload = {
									id: newsId,
									thumbnail,
									title,
									description,
									hasCloseButton: true
								}
								handleAddToFavorites(newsPayload);
							}}>Adaugă la favorite</Button>
						</div>
						{/* Pentru ca content-ul de la API este tot sub format html o sa il inseram la fel cum am inserat imaginea mai sus */}
						<div dangerouslySetInnerHTML={{__html:content}}></div>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
}
