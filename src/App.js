import React from "react";
import { useState, useEffect } from 'react';
import './App.css';
import Box from './component/Box';
// 폰트어썸 import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandBackFist } from "@fortawesome/free-solid-svg-icons";
import { faHandScissors } from "@fortawesome/free-solid-svg-icons";
import { faHand } from "@fortawesome/free-solid-svg-icons";

/*
[ 요구사항 ]
 1. 박스 2개(user, computer)
 2. 가위, 바위, 보 버튼
 3. 버튼을 클릭하면 해당 값이 user 박스에 나타남
 4. computer의 선택은 랜덤하게 정해짐
 5. 3, 4의 결과를 비교해 승패를 따짐
 6. win-초록, lose-빨강, tie-검정 색으로 박스 테두리 설정
*/

const choice = {
  rock:{
    name:"Rock",
    img:"https://www.pngfind.com/pngs/b/56-563277_rock-paper-scissors-png-rock-paper-scissors-clipart.png"
  },
  scissors:{
    name:"Scissors",
    img:"https://www.seekpng.com/png/detail/111-1114370_rock-paper-scissors-rock-paper-scissors-clipart.png"

  },
  paper:{
    name:"Paper",
    img:"https://www.vhv.rs/dpng/d/490-4906131_rock-paper-scissors-clipart-rock-paper-scissors-png.png"
  },
};


function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState(null);
  const [colorIndex, setColorIndex] = useState(0);

  const play =(userChoice)=>{
    // user의 선택
    setUserSelect(choice[userChoice]);
    // computer의 선택
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    // 선택 결과 비교
    setResult(judgement(choice[userChoice], computerChoice));
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    return choice[itemArray[randomItem]];
  };

  const judgement =(user, computer) =>{
    if(user.name === computer.name){
      return "TIE";
    } else if(user.name === "Rock")
      return computer.name === "Scissors" ? "WIN" : "LOSE";
    else if(user.name === "Scissors")
      return computer.name === "Paper" ? "WIN" : "LOSE";
    else if(user.name === "Paper")
      return computer.name === "Rock" ? "WIN" : "LOSE";
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex(prevIndex => (prevIndex + 2) % 3); // 0, 1, 2로 반복
    }, 1000);

    // 컴포넌트 언마운트 시 interval 제거
    return () => clearInterval(intervalId);
  }, []);

  // 색상 배열
  const colors = ['red', 'black', 'black'];

  return (
    <div className="Container">
      <div className="title">
        <h1 style={{ color: colors[colorIndex] }}>가위</h1>
        <h1 style={{ color: colors[(colorIndex + 1) % 3] }}>바위</h1>
        <h1 style={{ color: colors[(colorIndex + 2) % 3] }}>보!</h1>
      </div>
      <div className='Boxes'>
        <Box title="User" item={userSelect} result = {result}/>
        <Box title="Computer" item={computerSelect} result = {result}/>
      </div>

      <div className='Buttons'>
        <button onClick={() => play("rock")}><FontAwesomeIcon icon={faHandBackFist} size="2x"/></button>
        <button onClick={() => play("scissors")}><FontAwesomeIcon icon={faHandScissors} size="2x"/></button>
        <button onClick={() => play("paper")}><FontAwesomeIcon icon={faHand} size="2x"/></button>
      </div>
      
    </div>
  );
}

export default App;
