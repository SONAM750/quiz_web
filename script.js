const arr = [
  {
    question: "What is the size of an int variable in Java?",
    options: [
      "4 bytes",
      "2 bytes",
      "8 bytes",
      "Depends on the system architecture",
    ],
    correct: 0,
  },
  {
    question: "Which keyword is used to inherit a class in Java?",
    options: ["this", "import", "extends", " implements"],
    correct: 2,
  },
  {
    question: "Which of these is not a Java primitive data type?",
    options: ["int", "float", "boolean", "String"],
    correct: 3,
  },
  {
    question:
      "Which of these access specifiers makes a member accessible within its own package and by subclasses?",
    options: ["public", "private", "protected", "default"],
    correct: 0,
  },
  {
    question: "Which method is the entry point of any Java program?",
    options: ["main()", "start()", "run()", "init()"],
    correct: 0,
  },
];
let ques = document.querySelector(".heading");
let options = [
  document.querySelector(".option_lbl1"),
  document.querySelector(".option_lbl2"),
  document.querySelector(".option_lbl3"),
  document.querySelector(".option_lbl4"),
];
let ans = document.querySelectorAll(".option_a");
let sub_btn = document.querySelector("#btn");
let quiz = document.querySelector(".quiz-section");
let showscore = document.querySelector(".score");
let current_quiz = 0;
let score = 0;
let time = 20;
let timerinter;
let count = document.querySelector("#timer");

function load_quiz() {
  const currentData = arr[current_quiz];
  ques.innerText = `${current_quiz + 1}:${currentData.question}`;

  options.forEach((label, idx) => {
    label.innerText = currentData.options[idx];
  });
  restartTimer();
  deselectedans();
}

const getseleoption = () => {
  let ansidx;
  ans.forEach((curr, idx) => {
    if (curr.checked) {
      ansidx = idx;
    }
  });
  return ansidx;
};
const deselectedans = () => {
  ans.forEach((curr) => {
    curr.checked = false;
  });
};
function restartTimer() {
  clearInterval(timerinter);
  time = 20;
  updatecount();
  timerinter = setInterval(updatecount, 1000);
}
const autoSubmit = () => {
  current_quiz++;
  if (current_quiz < arr.length) {
    load_quiz(); // next question
  } else {
    showResult(); // end quiz
  }
};

function updatecount() {
  const minutes = Math.floor(time / 60);
  let sec = time % 60;
  count.innerHTML = `${minutes}:${sec < 10 ? "0" + sec : sec}`;
  time--;
  if (time < 0) {
    clearInterval(timerinter);
    count.innerHTML = "Time's up!";
    autoSubmit();
  }
}
function showResult() {
  clearInterval(timerinter);
  quiz.innerHTML = `<div class="result">
        <h2 class="score"> Your Score is: ${score}/${arr.length} </h2>
        <p>Congratulations on Completing the quiz🎉</p>
        <div class="btn-sec">
        <button class="play-again" onclick="location.reload()">Play Again </button>
        </div>
        </div>`;
  quiz.style.backgroundColor = "rgb(255, 255, 255)";
  quiz.style.color = "rgb(54, 133, 182)";
}
sub_btn.addEventListener("mouseover",()=>{
     sub_btn.style.backgroundColor = "green";
})
sub_btn.addEventListener("mouseleave",()=>{
     sub_btn.style.backgroundColor = "rgb(54, 133, 182)";
})

sub_btn.addEventListener("click", () => {

  
  clearInterval(timerinter);
  //  showscore.innerHTML = `<h4>Score:${score}</h4>`;
  const seloptidx = getseleoption();
  // console.log(seloptidx);
   if(seloptidx==null){
    alert("choose any option to move next");
  }
  if (seloptidx == arr[current_quiz].correct) {
    score += 1;
     showscore.innerHTML = `<h4>Score:${score}</h4>`;
    
   
  }
  current_quiz++;
  if (current_quiz < arr.length) {
    // deselectedans();
    load_quiz();
  } else {
    showResult();
  }
});
load_quiz();
