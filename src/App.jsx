import { useState, useEffect } from "react";
import { Button, Container } from "@mui/material";
import Modal from "react-modal";
import "./App.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    minWidth: "50%",
    height:"50%",
  },
};


export default function App() {
  const [priceZengetu, setPriceZengetu] = useState(0);
  const [numberZengetu, setNumberZengetu] = useState(0);
  
  
  const [priceTougetu, setPriceTougetu] = useState(0);
  const [numberTougetu, setNumberTougetu] = useState(0);

  const [priceKansei, setPriceKansei] = useState(0);
  const [numberKansei, setNumberKansei] = useState(0);

  const [priceGetumatu, setPriceGetumatu] = useState(0);
  const [numberGetumatu, setNumberGetumatu] = useState(0);
  


  const [shinchokuZen, setShinchokuZen] = useState(100); // 進捗度
  const [shinchokuMatu, setShinchokuMatu] = useState(100); //進捗度

  const [selectMethod, setSelectMethod] = useState("sakiire"); // 計算方法の選択状態
  const [selectType, setSelectType] = useState("chokuzai"); // 計算方法の選択状態
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);





 
  


  // 計算結果を保存する状態

  // 当月数量を計算
  const calculateNumberTougetu = () => {
    if (numberZengetu >= 0 && numberKansei >= 0 && numberGetumatu >= 0) {

      const Shikakari = numberKansei + numberGetumatu*shinchokuMatu/100;
      const calculatedNumberTougetu = Shikakari - numberZengetu*shinchokuZen/100;
      setNumberTougetu(calculatedNumberTougetu);
    }
  };

  const Type = () => {
    
    if (selectType === "shikakari") {
      setEditModalIsOpen(true);
     
    }
  };
  



  // 計算処理
  const juge = () => {
      
    if (selectMethod === "heikin") {
      // 価格を数値に変換
      const priceTougetuNumber = parseFloat(priceTougetu) || 0;
      const priceZengetuNumber = parseFloat(priceZengetu) || 0;
      

      // 平均単価を計算
      
      const Tanka = (priceTougetuNumber + priceZengetuNumber) / (numberTougetu + numberZengetu*shinchokuZen/100);
    

      const kanseiV = Tanka * numberKansei;

      setPriceKansei(kanseiV);

      const getumatuV = Tanka * numberGetumatu*shinchokuMatu/100;
      setPriceGetumatu(getumatuV);

    } else if (selectMethod === "sakiire") {
      console.log(`先入先出法が選択されました`);

      const SakiKanseiNumber = numberKansei - (numberZengetu*shinchokuZen/100);
      const Tanka = priceTougetu / numberTougetu;

      const kanseiV = (SakiKanseiNumber * Tanka) + priceZengetu;
      setPriceKansei(kanseiV);

      const getumatuV = Tanka * numberGetumatu*shinchokuMatu/100;
      setPriceGetumatu(getumatuV);

    } else {
      console.log(`計算方法が選択されていません`);
    }
  };

useEffect(()=>{
  if(selectType==="shikakari"){
    Type();
  }else{
    setShinchokuZen(100);
    setShinchokuMatu(100);
  }

},[selectType])

  // 完成品総合原価と月末仕掛品原価を計算
  useEffect(() => {
    calculateNumberTougetu();

  }, [numberZengetu, numberKansei, numberGetumatu,selectType]);

  // 計算方法や価格の変更に応じて計算結果を更新

  return (
    <div className="App">
      <section id="bookkeeping">
        <h2>総合原価計算ジェネレーター</h2>


        <Container maxWidth="sm">
      <Modal isOpen={editModalIsOpen} style={customStyles}>
        前月:進捗度<input type="number"
                  max="100"
                  onChange={(e) => {
                    const valueZen = parseInt(e.target.value, 10);
                    if (valueZen > 100) {
                      setShinchokuZen(100); // 100より大きければ100にセット
                    } else {
                      setShinchokuZen(valueZen);
                    }
                  }}
                  />%
        <br />
        <br />
        月末:進捗度
<input
  type="number"
  max="100" // 最大値を100に制限 (ブラウザ側でのヒント)
  onChange={(e) => {
    const valueMatu = parseInt(e.target.value, 10);
    if (valueMatu > 100) {
      setShinchokuMatu(100); // 100より大きければ100にセット
    } else {
      setShinchokuMatu(valueMatu);
    }
  }}
/>%
        <br />
        <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setEditModalIsOpen(false);
        }}
      >
        <p>進捗度を更新する</p>
      </Button>
      </Modal>
    </Container>
             <form>
          <input
            type="radio"
            name="answerType"
            value="chokuzai"
            onChange={() => setSelectType("chokuzai")}
            checked={selectType === "chokuzai"}
          />
          直接材料費
          <input
            type="radio"
            name="answerType"
            value="shikakari"
            onChange={() => {
              setSelectType("shikakari");
              
            }}
            checked={selectType === "shikakari"}
          />
          仕掛品
          <br />
          <br />
          <input
            type="radio"
            name="answer-method"
            value="sakiire"
            onChange={() => setSelectMethod("sakiire")}
            checked={selectMethod === "sakiire"}
          />
          先入先出法
          <input
            type="radio"
            name="answer-method"
            value="heikin"
            onClick={() => setSelectMethod("heikin")}
          />
          平均法
          <br />
        </form>

        <div className="box">
          <div className="zengetu">
            <h3>前月({shinchokuZen}%)</h3>
            <p>
              価格:
              <input

                type="number"
                value={priceZengetu}
                onChange={(e) => setPriceZengetu(parseInt(e.target.value, 10))}
              />
            </p>
            <p>
  個数:
  <input
    type="number"
    value={numberZengetu}
    onChange={(e) => setNumberZengetu(parseInt(e.target.value, 10))}
  />
</p>
<p>
            進捗度: {isNaN(numberZengetu * shinchokuZen / 100)  ? 0
                :Math.min(numberZengetu * shinchokuZen / 100, 9999999)} 個
</p>
          </div>

          <div className="tougetu">
            <h3>当月</h3>
            <p>
              価格:
              <input
                type="number"
                value={priceTougetu}
                onChange={(e) => setPriceTougetu(parseInt(e.target.value, 10))}
              />
            </p>
            <p>
              個数:
              <input type="number" value={numberTougetu} readOnly />
            </p>
          </div>

          <div className="kansei">
            <h3>完成品</h3>
            <p>
              価格:
              <input type="number" value={priceKansei} readOnly />
            </p>
            <p>
              個数:
              <input
                type="number"
                value={numberKansei}
                onChange={(e) => setNumberKansei(parseInt(e.target.value, 10))}
              />
            </p>
          </div>

          <div className="getumatu">
            <h3>月末({shinchokuMatu}%)</h3>
            
            <p>
              価格:
              <input type="number" value={priceGetumatu} readOnly />
            </p>
            <p>
              個数:
              <input
                type="number"
                value={numberGetumatu}
                onChange={(e) => setNumberGetumatu(parseInt(e.target.value, 10))}
              />
             </p>
             <p>
            進捗度: {isNaN(numberGetumatu * shinchokuMatu / 100)  ? 0
                :Math.min(numberGetumatu * shinchokuMatu / 100, 9999999)} 個
</p>
          </div>
        </div>


      </section>
    </div>
  );
}
