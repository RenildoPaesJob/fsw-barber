import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import Image from "next/image"

import GoogleIcon from "../../../public/assets/img/google_icon_solid.svg"
import { Button } from "./ui/button"
import { signIn } from "next-auth/react"

export default function SingInDialog() {
	const handleLoginWithGoogleClick = () => signIn("google")

	return (
		<>
			<DialogHeader>
				<DialogTitle>Faça login na plataforma!</DialogTitle>
				<DialogDescription>
					Conecte-se usando sua conta do Google.
				</DialogDescription>
			</DialogHeader>

			<Button
				variant="outline"
				className="flex gap-2 font-bold"
				onClick={handleLoginWithGoogleClick}
			>
				<Image src={GoogleIcon} alt="Fazer login com o google" />
				Google
			</Button>
		</>
	)
}