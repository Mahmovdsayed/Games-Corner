function removeTgs(text: any) {
  var tempElement = document.createElement("div");
  tempElement.innerHTML = text;

  // Extract text content from the temporary element
  var textContent = tempElement.textContent || tempElement.innerText || "";
  return textContent;
}
