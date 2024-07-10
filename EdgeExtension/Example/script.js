function getRandWord() {
    fetch("https://random-word-api.herokuapp.com/word")
    .then(res=>res.json())
    //.then(word=>console.log(word[0])) //debugging
    .then(word=>document.getElementById("RANDOM_WORD").innerText=word)
    .catch(err=>console.log(err));
}

getRandWord();