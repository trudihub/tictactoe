winning = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]]
let cell = document.querySelectorAll(".grid-cell");
let result = document.getElementById("result");
let grid = document.getElementById(".grid-container")

const PLAYER1 = "X";
const PLAYER2 = "O";
let button = document.createElement("button");
button.innerHTML = "Reset";
button.id = "reset"
let turn = false;
button.addEventListener("click", newGame)
newGame();
function newGame(){
	turn = !turn
	result.innerHTML = "";
	if (result.firstChild){
		result.removeChild(button)
	}
	cell.forEach(cell => {
		cell.classList.remove(PLAYER1)
		cell.classList.remove(PLAYER2)
		cell.innerHTML = "";
		

		cell.removeEventListener("click", runEvent)})
	cell.forEach(cell => {cell.addEventListener("click", runEvent, {once: true})
});
}


function runEvent(e){
	const currentClass = turn ? PLAYER1 : PLAYER2;
	current_sq = e.target;
	executeMove(currentClass);
	if(checkWin(currentClass)){
		result.innerText = currentClass + " hat gewonnen !";
		result.appendChild(button)
	}
	else if (checkDraw()){
		result.innerText = "Unentschieden !";
		result.appendChild(button);
	}
	else{
		turn = !turn;
	}

}	

function executeMove(currentClass){
	if(turn){
		current_sq.innerHTML = PLAYER1
		current_sq.classList.add(PLAYER1);
		
	} else {
		current_sq.innerHTML = PLAYER2
		current_sq.classList.add(PLAYER2);
		
	}
	
}

function checkWin(currentClass){
	return winning.some(combination => {
		return combination.every(index => {
			return cell[index].classList.contains(currentClass);
		})
	})
}

function checkDraw(){
	return [...cell].every(cell => {
		return cell.classList.contains(PLAYER1) || cell.classList.contains(PLAYER2);
	})
}
