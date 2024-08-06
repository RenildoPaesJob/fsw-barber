import Image from "next/image"
import { Card, CardContent } from "./ui/card"

import Logo from "../../../public/assets/img/Logo.png"
import { MenuIcon } from "lucide-react"
import { Button } from "./ui/button"

const Header = () => {
	return (
		<Card>
			<CardContent className="flex flex-row items-center p-5 justify-between align-middle">
				<Image alt="logo FSW Barber" width={130} height={22} src={Logo} />
				<Button size="icon" variant="outline">
					<MenuIcon />
				</Button>
			</CardContent>
		</Card>
	)
}

export default Header