import Tesoura from "../../../public/assets/img/tesoura_solid_icon.svg"
import Bigode from "../../../public/assets/img/bigode_solid_icon.svg"
import Navalha from "../../../public/assets/img/navalha_solid_icon.svg"
import Sobrancelha from "../../../public/assets/img/sobrancelha_solid_icon.svg"
import Toalha from "../../../public/assets/img/toalha_solid_icon.svg"
import Shampoo from "../../../public/assets/img/shampoo_solid_icon.svg"

interface QuickSearchOption {
	imageUrl: string
	title: string
}

export const quickSearchOption: QuickSearchOption[] = [
	{
		imageUrl: Tesoura,
		title: "Cabelo"
	},
	{
		imageUrl: Bigode,
		title: "Barba"
	},
	{
		imageUrl: Navalha,
		title: "Acabamento"
	},
	{
		imageUrl: Sobrancelha,
		title: "Sobrancelha"
	},
	{
		imageUrl: Toalha,
		title: "Massagem"
	},
	{
		imageUrl: Shampoo,
		title: "Hidratação"
	}
]