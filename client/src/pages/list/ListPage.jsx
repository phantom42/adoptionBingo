import { useLoaderData } from "react-router-dom";
import SquareList from "../../components/SquareList";

export default function ListPage() {
	const {allSquares} = useLoaderData();
	return (
		<div>All Square Values:
			<SquareList squares={allSquares}/>
		</div>
	)
}