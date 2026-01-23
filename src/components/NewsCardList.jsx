import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NewsCard } from "./NewsCard";

// Aceasta componenta va afisa carduri cu stirile pe care le primeste ca si props
function NewsCardList(props) {
	const { newsList } = props;

	return (
		// Folosim grid-ul de la bootstrap pentru a aseza stirile in pagina
		<Container>
			<Row>
				{/*  O sa afisam o coloana cu stiri - mapand prin lista de stiri, iar pentru fiecare stire o sa afisam un card de bootstrap*/}
				{newsList.map((currentIteratedNews) => {
					return (
						<Col
							xs={12}
							md={6}
							lg={4}
							className="mb-4"
							key={currentIteratedNews.id}
						>
							{/* O sa folosim componenta reutilizabila NewsCard care o sa primeasca toate datele despre stire */}
							<NewsCard
								newsId={currentIteratedNews.id}
								imgSrc={currentIteratedNews.thumbnail}
								title={currentIteratedNews.title}
								description={currentIteratedNews.description}
								hasCloseButton={currentIteratedNews.hasCloseButton}

							/>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
}

export default NewsCardList;
