export default function About({handleNewBoardClick}) {

	return(
		<div>
		<div>About</div>
		<div><button className="button" onClick={handleNewBoardClick}>New Board</button></div>
		</div>
	)
}