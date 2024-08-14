import React from "react";
import { useState, useEffect } from 'react';
import './App.css';
import Box from './component/Box';
// 폰트어썸 import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandBackFist } from "@fortawesome/free-solid-svg-icons";
import { faHandScissors } from "@fortawesome/free-solid-svg-icons";
import { faHand } from "@fortawesome/free-solid-svg-icons";
// nextui import
import {NextUIProvider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
// 폭죽 효과
import confetti from 'canvas-confetti';

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
  const [userSelect, setUserSelect] = useState(null); // 유저 선택
  const [computerSelect, setComputerSelect] = useState(null); // 컴퓨터 선택
  const [result, setResult] = useState(null); // 승패 결과
  const [colorIndex, setColorIndex] = useState(0);  // 타이틀 색 변화에 사용하는 colors 리스트 인덱스

  const play =(userChoice)=>{
    // user의 선택
    setUserSelect(choice[userChoice]);
    // computer의 선택
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    // 선택 결과 비교(user win 시 폭죽을 바로 터뜨리기 위해 결과를 tempResult에 저장했다가 조건문과 setResult에 사용)
    const tempResult = judgement(choice[userChoice], computerChoice)
    setResult(tempResult);
    // 폭죽 터뜨리기
    if(tempResult==="WIN"){
      firework();
    }
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

  // 1초마다 타이틀 색깔 변경
  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex(prevIndex => (prevIndex + 2) % 3); // 0, 1, 2로 반복
    }, 1000);

    // 컴포넌트 언마운트 시 interval 제거
    return () => clearInterval(intervalId);
  }, []);

  // 색상 배열
  const colors = ['#41ad4d', '#fbb03b', '#fbb03b'];

  // 폭죽 효과
  function firework() {
    var scalar = 2;
    var unicorn = confetti.shapeFromText({ text: '🦄', scalar });
    var defaults = {
      spread: 90, //방향
      ticks: 30,  //갯수
      gravity: 3.5,
      decay: 0.96,
      startVelocity: 20, //범위
      shapes: [unicorn],
      scalar
    };
    
    function shoot() {
      confetti({
        ...defaults,
        particleCount: 30
      });
    
      confetti({
        ...defaults,
        particleCount: 5,
        flat: true
      });
    
      confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ['circle']
      });
    }
    
    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
}

  return (
    <NextUIProvider>
      <div className="app bg-gradient-to-r from-bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="Container backdrop-blur-sm bg-white/50">
          <div className="title">
            <h1 style={{ color: colors[colorIndex] }}>가위</h1>
            <h1 style={{ color: colors[(colorIndex + 1) % 3] }}>바위</h1>
            <h1 style={{ color: colors[(colorIndex + 2) % 3] }}>보!</h1>
          </div>

          <Table className="justify-between before:bg-white/10 border-white/20 border-1 before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] ml-1 gap-0 ">
            <TableHeader>
              <TableColumn>USER</TableColumn>
              <TableColumn>COMPUTER</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className='Boxes'>
            <Box className="backdrop-blur-sm bg-white/30 rounded-large" title="User" item={userSelect} result = {result}/>
            <Box className="backdrop-blur-sm bg-white/30 rounded-large" title="Computer" item={computerSelect} result = {result}/>
          </div>

          <div className='Buttons'>
            <button onClick={() => play("rock")}><FontAwesomeIcon icon={faHandBackFist} size="2x"/></button>
            <button onClick={() => play("scissors")}><FontAwesomeIcon icon={faHandScissors} size="2x"/></button>
            <button onClick={() => play("paper")}><FontAwesomeIcon icon={faHand} size="2x"/></button>
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
}

export default App;
