// import index from "./libs/submit.js";
// index();

var cards = document.querySelectorAll(".Suported .Card");

cards.forEach((card) => {
	card.addEventListener("click", trigger);
});

function trigger(e) {
	swap(e.target.closest('.col._col-3.Card'));
}

function selectCurrentFixed() {
	return document.querySelector(".Suported .Card._main");
}

function getPosition(target) {
	let x = target.getBoundingClientRect().x;
	let y = target.getBoundingClientRect().y;
	return {
		x: x,
		y: y,
	};
}

function swap(target) {
	let targetPos = getPosition(target),
		fixed = selectCurrentFixed(),
		fixedPos = getPosition(fixed),
		move = calc(fixedPos, targetPos),
		objsPos = leftNTop(target, fixed);

	doSwapMove(target, fixed, move, objsPos);
}

function calc(target, fixed) {
	let x = target.x - fixed.x;
	let y = target.y - fixed.y;

	return { x: x, y: y };
}

function leftNTop(target, fixed) {
	let targetLeft = target.style.left;
	let targetTop = target.style.top;
	let fixedLeft = fixed.style.left;
	let fixedTop = fixed.style.top;

	targetLeft = Number(targetLeft.replace("px", ""));
	targetTop = Number(targetTop.replace("px", ""));
	fixedLeft = Number(fixedLeft.replace("px", ""));
	fixedTop = Number(fixedTop.replace("px", ""));

	return {
		target: { left: targetLeft, top: targetTop },
		fixed: { left: fixedLeft, top: fixedTop },
	};
}

function doSwapMove(t, f, move, objsPos) {
	//MOVE SEMPRE EH LEFT TOP QUE O TARGET VAI ANDAR
	//RES SEMPRE EH LEFT TOP QUE O FIXED VAI ANDAR

	objsPos.target.left = Math.round(move.x + objsPos.target.left);
	objsPos.target.top =  Math.round(move.y + objsPos.target.top);
	objsPos.fixed.left = Math.round((-1 * move.x)  + objsPos.fixed.left);
	objsPos.fixed.top = Math.round((-1 * move.y) + objsPos.fixed.top);

	t.style.setProperty("top", objsPos.target.top + "px");
	t.style.setProperty("left", objsPos.target.left + "px");
	t.classList.toggle("_main");

	f.style.setProperty("top", objsPos.fixed.top + "px");
	f.style.setProperty("left", objsPos.fixed.left + "px");
	f.classList.toggle("_main");
}