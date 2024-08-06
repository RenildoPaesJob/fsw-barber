import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function Search() {
	return (
		<div className="flex items-center gap-2 mt-6">
			<Input placeholder="Faça sua busca..." />
			<Button>
				<SearchIcon />
			</Button>
		</div>
	)
}