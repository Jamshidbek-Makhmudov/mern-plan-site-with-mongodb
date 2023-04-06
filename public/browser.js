//console.log 2xil boladi siz ishlayotgan vscode node logi va browserni consoli
//promptdagi datalar browserni consolia tushadi
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-me")) {
    //promptni 2-parametri default qiymati boladi
    let userInput = prompt(
      "Edit your input:",
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
    )
    if (userInput) {
      axios
        .post("/update-item", {
          text: userInput,
          id: e.target.getAttribute("data-id"),
        })
        .then(() => {
          e.target.parentElement.parentElement.querySelector(
            ".item-text"
          ).innerHTML = userInput
        })
        .catch((error) => console.log(`${error} error from axios`))
      //updated
    }
  }
})
