export const showHide = function () {
  const row4 = document.querySelector("[data-target='showTracks']");
  const row8 = document.querySelector("[data-target='showRelated']");
  row4.classList.toggle("_show");
  row8.classList.toggle("_show");
};
exports.default = showHide;
