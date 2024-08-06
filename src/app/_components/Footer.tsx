import { Card, CardContent } from "./ui/card"

export default function Footer() {
	return (
		<footer>
			<Card className="rounded-md p-0">
				<CardContent className="p-0">
					<p
						className="text-sm text-gray-400 p-4"
					>
						&copy; 2024 Copyright <span className="font-bold">FSW Barber</span>
					</p>
				</CardContent>
			</Card>
		</footer>
	)
}