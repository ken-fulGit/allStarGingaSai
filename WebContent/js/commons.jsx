"use strict";

const domContainer = document.querySelector("#main");
const root = ReactDOM.createRoot(domContainer);
root.render(<RootView />);

const doneimg = "../img/panel/done.png";

const items = [
  {
    id: 1,
    img: { alt: "グランシップカレー半年分", src: "../img/panel/01.png" },
  },
  { id: 2, img: { alt: "任天堂スイッチ", src: "../img/item/01.jpg" } },
  { id: 3, img: { alt: "Amazon Alexa", src: "../img/item/01.jpg" } },
  {
    id: 4,
    img: { alt: "グランシップカレー半年分", src: "../img/item/01.jpg" },
  },
  {
    id: 5,
    img: {
      alt: "うまい棒人気８種類×５本 40本セット",
      src: "../img/item/01.jpg",
    },
  },
  {
    id: 6,
    img: {
      alt: "うまい棒人気８種類×５本 40本セット",
      src: "../img/item/01.jpg",
    },
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
    </div>
  );
}

function ItemBox({ img, id }) {
  const [isopen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    console.log("ST");
    localforage.getItem(openKey).then((d) => setIsOpen(!!d));
    localforage.getItem(nameKey).then((n) => setName(n));
    return () => {};
  }, []);

  let { src, alt } = img;

  if (!isopen) {
    if (name) {
      src = "../img/panel/done.png";
    } else {
      src = `../img/panel/${String(id).padStart(2, "0")}.png`;
    }
  }

  const openKey = `${id}_isopen`;
  const nameKey = `${id}_name`;

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
      {[<img key={src} alt={alt} src={src} width={128} height={128} />]}

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
          setIsOpen(!isopen);
          localforage.setItem(openKey, !isopen);
        }}
      >
        選択
      </div>
      <div className="name-box m-1">
        <input
          type="text"
          placeholder="名前欄"
          value={name}
          onChange={(e) => {
            const name = e.target.value;
            setName(e.target.value);
            localforage.setItem(nameKey, name);
            console.log();
          }}
        />
      </div>
    </div>
  );
}
