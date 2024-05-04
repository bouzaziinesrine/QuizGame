const btnstart = document.querySelector('.btn-start');
const infos = document.querySelector('.infos');
const btnexit = document.querySelector('.exit-btn');
const main = document.querySelector('.main')
const btncontinue = document.querySelector('.continue-btn');
const quiz = document.querySelector('.quiz');
const quizbox = document.querySelector('.quiz-box');
const bntnext = document.querySelector('.question-next');
const optionList = document.querySelector('.option-list');
const resultBox= document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeAgain = document.querySelector('.goHome-btn');

let questionCount = 0;
let questionNum = 1;
let userScore = 0;

//button start
btnstart.onclick = () => {
    infos.classList.add('active');
    main.classList.add('active');
}
//button exit
btnexit.onclick = () => {
    infos.classList.remove('active');
    main.classList.remove('active');
}

//button continue
btncontinue.onclick = () => {
    quiz.classList.add('active');
    quizbox.classList.add('active');
    infos.classList.remove('active');
    main.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

//button next-question
bntnext.onclick= () => {
    if(questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNum++;
        questionCounter(questionNum);

        bntnext.classList.remove('active');

    }else{
        // console.log('Question Completed');
        showResultBox();
    }
}

tryAgainBtn.onclick = () => {
    quiz.classList.add('active');
    resultBox.classList.remove('active');
    bntnext.classList.remove('active');

    questionCount = 0;
    questionNum = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNum);

    headerScore();
}

goHomeAgain.onclick = () => {
    quiz.classList.remove('active');
    resultBox.classList.remove('active');
    bntnext.classList.remove('active');
    main.classList.remove('active');

    questionCount = 0;
    questionNum = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNum);

}


//questions
function showQuestions(index){
    //link between quiz.js and script.js
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].num}. ${questions[index].question}`;

    let optionTag=`<div class="option"><span>${questions[index].option[0]}</span></div>
                    <div class="option"><span>${questions[index].option[1]}</span></div>
                    <div class="option"><span>${questions[index].option[2]}</span></div>
                    <div class="option"><span>${questions[index].option[3]}</span></div>`;
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i=0; i<option.length;i++){
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

//Answer selected
function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer =questions[questionCount].answer;
    let alloptions = optionList.children.length;
    
    //compare both answer and correct answer
    if (userAnswer == correctAnswer ){
        answer.classList.add('correct');
        userScore+=1;
        headerScore();
    }else{
        answer.classList.add('incorrect');

        //if answer incorrect, auto selected correct answer
        for (let i=0 ; i<alloptions ; i++){
            if  (optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class', 'option correct');
            };
        }



    }
    // if user has selected, disabled all options
    for (let i=0 ; i<alloptions ; i++){
        optionList.children[i].classList.add('disabled');
    }
    bntnext.classList.add('active');
}
//count the number of questions
function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `The Question n° ${index}`;
}

//count the score of questions
function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox(){
    resultBox.classList.add('active');
    quizbox.classList.remove('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Score: ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector ('.circular-container');
    const progressValues =  document.querySelector ('.progress-value');

    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        // console.log(progressStartValue);
        progressValues.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(rgba(0, 0, 0) ${progressStartValue * 3.6}deg, rgba(128, 193, 231) 0deg)`;

        if (progressStartValue == progressEndValue){
            clearInterval(progress);
        }
    }, speed);
    
}