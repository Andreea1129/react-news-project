import Container from "react-bootstrap/esm/Container";
import { getNewsList } from "../api/adaptors";
import { getNewsCategoriesEndpoint } from "../api/endpoints";
import Layout from "../components/Layout";
import {useFetch} from '../utils/hooks/useFetch';
import { Link } from "react-router-dom";
import NewsCardList from "../components/NewsCardList";

export default function Home() {
	// Generam endpoint-urile pentru categoriile de stiri
	const technologyCategoryEndpoint = getNewsCategoriesEndpoint('technology', 1, 6);
	const footballCategoryEndpoint = getNewsCategoriesEndpoint('football', 1, 6);
	const businessCategoryEndpoint = getNewsCategoriesEndpoint('business', 1, 6);
	// Fetch-uim datele de la The Guardian API
	const technologyData = useFetch(technologyCategoryEndpoint);
	const footballData = useFetch(footballCategoryEndpoint);
	const businessData = useFetch(businessCategoryEndpoint);
	// Folosind Design Pattern-ul de Adapter - o sa adaptam datele de la server intr-un format necesar componentei noastre 
	const adaptedTechnologyData = getNewsList(technologyData);
	const adaptedFootballData = getNewsList(footballData);
	const adaptedBusinessData = getNewsList(businessData);
	
	return (
		<Layout>
			<section className="tech my-5">
				<Container>
					<h1 className="mb-5 pt-3">Tech</h1>
					{/* Instantiem componenta care ne listeaza cardurile cu stiri */}
					<NewsCardList newsList={adaptedTechnologyData} />
					<p>Vezi toate știrile legate de tehnologie în secțiunea 
						<Link to={'/category/technology'} className="text-secondary">
						Tech
						</Link>
						</p>
				</Container>
			</section>
			<section className="my-5 football">
				<Container>
					<h1 className="mb-5 pt-3">Fotbal</h1>
					{/* Instantiem componenta NewsCardList si ii punem ca prop toate stirile din categoria football - si anume variabila addaptedFootballData */}
					<NewsCardList newsList={adaptedFootballData} />
					<p>Vezi toate știrile legate de fotbal în secțiunea 
						<Link to={'/category/football'} className="text-secondary">
							Fotbal
						</Link>
					</p>
				</Container>
			</section>
			<section className="business my-5">
				<Container>
					<h1 className="mb-5 pt-3">Business</h1>
					<NewsCardList newsList={adaptedBusinessData} />
					<p>Vezi toate știrile legate de afaceri în secțiunea 
						<Link to={'/category/business'} className="text-secondary">
						Business
						</Link>
						</p>
				</Container>
			</section>
			<section className="my-5 favourites">
				<Container>
					<h1 className="mb-5 pt-3">Favorite</h1>
					<p>Vrei să îți salvezi știrile favorite pentru a le revedea mai târziu?</p>
					<p>În cadrul fiecărei știri găsești un buton prin care poți adăuga știrea la favorite</p>
					<p>Vezi secțiunea: <Link to={'/favourites'} className="text-secondary">Favorite</Link> pentru a vedea știrile adăugate.</p>
				</Container>
			</section>
		</Layout>
	);
}
