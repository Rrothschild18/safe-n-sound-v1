// import index from "./libs/submit.js";
// index();

var cards = document.querySelectorAll(".Suported .Card");

cards.forEach((card) => {
	card.addEventListener("click", trigger);
});

function trigger(e) {
	let t = e.target;
	if (t.parentNode.classList.contains("content")) t = t.parentNode;

	swap(t);
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
		move = calc(targetPos, fixedPos),
		objsPos = leftNTop(target, fixed);

	doSwapMove(target, fixed, move, objsPos);
}

function calc(target, fixed) {
	let x = target.x - fixed.x;
	let y = target.y - fixed.y;

	return { x: x, y: y };
}

function leftNTop(fixed, target) {
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
	let tpos = getPosition(t);
	tpos.x += objsPos.target.left;
	tpos.y += objsPos.target.top;

	let fpos = getPosition(t);
	fpos.x += objsPos.fixed.left;
	fpos.y += objsPos.fixed.top;

	let res = calc(tpos, getPosition(f));
	let res2 = calc(getPosition(f), fpos);
	console.log(res2);

	objsPos.target.left = res2.x;
	objsPos.target.top = res2.y;
	objsPos.fixed.left = res.x;
	objsPos.fixed.top = res.y;

	// console.log(move);
	t.parentNode.style.setProperty("top", objsPos.target.top + "px");
	t.parentNode.style.setProperty("left", objsPos.target.left + "px");
	t.parentNode.classList.toggle("_main");

	f.style.setProperty("top", objsPos.fixed.top + "px");
	f.style.setProperty("left", objsPos.fixed.left + "px");
	f.classList.toggle("_main");
}
