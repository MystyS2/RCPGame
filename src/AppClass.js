import React, { Component } from "react";
import BoxClass from "./component/BoxClass";
// 폰트어썸 import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandBackFist } from "@fortawesome/free-solid-svg-icons";
import { faHandScissors } from "@fortawesome/free-solid-svg-icons";
import { faHand } from "@fortawesome/free-solid-svg-icons";
// nextui import
import {
  NextUIProvider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
// 폭죽 효과
import confetti from "canvas-confetti";

const choice = {
  rock: {
    name: "Rock",
    img: "https://www.pngfind.com/pngs/b/56-563277_rock-paper-scissors-png-rock-paper-scissors-clipart.png",
  },
  scissors: {
    name: "Scissors",
    img: "https://www.seekpng.com/png/detail/111-1114370_rock-paper-scissors-rock-paper-scissors-clipart.png",
  },
  paper: {
    name: "Paper",
    img: "https://www.vhv.rs/dpng/d/490-4906131_rock-paper-scissors-clipart-rock-paper-scissors-png.png",
  },
};

export default class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelect: null, // user 선택
      computerSelect: null, // computer 선택
      result: "", // 승부 결과(user 기준)
      colorIndex: 0, // title colors 리스트 인덱스
      userScore: 0, // user 점수
      computerScore: 0, // computer 점수
    };
  }

  // 랜덤으로 가위/바위/보 를 선택하는 함수
  randomChoice = () => {
    const itemArray = Object.keys(choice);
    const randomItem = Math.floor(Math.random() * itemArray.length);
    return choice[itemArray[randomItem]];
  };

  // 승부 결과를 판단하는 함수
  judgement = (user, computer) => {
    if (user.name === computer.name) {
      return "TIE";
    } else if (user.name === "Rock")
      return computer.name === "Scissors" ? "WIN" : "LOSE";
    else if (user.name === "Scissors")
      return computer.name === "Paper" ? "WIN" : "LOSE";
    else if (user.name === "Paper")
      return computer.name === "Rock" ? "WIN" : "LOSE";
  };

  // 색상 배열
  colors = ["#41ad4d", "#fbb03b", "#fbb03b"];

  // 폭죽 효과
  firework() {
    const scalar = 2;
    const unicorn = confetti.shapeFromText({ text: "🦄", scalar });

    // 폭죽 기본 설정
    const defaults = {
      spread: 90, //방향
      ticks: 30, //갯수
      gravity: 3.5,
      decay: 0.96,
      startVelocity: 20, //범위
      shapes: [unicorn],
      scalar: scalar,
    };

    // 폭죽 쏘기(설정을 다르게 3번)
    function shoot() {
      confetti({
        ...defaults,
        particleCount: 30,
      });

      confetti({
        ...defaults,
        particleCount: 5,
        flat: true,
      });

      confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ["circle"],
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
  }

  play = (userChoice) => {
    // computer의 랜덤 선택
    const computerChoice = this.randomChoice();
    // 선택 결과 비교(user win 시 폭죽을 바로 터뜨리기 위해 결과를 tempResult에 저장했다가 조건문과 setResult에 사용)
    const tempResult = this.judgement(choice[userChoice], computerChoice);
    // state update
    this.setState({
      userSelect: choice[userChoice], // user 선택
      computerSelect: computerChoice, // computer 선택
      result: tempResult, // 승부 결과
    });
    // 폭죽 터뜨리기, 점수 계산
    if (tempResult === "WIN") {
        this.firework();
        this.setState((prevState) => ({
          userScore: prevState.userScore + 1,
        }));
      } else if (tempResult === "LOSE") {
        this.setState((prevState) => ({
          computerScore: prevState.computerScore + 1,
        }));
    }
  };

  // 1초마다 타이틀 색깔 변경
  componentDidMount() {
    let intervalId = setInterval(() => {
        this.setState((prevState) => ({
            colorIndex: (prevState.colorIndex + 2) % 3
        }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId); // interval 제거
  }

  render() {
    return (
      <NextUIProvider>
        <div className="app bg-gradient-to-r from-bg-gradient-to-r from-rose-100 to-teal-100">
          <div className="Container backdrop-blur-sm bg-white/50">
            <div className="title">
              <h1 style={{ color: this.colors[this.state.colorIndex] }}>가위</h1>
              <h1 style={{ color: this.colors[(this.state.colorIndex + 1) % 3] }}>바위</h1>
              <h1 style={{ color: this.colors[(this.state.colorIndex + 2) % 3] }}>보!</h1>
            </div>

            <Table
              aria-label="User and Computer Scores"
              className="justify-between before:bg-white/10 border-white/20 border-1 before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] ml-1 gap-0 "
            >
              <TableHeader>
                <TableColumn>USER</TableColumn>
                <TableColumn>COMPUTER</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell className="userScore">{this.state.userScore}</TableCell>
                  <TableCell className="cpuScore">{this.state.computerScore}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="Boxes">
              <BoxClass
                className="backdrop-blur-sm bg-white/30 rounded-large"
                title="User"
                item={this.state.userSelect}
                result={this.state.result}
              />
              <BoxClass
                className="backdrop-blur-sm bg-white/30 rounded-large"
                title="Computer"
                item={this.state.computerSelect}
                result={this.state.result}
              />
            </div>

            <div className="Buttons">
              <button onClick={() => this.play("rock")} aria-label="Rock">
                <FontAwesomeIcon icon={faHandBackFist} size="2x" />
              </button>
              <button onClick={() => this.play("scissors")} aria-label="Scissors">
                <FontAwesomeIcon icon={faHandScissors} size="2x" />
              </button>
              <button onClick={() => this.play("paper")} aria-label="Paper">
                <FontAwesomeIcon icon={faHand} size="2x" />
              </button>
            </div>
          </div>
        </div>
      </NextUIProvider>
    );
  }
}
