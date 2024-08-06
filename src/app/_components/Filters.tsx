import Image from "next/image"

import { Button } from "./ui/button"

import Tesoura from "../../../public/assets/img/tesoura_solid_icon.svg"
import Bigode from "../../../public/assets/img/bigode_solid_icon.svg"
import Navalha from "../../../public/assets/img/navalha_solid_icon.svg"
import Sobrancelha from "../../../public/assets/img/sobrancelha_solid_icon.svg"
import Toalha from "../../../public/assets/img/toalha_solid_icon.svg"
import Shampoo from "../../../public/assets/img/shampoo_solid_icon.svg"

// interface FiltersProps {
// 	imageUrl: string
// 	title: string
// }

// const filtersSearchOptions: FiltersProps[] = [
// 	{

// 	}
// ]

export default function Filters() {
	return (
		<div className="flex gap-3 mt-6 overflow-auto [&::-webkit-scrollbar]:hidden">
			<Button className="gap-2" variant="secondary">
				<Image
					alt="Butão Tesoura"
					src={Tesoura}
					height={16}
					width={16}
				/>
				Cabelo
			</Button>
			<Button className="gap-2" variant="secondary">
				<Image
					alt=""
					src={Bigode}
					height={16}
					width={16}
				/>
				Barba
			</Button>
			<Button className="gap-2" variant="secondary">
				<Image
					alt="Butão para fazer buscar de corte de cabelos"
					src={Navalha}
					height={16}
					width={16}
				/>
				Acabamento
			</Button>
			<Button className="gap-2" variant="secondary">
				<Image
					alt="Butão para fazer buscar de corte de cabelos"
					src={Sobrancelha}
					height={16}
					width={16}
				/>
				Sobrancelha
			</Button>
			<Button className="gap-2" variant="secondary">
				<Image
					alt="Butão para fazer buscar de corte de cabelos"
					src={Toalha}
					height={16}
					width={16}
				/>
				Massagem
			</Button>
			<Button className="gap-2" variant="secondary">
				<Image
					alt="Butão para fazer buscar de corte de cabelos"
					src={Shampoo}
					height={16}
					width={16}
				/>
				Hidratação
			</Button>
		</div>
	)
}