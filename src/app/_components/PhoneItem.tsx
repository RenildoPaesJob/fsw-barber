"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
	phone: string
}

export default function PhoneItem({ phone }: PhoneItemProps) {

	const handleCopyPhoneClick = (phone: string) => {
		navigator.clipboard.writeText(phone)
		toast.success("Telefone copiado com sucesso!")
	}

	return (
		<div className="flex justify-between items-center">
			{/* ESQUERDA */}
			<div className="flex items-center gap-2">
				<SmartphoneIcon />
				<p className="text-sm">{phone}</p>
			</div>

			<Button
				size="sm"
				variant="outline"
				onClick={() => handleCopyPhoneClick(phone)}
			>
				Copiar
			</Button>
		</div>
	)
}