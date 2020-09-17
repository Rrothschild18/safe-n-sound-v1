export default class Swap {
  constructor(target, fixed) {
    this.target = document.querySelectorAll(target);
    this.fixed = this.selectCurrentFixed();
  }

  init() {
    this.target.forEach((cards) => {
      cards.addEventListener("click", (e) => {
        this.trigger(e);
      });
    });
  }

  trigger(e) {
    this.swap(e.target.closest(".col._col-3.Card"));
  }

  selectCurrentFixed() {
    return document.querySelector(".Suported .Card._main");
  }

  getPosition(target) {
    let x = target.getBoundingClientRect().x;
    let y = target.getBoundingClientRect().y;
    return {
      x: x,
      y: y,
    };
  }

  swap(target) {
    let targetPos = this.getPosition(target),
      fixed = this.selectCurrentFixed(),
      fixedPos = this.getPosition(fixed),
      move = this.calc(fixedPos, targetPos),
      objsPos = this.leftNTop(target, fixed);

    this.doSwapMove(target, fixed, move, objsPos);
  }

  calc(target, fixed) {
    let x = target.x - fixed.x;
    let y = target.y - fixed.y;

    return { x: x, y: y };
  }

  leftNTop(target, fixed) {
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

  doSwapMove(t, f, move, objsPos) {
    //MOVE SEMPRE EH LEFT TOP QUE O TARGET VAI ANDAR
    //RES SEMPRE EH LEFT TOP QUE O FIXED VAI ANDAR

    objsPos.target.left = Math.round(move.x + objsPos.target.left);
    objsPos.target.top = Math.round(move.y + objsPos.target.top);
    objsPos.fixed.left = Math.round(-1 * move.x + objsPos.fixed.left);
    objsPos.fixed.top = Math.round(-1 * move.y + objsPos.fixed.top);

    t.style.setProperty("top", objsPos.target.top + "px");
    t.style.setProperty("left", objsPos.target.left + "px");
    t.classList.toggle("_main");

    f.style.setProperty("top", objsPos.fixed.top + "px");
    f.style.setProperty("left", objsPos.fixed.left + "px");
    f.classList.toggle("_main");
  }
}
