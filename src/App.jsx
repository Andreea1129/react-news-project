import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import NewsCategory from "./pages/NewsCategory";
import NewsDetails from "./pages/NewsDetails";
import { useReducer, useEffect } from "react";
import { favouritesReducer, initialState } from "./store/reducer";
import { FavouritesContext } from "./store/context";
import { useLocalStorage } from "./utils/hooks/useLocalStorage";

// Definim rutele, similar cu ce am facut la sedinta de React Routing
// createBrowserRouter este folosit pentru a ne defini rutele, si asteapta ca argument un array cu rutele(fiecare ruta va fi specificata intr-un obiect)
const routes = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <Page404 />,
	},
	{
		path: "/favourites",
		element: <Favourites />,
	},
  {
    path: "/category/:categoryId", //categoryId reprezinta URL-ul pentru id-ul categoriei de stiri folosit in componenta pentru a sti sa afiseze stiri din acea categorie
    element: <NewsCategory />
  }, 
  {
    path: "/news/:newsId", // newsId este parametrul folosit in componenta NewsDetails pentru a afisa date despre o stire singulara
    element: <NewsDetails />
  }
]);

function App() {
	const [storedFavoritesState, setStoredFavoritesState] = useLocalStorage("favorites", initialState);
	// Facem store-ul de stiri favorite disponibil in intreaga aplicatie din componenta principala
	// Initializam reducer-ul pentru stiri favorite
	const [favoritesState, favoritesDispatch] = useReducer(favouritesReducer, storedFavoritesState);

	useEffect(() => {
    setStoredFavoritesState(favoritesState);
  	}, [favoritesState, setStoredFavoritesState]);

	// Cream contextul ce il vom pasa ca valoare pentru context provider
	const favoritesContextValue ={
		favoritesState,
		favoritesDispatch
	};


	return (
		<div className="App">
			{/* Adaugam provider-ul de rute astfel incat sa le face disponibile in intreaga aplicatie */}
			<FavouritesContext.Provider value={favoritesContextValue}>
      			<RouterProvider router={routes} />
			</FavouritesContext.Provider>
		</div>
	);
}

export default App;
