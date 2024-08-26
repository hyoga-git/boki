import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [priceZengetu, setPriceZengetu] = useState("");
  const [numberZengetu, setNumberZengetu] = useState(0);

  const [priceTougetu, setPriceTougetu] = useState("");
  const [numberTougetu, setNumberTougetu] = useState(0);

  const [priceKansei, setPriceKansei] = useState(0);
  const [numberKansei, setNumberKansei] = useState(0);

  const [priceGetumatu, setPriceGetumatu] = useState(0);
  const [numberGetumatu, setNumberGetumatu] = useState(0);

  const [selectMethod, setSelectMethod] = useState(""); // 計算方法の選択状態

  // 全ての入力が完了したかをチェックし、計算を実行する関数
  const calculateNumberTougetu = () => {
    if (numberZengetu >= 0 && numberKansei >= 0 && numberGetumatu >= 0) {
      const Shikakari = numberKansei + numberGetumatu;
      const calculatedNumberTougetu = Shikakari - numberZengetu;
      setNumberTougetu(calculatedNumberTougetu); // 計算結果を状態にセット
    }
  };

  const juge = () => {
    if (selectMethod === "heikin") {
      // 価格を数値に変換
      const priceTougetuNumber = parseFloat(priceTougetu) || 0;
      const priceZengetuNumber = parseFloat(priceZengetu) || 0;
      
      // 平均単価を計算
      const heikinTanka = (priceTougetuNumber + priceZengetuNumber) / (numberTougetu + numberZengetu);
      console.log(`平均法が選択されました。結果: ${heikinTanka}`);
    } else if (selectMethod === "sakiire") {
      console.log(`先入先出法が選択されました`);
    } else {
      console.log(`計算方法が選択されていません`);
    }
  };
  

  // 入力が変更されるたびに計算を実行
  useEffect(() => {
    calculateNumberTougetu();
  }, [numberZengetu, numberKansei, numberGetumatu]);

  // 計算方法のラジオボタンが変更されたときの処理
  useEffect(() => {
    juge();
  }, [selectMethod]);

  return (
    <div className="App">
      <section id="bookkeeping">
        <h2>総合原価計算</h2>
        <form>
          <input
            type="radio"
            name="answer-method"
            value="sakiire"
            onClick={() => setSelectMethod("sakiire")}
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
          <input type="radio" name="loss" />
          仕損
          <input type="radio" name="loss" />
          減損
          <br />
          <select>
            <option value="直接材料費">直接材料費</option>
            <option value="仕掛品">仕掛品</option>
          </select>
        </form>

        <div className="box">
          <div className="zengetu">
            <h3>前月</h3>
            <p>
              価格:
              <input
                type="number"
                value={priceZengetu} // カンマ付きで表示
                onChange={(e) => setPriceZengetu(parseInt(e.target.value,10))}
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
            <h3>月末</h3>
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
          </div>
        </div>
        <div className="answer">
          <p>完成品原価: 値</p>
          <p>完成品原価: 値</p>
          <p>月末仕掛品原価: ＠</p>
        </div>
      </section>
    </div>
  );
}
