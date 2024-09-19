import { useState, useEffect } from "react";
import { Button, Container } from "@mui/material";
import Modal from "react-modal";
import "./App.css";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    height:"50%",
    margin:"auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width:"clamp(15.625rem, -12.153rem + 57.87vw, 31.25rem)",
  },
};



export default function App() {
  const [priceZengetu, setPriceZengetu] = useState(5080);
  const [numberZengetu, setNumberZengetu] = useState(20);
  
  
  const [priceTougetu, setPriceTougetu] = useState(28800);
  const [numberTougetu, setNumberTougetu] = useState(0);

  const [priceKansei, setPriceKansei] = useState(31460);
  const [numberKansei, setNumberKansei] = useState(130);

  const [priceGetumatu, setPriceGetumatu] = useState(2420);
  const [numberGetumatu, setNumberGetumatu] = useState(10);
  


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
    juge();
    calculateNumberTougetu();
    
  }, [priceZengetu,priceTougetu,numberZengetu, numberKansei, numberGetumatu,selectType,selectMethod]);

  // 計算方法や価格の変更に応じて計算結果を更新

  return (
    <div className="App">
      
      <section id="bookkeeping">
      <h2>総合原価計算ジェネレーター</h2>
        
        <div class="top-explanation">
        <h2>説明</h2>
        <hr />
        <p>工業簿記/原価計算における総合原価計算について値を入力する事で自動的に解答が求められるジェネレーター</p>
        <p>月初製造原価、当月製造原価、月初仕掛品個数、月末仕掛品量個数、当月完成品個数を入力する</p>
        <p>金額の計算方法を先入先出法or平均法で選択し完成品製造原価と月末製造原価が求められる</p>
        <p>仕掛品についての算出は仕掛品を選択し、進捗度を入力してください</p>
        </div>
        <h2>例/直接材料費についての計算を行います。計算方法を選択し、解答を算出してください</h2>

        
        <div class="top-calu">
          <div>
        <table>
        <caption>生産データ</caption>
        <thead>
            <tr>
                <th>項目</th>
                <th>数量</th>
                <th>進捗度</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>月初仕掛品量</td>
                <td>20個</td>
                <td>20%</td>
            </tr>
            <tr>
                <td>当月投入量</td>
                <td>120個</td>
                <td>—</td>
            </tr>
            <tr>
                <td>投入合計</td>
                <td>140個</td>
                <td>—</td>
            </tr>
            <tr>
                <td>当月完成品量</td>
                <td>130個</td>
                <td>—</td>
            </tr>
            <tr>
                <td>月末仕掛品量</td>
                <td>10個</td>
                <td>80%</td>
            </tr>
            <tr>
                <td>生産合計</td>
                <td>140個</td>
                <td>—</td>
            </tr>
        </tbody>
    </table>
    

    <table>
        <caption>原価データ</caption>
        <thead>
            <tr>
                <th>項目</th>
                <th>金額</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>月初仕掛品原価（直接材料費）</td>
                <td>5,080円</td>
            </tr>
            <tr>
                <td>月初仕掛品原価（加工費）</td>
                <td>364円</td>
            </tr>
            <tr>
                <td>当月製造費用（直接材料費）</td>
                <td>28,800円</td>
            </tr>
            <tr>
                <td>当月製造費用（加工費）</td>
                <td>21,440円</td>
            </tr>
        </tbody>
    </table>
    </div>
    
    <div class="boki-generator">
          
    <Container maxWidth="sm" >
          <div className="modal-class">
      <Modal isOpen={editModalIsOpen} style={customStyles}>
        <p>前月:進捗度<input type="number" class="modal-input"
                  max="100"
                  onChange={(e) => {
                    const valueZen = parseInt(e.target.value, 10);
                    if (valueZen > 100) {
                      setShinchokuZen(100); // 100より大きければ100にセット
                    } else {
                      setShinchokuZen(valueZen);
                    }
                  }}
                  />%</p>
        <br />
        <br />
        <p>月末:進捗度
<input
  type="number" class="modal-input"
  max="100" // 最大値を100に制限 (ブラウザ側でのヒント)a
  onChange={(e) => {
    const valueMatu = parseInt(e.target.value, 10);
    if (valueMatu > 100) {
      setShinchokuMatu(100); // 100より大きければ100にセット
    } else {
      setShinchokuMatu(valueMatu);
    }
  }}
/>%</p>
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
      </div>
    </Container>
             <form class="title-top">
              <span>材料について</span>
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
          <span>計算方法
          </span>
          <input
            type="radio"
            name="answer-method"
            value="sakiire"
            onChange={() => setSelectMethod("sakiire")}
            
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


   
    </div>
    </div>


    </section>
    </div>
  );
}

