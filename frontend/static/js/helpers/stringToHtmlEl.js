/**
 * @param string
 * @returns {Element}
 */
const StringToHtml = (string) => {
  const frame = document.createElement("div");
  frame.insertAdjacentHTML("afterbegin", string);
  return frame.firstElementChild;
};

export default StringToHtml;
