const questions=[
    {
        questions: "Who will be hosting the FIFA World Cup in 2026?",
        answers :[
            {text:"Australia and New Zealand", correct: false},
            {text:"Japan and South korea", correct: false},
            {text:"US, Mexico and Canada", correct: true},
            {text:"Saudi Arabia", correct: false},
        ]
    },
    {
        questions: "In which month did the FIFA World Cup 2022 kick off?",
        answers :[
            {text:"May", correct: false},
            {text:"November", correct: true},
            {text:" July", correct: false},
            {text:"December ", correct: false},
        ]
    },
    {
        questions: "Who was awarded the Golden Ball for the best player of the tournament in FIFA World Cup 2022?",
        answers :[
            {text:"Lionel Messi", correct: false},
            {text:"Cristiano Ronaldo", correct: false},
            {text:"Luka Modrić", correct: false},
            {text:"Kylian Mbappé ", correct: true},
        ]
    },
    {
        questions: "Who was the coach of the winning team in the FIFA World Cup 2014?",
        answers :[
            {text:"Lionel Sebastián Scaloni", correct: false},
            {text:"Joachim Löw", correct: true},
            {text:"Didier Deschamps", correct: false},
            {text:"Luis Enrique", correct: false},
        ]
    },
    {
        questions: "Which nation made its debut in the FIFA World Cup in 2014?",
        answers :[
            {text:"Bosnia and Herzegovina", correct: true},
            {text:"New Zealand", correct: false},
            {text:"Panama", correct: false},
            {text:"Tunisia", correct: false},
        ]
    }
];



const questionsElement= document.getElementById("Question");
const answerButtons= document.getElementById("Ans-Btn");
const nextButton= document.getElementById("next-btn");



let currentQuestionIndex = 0;
let score = 0;




function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}



function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionsElement.innerHTML=questionNo+"."+currentQuestion.questions;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("Button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}



function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}



function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled= true;
    });
    nextButton.style.display = "block";
}



function showScore(){
    resetState();
    questionsElement.innerHTML=`You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}



function  handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}



nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();