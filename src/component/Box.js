import React from 'react'

const Box = (props) => {
  let result;

  if (props.title === "Computer" &&
    props.result !== "TIE" &&
    props.result !== null
  ){
    result = props.result === "WIN" ? "LOSE" : "WIN";
  }
  else{
    result = props.result;
  }

  return (
    <div className={`box ${result}`}>
      <h2>{props.title}</h2>
      <img className="item-img" src={props.item ? props.item.img : "https://mblogthumb-phinf.pstatic.net/20120711_299/king940_1342016154926eKCVn_JPEG/%C1%D9%B8%AE%BE%F0.jpg?type=w800"} />
      <h2>{result ? result : "게임을 시작해주세요!"}</h2>
    </div>
  )
}

export default Box