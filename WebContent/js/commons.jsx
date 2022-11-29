"use strict";

const domContainer = document.querySelector("#main");
const root = ReactDOM.createRoot(domContainer);
root.render(<RootView />);

const doneimg = "../img/panel/done.png";

const items = [
  {
    id: 1,
    img: { alt: "グランシップカレー半年分", src: "../img/item/01.jpg" },
  },
  {
	id: 2,
	img: { alt: "1等☆任天堂スイッチ", src: "../img/item/03.jpg" },
  },
  {
	id: 3,
	img: { alt: "Amazon Alexa", src: "../img/item/04.jpg" },
  },
  {
    id: 4,
    img: { alt: "ワイヤレスイヤホン5000円相当", src: "../img/item/06.jpg" },
  },
  {
    id: 5,
    img: { alt: "うまい棒人気８種類×５本 40本セット",src: "../img/item/05.jpg" },
  },
  {
    id: 6,
    img: { alt: "うまい棒人気８種類×５本 40本セット",src: "../img/item/05.jpg" },
  },
  {
    id: 7,
    img: { alt: "ギフトカード1000円分(giftee)",src: "../img/item/giftee.jpg" },
  },
  {
    id: 8,
    img: { alt: "ギフトカード1000円分(giftee)",src: "../img/item/giftee.jpg" },
  },
  {
    id: 9,
    img: { alt: "高級和牛 10,000円分",src: "../img/item/07.jpg" },
  },
  {
    id: 10,
    img: { alt: "ギフトカード1000円分(giftee)",src: "../img/item/giftee.jpg" },
  },
  {
    id: 11,
    img: { alt: "ギフトカード1000円分(giftee)",src: "../img/item/giftee.jpg" },
  },
  {
    id: 12,
    img: { alt: "ご当地つけ麺セット",src: "../img/item/08.jpg" },
  },
  {
    id: 13,
    img: { alt: "スマートウォッチ/fitbit",src: "../img/item/fitbit.png" },
  },
  {
    id: 14,
    img: { alt: "ギフトカード1000円分(giftee)",src: "../img/item/giftee.jpg" },
  },
  {
    id: 15,
    img: { alt: "うまい棒人気８種類×５本 40本セット",src: "../img/item/05.jpg" },
  },
  {
    id: 16,
    img: { alt: "グランシップカレー半年分", src: "../img/item/01.jpg" },
  },
  {
    id: 17,
    img: { alt: "JCBカード1万円分", src: "../img/item/jcb.jpg" },
  },
  {
    id: 18,
    img: { alt: "アイウォーマー", src: "../img/item/09.jpg" },
  },
  {
    id: 19,
    img: { alt: "ぎん/グランシップ共通　お食事券1万円分", src: "../img/item/gg.webp" },
  },
  {
    id: 20,
    img: { alt: "タブレット（KindleFire7", src: "../img/item/kindleFire7.jpg" },
  },
];


function RootView() {
  return (
    <div
      style={{
        // 横着してここに直接書く
        display: "grid",
        gridTemplate: "300px / 1fr 1fr 1fr 1fr 1fr",
      }}
    >
      {items.map((e, i) =>
        e == "nop" ? <div></div> : <ItemBox {...e} key={i} />
      )}
      <ResetButton />
    </div>
  );
}

function ItemBox({ img, id }) {
  const openKey = `${id}_isopen`;
  const nameKey = `${id}_name`;
  const doneKey = `${id}_done`;

  const [isopen, setIsOpen] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    localforage.getItem(openKey).then((d) => setIsOpen(!!d));
    localforage.getItem(nameKey).then((n) => setName(n));
    localforage.getItem(doneKey).then((n) => setDone(!!n));
    return () => {};
  }, []);

  const { alt } = img;
  let src = "";

  console.log(isopen);

  if (!isopen) {
    src = `../img/panel/${String(id).padStart(2, "0")}.png`;
  } else if (!done) {
    src = img.src;
  } else {
    src = "../img/panel/done.png";
  }

  const titleCss = isopen
    ? "animate__animated animate__fadeInDown animate__slow m-2"
    : "item-name";

  return (
    <div
      className="col border border-dark rounded p-2"
      id={`panel${id}`}
      style={{
        display: "grid",
        gridTemplate: "3fr 1fr 1fr/auto",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <a
        href="#"
        onClick={() => {
          setIsOpen(!isopen);
          localforage.setItem(openKey, !isopen);
        }}
      >
        <img key={src} alt={alt} src={src} width={128} height={128} />
      </a>
      <div>
        <div className={titleCss} id={`item${id}`}>
          {isopen && (
            <a href={src} target="_blank">
              {alt}
            </a>
          )}
        </div>
      </div>
      <div
        className="btn btn-secondary m-1"
        onClick={() => {
          setDone(!done);
          localforage.setItem(doneKey, !done);
        }}
      >
        選択
      </div>
      <div className="name-box m-1">
        <input
          type="text"
          placeholder="名前欄"
          value={name}
          onChange={({ target }) => {
            const name = target.value;
            setName(name);
            localforage.setItem(nameKey, name);
          }}
        />
      </div>
    </div>
  );
}
function ResetButton() {
  return (
    <div
      className="col border border-dark rounded p-2"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        onClick={() => localforage.clear().then(() => window.location.reload())}
      >
        <span class="material-symbols-outlined">refresh</span>
      </div>
    </div>
  );
}
