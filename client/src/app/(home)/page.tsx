import { Articles } from "./sections/articles/Articles";
import { Collections } from "./sections/collections/Collections";
import { OurValues } from "./sections/our-values/OurValues";
import { Sale } from "./sections/sale/Sale";
import { SpecialOffer } from "./sections/special-offer/SpecialOffer";
import { Welcome } from "./sections/welcome/Welcome";

export default function HomePage() {
	return (
		<>
			<SpecialOffer/>
			<Welcome/>
			<OurValues/>
			<Collections/>
			<Sale/>
			<Articles/>
		</>
	)
}
