'use strict';
let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
//이기는 패턴 배열 
let winningPattern =  [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];
// 플레이어는 x로 시작한다.
let xTurn = true;
let count = 0;

// 모든 버튼
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
//팝업 가능하게하기
    popupRef.classList.remove("hide");

}
// 새로운 게임이나 재시작을 가능하게 하는 모든 버튼
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    popupRef.classList.add("hide");
};


// x 나 o가 이겼을때 나오는 메세지
const winFunction = (letter) => {
    disableButtons();
    if(letter == "X") {
        msgRef.innerHTML = "'X' 승";
    }else {
        msgRef.innerHtml = "'O' 승";
    } };

// 비겼을시
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "비겼습니다.";
};


//새로운 게임
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();   
});
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

// 이기는 방법
const winChecker = () => {
    //모든 승리패턴 반복
    for(let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];

    // element가 확인 실패시
    // 3개의 빈 요소가 같거나 이긴다
if(element1 != "" && (element2 != "") & (element3 != "")) {
    if(element1 == element2 && element2 == element3) {
        //만약 3개가 같은 값을 가진다면 이기는 함수로 이동한다.
        winFunction(element1);
    } } } };


// x/o 클릭시
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if(xTurn) {
            xTurn = false;

            element.innerText = "X";
            element.disabled = true;
        }else {
            xTurn = true;

            element.innerText = "O";
            element.disabled = true;
        };
        //각각 클릭시 count 증가
        count += 1;
        if(count == 9) {
            drawFunction();
        }
        winChecker();
    });
});
window.onload = enableButtons;