export default function shuffle(array, seed) {
  var currentIndex
	, temporaryValue
	, randomIndex
	, rand
  if (seed == null) rand = randGen()
  else              rand = randGen(seed)

  if (array.constructor !== Array) throw new Error('Input is not an array')
  currentIndex = array.length

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
	// Pick a remaining element...
	randomIndex = Math.floor(rand() * (currentIndex --))

	// And swap it with the current element.
	temporaryValue = array[currentIndex]
	array[currentIndex] = array[randomIndex]
	array[randomIndex] = temporaryValue
  }

  return array
}
