let initials = window.localStorage.getItem("initials");
let score = window.localStorage.getItem("score");

function addLi() {
    let highscore = "Congrats " + initials + " for scoring " + score + "!";
    let newLi = $("<li></li>");
    newLi.append(highscore);
    $("#highscore-list").append(newLi);
}

addLi();