import { useContext } from "react";
import Layout from "../components/Layout";
import { FavouritesContext } from "../store/context";
import { Container } from "react-bootstrap";
import NewsCardList from "../components/NewsCardList";

export default function Favourites() {
	// Extragem state-ul de stiri favorite:
	const {favoritesState} = useContext(FavouritesContext);
	// console.log(favoritesState);
	// Extragem cheia news de pe state
	const {news} = favoritesState;
	return (
		<Layout>
			<Container className="my-5">
				<h1 className="mb-5 pt-3">Stirile tale favorite</h1>
				{/* Daca nu avem stiri afisam un mesaj, altfel listam stirile */}
				{news.length === 0 ? (<p>Momentan nu ai nici o știre favorită</p>) : (
					<NewsCardList newsList={news}></NewsCardList>
				)}
			</Container>
		</Layout>
	);
}
