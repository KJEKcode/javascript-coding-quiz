var highscoreList = document.getElementById("highscore-list");
var clearStorage = document.getElementById("clear-score");
function printScores(params) {
    var highScores = JSON.parse(localStorage.getItem("highScore"));
    if(highScores){
        highScores.sort(function(a, b) {return b.score - a.score});
        highScores.forEach(score => {
            var li = document.createElement("li");
            li.textContent = "Initals: " + score.initals + " Score: " + score.score; 
            highscoreList.appendChild(li);    
        });
    }else {
        highscoreList.innerHTML = "<h2>No Scores Recorded</h2>";
    }
}
printScores();
function clearScores() {
    localStorage.clear();
    printScores();
}

clearStorage.addEventListener("click", clearScores);

