const data = [];

const getData = async (i) => {
  const res = await fetch("https://opentdb.com/api.php?amount=50");
  console.log(res);
  const Data = await res.json();
  for (let j = 0; j < Data.results.length; j++) {
    data[j] = Data.results[j];
  }
  getQuestion(i);
};

const getQuestion = (i) => {
  var questionContainer = document.querySelector(".display-inner");
  var options = document.querySelectorAll(".option");

  for (let k = 0; k < options.length; k++) {
    options[k].style.background = "#fff";
  }

  questionContainer.innerHTML = `Ques : ${data[i].question}`;
  options[0].innerHTML = data[i].incorrect_answers[0];
  options[1].innerHTML = data[i].incorrect_answers[1];
  options[2].innerHTML = data[i].incorrect_answers[2];
  options[3].innerHTML = data[i].correct_answer;
};

var i = 0;
var score = 0;
var cnt = 0;
var selected;

getData(i);

var options = document.querySelectorAll(".option");
var optionsContainer = document.querySelector(".options");
var nextBtn = document.querySelectorAll(".btn")[0];
var finishBtn = document.querySelectorAll(".btn")[1];
const quizArea = document.querySelector(".quiz-area");
var questionContainer = document.querySelector(".display-inner");

quizArea.style.maxWidth = "100%";

for (let j = 0; j < options.length; j++) {
  options[j].addEventListener("click", () => {
    for (let k = 0; k < options.length; k++) {
      options[k].style.background = "#fff";
    }
    nextBtn.style.display = "block";
    finishBtn.style.display = "block";
    options[j].style.background = "#6ab04c";
    selected = j;
  });
}

nextBtn.addEventListener("click", () => {
  var options = document.querySelectorAll(".option");
  cnt = cnt + 1;
  console.log(cnt);
  if (
    options[selected].innerText.toLowerCase() ==
    data[i].correct_answer.toLowerCase()
  ) {
    score++;
  }
  i = i + 1;
  options[selected].style.background = "#fff";
  getQuestion(i);
});
finishBtn.addEventListener("click", () => {
  //   optionsContainer.style.display = "none";
  questionContainer.innerText = "";
  setTimeout(() => {
    questionContainer.innerText = `Result : ${score} out of ${cnt}`;
    // optionsContainer.style.display = "block";
    optionsContainer.innerHTML = `<div class="options" style="margin:auto">
          <div class="row">
            <div class="btn" style="display:block" onClick="restart()">Start Again</div>
          </div>
        </div>`;
  }, 500);
});

const restart = () => {
  location.reload();
};
