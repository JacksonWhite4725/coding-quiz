let initials = localStorage.getItem(initials);
let score = localStorage.getItem(score);
let title = "Congrats " + initials + " on scoring " + score + "!";
let newLi = $("<li></li>");
newLi.append(title);
$("#highscore-list").append(newLi1);