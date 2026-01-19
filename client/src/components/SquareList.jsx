export default function SquareList({squares}) {
	if (!squares.length) {
		return (<>No data</>)
	}
	return(
		<ul>
			{squares.map(square => (
				<li key={square._id}>{square.value}</li>
			))}
		</ul>
	)
}