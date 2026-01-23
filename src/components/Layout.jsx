import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

export default function Layout(props) {
	return (
		<div className="layout">
			<Header />
			{/* Intre header si footer afisam copiii primiti de catre componeta Layout */}
			<main>{props.children}</main>
			<Footer />
		</div>
	);
}
