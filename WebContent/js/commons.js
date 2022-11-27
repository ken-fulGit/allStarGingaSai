function buttonClick(no){
	const itemMap = new Map([["01", "グランシップカレー半年分"],["02", "未使用"], ["03", "任天堂スイッチ"],["04","Amazon Alexa"],["05","うまい棒人気８種類×５本 40本セット"]]);
	let itemNo = "item" + no;
	let imgNo = "img" + no;
	document.getElementById(imgNo).src= "../img/panel/done.png";
	document.getElementById(itemNo).outerHTML="<div class='animate__animated animate__fadeInDown animate__slow m-2' id="+itemNo+"><a href='../img/item/" + no + ".jpg' target='_blank'>"+ itemMap.get(no) + "</a></div>";


}