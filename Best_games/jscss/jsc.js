//20050909
var notLang="en";
var c_c=new Array("#EFEFEF","#7384B5","#EFEFEF","#7384B5","#EFEFEF");
var c_f=new Array("#E7D0A7","#A77E5E","#E7D0A7","#A77E5E","white");
var c_h=new Array("#E6E0C6","#49A049","#E6E0C6","#49A049","white");
var c_j=new Array("#A7BAE7","#5969AA","#A7BAE7","#5969AA","white");
var c_n=new Array("#EEBBBB","#AF6A65","#EEBBBB","#AF6A65","white");
var c_ff=new Array("lemonchiffon","#00BF00","lemonchiffon","#00DF00","white");
var c_p=new Array("cornsilk","#CC9966","cornsilk","burlywood","white");
var c_default="p";
var wf="";
var bf="";
var ibc="";
var bb="";
var bc="";
var set="";
var ibw=2;
var hb="highlight";
var hc="white";
var pid=(new Date()).getTime();
var vwdisplay=false;
var dneu=0;
var dalt=0;
var ok=false;
var ih="";
var oldGraphicComments=false;
var oldColoredFields=new Array(64);
var oldNumberOfArrows=0;
var dbg="none";
var ob="";
var navDelay="1";
var w=true;
if (notLang == "de") {
	var title="Varianten";
	var qwtitle="Weiss am Zug";
	var qbtitle="Schwarz am Zug";
	var hilfe="Hilfe";
	var weiterehilfe="Weitere Hilfe";
	var loesung="Lösung";
	var schliessen="Schließen";
	var nochmal="Nochmal";
} else {
	var title="Lines";
	var qwtitle="Whites move";
	var qbtitle="Blacks move";
	var hilfe="Help";
	var weiterehilfe="More help";
	var loesung="Solution";
	var nochmal="Try again";
	var schliessen="Continue";
}
var path1="../jscss/";
if (screen.width <=800) {
	var fieldSize=40;
	var path2="../pieces/40/";
	var path3="../arrows/40/";
} else {
	var fieldSize=50;
	var path2="../pieces/50/";
	var path3="../arrows/50/";
}
var borderSize=fieldSize/10*4;
var frameSize=8*fieldSize+26+2*borderSize+2*ibw;
var vWin="left="+(frameSize/2+screen.width/2-150).toString()+",top="+(screen.height/2-100).toString()+",width=300,height=200,scrollbars=yes";
var qWin="left="+(frameSize/2+screen.width/2-160).toString()+",top="+(screen.height/2-113).toString()+",dependent=yes,width=320,height=226,scrollbars=no";
var popupblocker=false;
var isIE4=false;
var isNav6=false;
var isOpera=false;
if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion)>3) isIE4=true;
if (navigator.appName == "Netscape" && parseInt(navigator.appVersion)>4) isNav6=true;
if (navigator.userAgent.search("Opera")!=-1) {
	isOpera=true;
	isIE4=false;
	isNav6=false;
	dbg="";
	ob=path1+"blank.html";
}
var setTitle;
var initFrameset="<frameset onLoad=\"setTimeout('initFrames()',(isNav6)*1000)\" onUnload=\"if(vwStatus()){vw.close()};if(qwstat>0){qw.close()}\" cols=\""+frameSize+",*\" frameborder=\"0\" framespacing=\"0\"><frame src=\""+ob+"\" name=\"frame1\"><frame src=\""+ob+"\" name=\"frame2\"></frameset>";
var nh;
var res;
var dragstat=false;
var fstartsrc=false;
var fstopsrc=false;
var posx, posy, fstart, fstop;
var qwstat=0;
var qlqh;
var qlqh_gc;
var qhnr;
var qqpos;
var qindex;
var qspos;
var qiv=new Array();
var qt;
var starColor;
var omd=false;

function sbc(x) {
	wf=x[0];
	bf=x[1];
	ibc=x[2];
	bb=x[3];
	bc=x[4];
}

function draginit() {
	frame1.document.onmousedown = dragstart;
	frame1.document.onmousemove = drag;
	frame1.document.onmouseup = dragstop;
	frame2.document.onmousemove = qwf;
}

function qwf(event) {
	if(qwstat>0 && !qw.closed) qw.focus();
}

function dragstart(event) {
	var x,y,dummy;
	if(qwstat==0) {
		flipBoard(event);
		return;
	}
	if (omd) return;
	omd=true;
	if (qwstat!=1) return;
	x = isIE4 ? frame1.event.clientX : event.pageX;
	y = isIE4 ? frame1.event.clientY : event.pageY;
	x = Math.floor((x-10-borderSize-3)/fieldSize);
	y = Math.floor((y-10-borderSize-3)/fieldSize);
	if (x>=0 && x<=7 && y>=0 && y<=7) {
		fstart=8*y+x;
		dummy=(frame1.document.images[fstart].src);
		if (dummy!="" && !/sq\.gif/.test(dummy)) { 
			dragstat = true;
			fstartsrc = false;
			fstopsrc = false;
			fstartsrc= frame1.document.images[fstart].src;
			if (fstartsrc==pur(fstartsrc)) {
				frame1.document.images[fstart].src=path2+"sq.gif";
			} else {
				frame1.document.images[fstart].src=path2+"sq_.gif";
			}
			frame1.document.images[127].src=pur(fstartsrc);
		}
	}
}

function drag(event) {
	qwf(event);
	if(qwstat!=1) return false;
	if(!dragstat) return false;
	posx = isIE4 ? frame1.event.clientX : event.pageX;
	posy = isIE4 ? frame1.event.clientY : event.pageY;
	frame1.document.images[127].style.left=(posx-fieldSize/2-10)+"px";
	frame1.document.images[127].style.top=(posy-fieldSize/2-10)+"px";
	frame1.document.images[127].style.visibility="visible";
	return false;
}

function dragstop(event) {
	var x,y,dummy,dummy1,dummy2;
	omd=false;
	if(qwstat!=1||!dragstat) return;
	dragstat=false;
	x = isIE4 ? frame1.event.clientX : event.pageX;
	y = isIE4 ? frame1.event.clientY : event.pageY;
	x = Math.floor((x-10-borderSize-3-ibw)/fieldSize);
	y = Math.floor((y-10-borderSize-3-ibw)/fieldSize);
	frame1.document.images[127].style.visibility="hidden";
	frame1.document.images[127].style.left="0px";
	frame1.document.images[127].style.top="0px";
	if (x>=0 && x<=7 && y>=0 && y<=7) {
		fstop=8*y+x;
		fstopsrc=frame1.document.images[fstop].src;
		if (fstop==fstart) {
			fstopsrc=fstartsrc;
		}
		dummy1=fstart;
		dummy2=fstop;
		if(!w) {
			dummy1=63-dummy1;
			dummy2=63-dummy2;
		}
		for (var i=0; i<(d[qqpos][qindex+2].length); i+=3) {
			if(dummy1==d[qqpos][qindex+2][i] && dummy2==d[qqpos][qindex+2][i+1]){
				if (fstopsrc==pur(fstopsrc)) {
					frame1.document.images[fstop].src=pur(fstartsrc);
				} else {
					dummy=pur(fstartsrc).replace(/\.gif/,"_.gif");
					frame1.document.images[fstop].src=dummy;
				}
				if (i==0) {
					confirmSolution();
					return;
				} else {
					isNotSolution(i);
					return;
				}
			}
		}
		frame1.document.images[fstart].src=fstartsrc;
		frame1.document.images[fstop].src=fstopsrc;
	} else {
		frame1.document.images[fstart].src=fstartsrc;
	}
}

function pur(x) {
	x=x.replace(/_\.gif/,".gif");
	return x;
}

function isQuestion(x) {
	var dummy=d[x][8];
	if (dummy==0) dummy=1;
	dummy+=9;
	if ( (d[x].length>dummy && d[x][dummy][0]=="?") || (d[x].length>dummy+1 && d[x][dummy+1][0]=="?") ) {
		return true;
	}
	return false;
}

function fQ() {
	var dummy;
	for (var i=0;i<d.length;i++) {
		dummy=d[i][8];
		if (dummy==0) dummy=1;
		dummy+=9;
		if( (d[i].length>dummy && d[i][dummy][0]=="?" && d[i][4]==0) || (d[i].length>dummy+1 && d[i][dummy+1][0]=="?" && d[i][4]==0) ) {
			return i;
		}
	}
}

function initQuestion(x) {
	ok=false;
	var dummy,dummy1,regtest1,regtest2;
	starColor="black";
	if(d[x][4]==0) {
		qiv[0]--;
	}
	dummy=d[x][8];
	if (dummy==0) {
		dummy=1;
	}
	dummy+=9;
	if (d[x].length>dummy && d[x][dummy][0]=="?") {
		qqpos=x;
		qindex=dummy;
		qspos=d[x][dummy+1];
	}
	if (d[x].length>dummy+1 && d[x][dummy+1][0]=="?") {
		qqpos=x;
		qindex=dummy+1;
		qspos=d[x][dummy+2];
	}
	dummy1=d[qspos][1];
	regtest1=/\./g;
	regtest2=/\.\.\./g;
	if (!regtest1.test(dummy1)) {
		dummy=qbtitle;
	} else {
		if(regtest2.test(dummy1)) {
			dummy=qbtitle;
		} else {
			dummy=qwtitle;
		}
	}
	qt=d[x][qindex][1];
	var qws='<html><head><title>'+dummy+'</title><script language="JavaScript">var t;var ca=true;function countdown(){var m,s;var mstring,sstring;t--;m=Math.floor(t/60);s=t-m*60;if(m<10){mstring="0"+m;}else{mstring=""+m;}if(s<10){sstring="0"+s;}else{sstring=""+s;}document.getElementById("counter").innerHTML=mstring+":"+sstring;if(t>0&&ca){window.setTimeout("countdown()",1000);}}</script></head><body style="background-color:silver" onUnload="try{qwclosed()}catch(e){}"><div id="tadiv" style="position:absolute;left:10px;top:10px"><textarea id="ta" style="width:300px;height:100px" readonly="readonly"></textarea></div><div style="position:absolute;left:10px;top:123px;"><input id="b1" type="button" style="width:100px;color:black" value="" onClick="b1_onClick()"></div><div style="position:absolute;left:210px;top:123px;"><input id="b2" type="button" style="width:100px;color:gainsboro" value="'+nochmal+'" onClick="b2_onClick()"></div><div style="position:absolute;left:85px;top:170px;width:150px;border-style:inset;background-color:black;color:gold;font-size:x-large;border-color:white;"><div id="counter" align="center"></div></div></body></html>';
	popupblocker=false;
	qw = window.open("","qw"+pid,qWin);
	try {
		qw.document.open();
		qw.document.write("<html><body></body></html>");
		qw.document.close();
		pdummy=qw.document.getElementsByTagName("body")[0].text;
	} catch(e) {
		popupblocker=true;
		qwstat=0;
		starColor="red";
		terminateQuestion();
		ok=true;
		return;
	}
	qw.document.open();
	qw.document.write(qws);
	qw.document.close();
	setTimeout('qw.t=qt;qw.countdown();',navDelay);
	qhnr=0;
	if (d[qqpos][qindex+3][1]!=""||d[qqpos][qindex+3][2]!="") qhnr++;
	if (d[qqpos][qindex+3][3]!=""||d[qqpos][qindex+3][4]!="") qhnr++;
	if (qhnr>0) {
		setTimeout('qw.document.getElementById("b1").value=hilfe;',navDelay);
	} else {
		setTimeout('qw.document.getElementById("b1").value=loesung;',navDelay);
	}
	qlqh=d[qqpos][qindex+3][0];
	dummy=d[dneu][8];
	if (dummy==0) {
		dummy=1;
	}
	dummy+=9;
	if (d[dneu].length>dummy) {
		qlqh_gc = d[dneu][dummy];
	} else {
		qlqh_gc = "";
	}
	setTimeout('setMessage(d[qqpos][qindex+3][0])',navDelay);
	qw.b1_onClick=b1_onClick;
	qw.b2_onClick=b2_onClick;
	qw.qwclosed=qwclosed;
	if (isOpera) opwa();
	qwstat=1;
	ok=true;	
}

function opwa() {
	var opwav;
	if(qw.closed) {
		qwclosed();
		clearTimeout(opwav);
		return;
	}
	opwav=window.setTimeout("opwa()",100);
}

function terminateQuestion() {
	d[qqpos][qindex]="";
	frame2.document.getElementById("v"+qqpos).style.display="inline";
	frame2.document.getElementById("s"+qqpos).style.color=starColor;
	if (qwstat > 0) {
		qw.close();
	}
	qwstat=0;
	fstartsrc=false;
	fstopsrc=false;
	nc(qspos);
}

function resetPosition() {
	if (fstopsrc) {
		fstartsrc=pur(fstartsrc);
		fstopsrc=pur(fstopsrc);
		frame1.document.images[fstart].src=fstartsrc;
		frame1.document.images[fstop].src=fstopsrc;
		fstopsrc=false;
	}
}

function qwclosed() {
	if (qwstat!=0) {
		resetPosition();
		if (starColor!="lime") {
			starColor="red";
		}
		terminateQuestion();
	}
}

function setMessage(x) {
	if(isNav6||isOpera) {
		qw.document.getElementById("tadiv").innerHTML='<textarea id="ta" style="width: 300px; height:100px" readonly="readonly">'+x+'</textarea>';
	} else {
		qw.document.getElementById("ta").innerHTML=x;
	}
}

function confirmSolution() {
	qwstat=2;
	gcRefresh(d[qqpos][qindex+3][6]);
	starColor="lime";
	qw.ca=false;
	qw.document.getElementById("b1").value=schliessen;
	qw.document.getElementById("b2").style.color="gainsboro";
	setMessage(d[qqpos][qindex+3][5]);
	qw.focus();	
}

function isNotSolution(x) {
	qwstat=2;
	gcRefresh(d[qqpos][qindex+3][d[qqpos][qindex+2][x+2]+1]);
	qw.document.getElementById("b2").style.color="black";
	setMessage(d[qqpos][qindex+3][d[qqpos][qindex+2][x+2]]);
}

function showSolution() {
	confirmSolution();
	starColor="red";
	fstart=d[qqpos][qindex+2][0];
	fstop=d[qqpos][qindex+2][1];
	if(!w) {
		fstart=63-fstart;
		fstop=63-fstop;
	}
	fstartsrc= frame1.document.images[fstart].src;
	if (fstartsrc==pur(fstartsrc)) {
		frame1.document.images[fstart].src=path2+"sq.gif";
	} else {
		frame1.document.images[fstart].src=path2+"sq_.gif";
	}
	fstopsrc=frame1.document.images[fstop].src;
	if (fstopsrc==pur(fstopsrc)) {
		frame1.document.images[fstop].src=pur(fstartsrc);
	} else {
		dummy=pur(fstartsrc).replace(/\.gif/,"_.gif");
		frame1.document.images[fstop].src=dummy;
	}
}	

function b1_onClick() {
	var dummy;
	if (qw.document.getElementById("b1").value==hilfe) {
		resetPosition();
		qlqh=d[qqpos][qindex+3][1];
		qlqh_gc=d[qqpos][qindex+3][2];
		gcRefresh(qlqh_gc);
		setMessage(qlqh);
		if (qhnr==2) {
			qw.document.getElementById("b1").value=weiterehilfe;
		} else {
			qw.document.getElementById("b1").value=loesung;
		}
		qw.document.getElementById("b2").style.color="gainsboro";
		qwstat=1;
		return;
	}
	if (qw.document.getElementById("b1").value==weiterehilfe) {
		resetPosition();
		qlqh=d[qqpos][qindex+3][3];
		qlqh_gc=d[qqpos][qindex+3][4];
		gcRefresh(qlqh_gc);
		setMessage(qlqh);
		qw.document.getElementById("b1").value=loesung;
		qw.document.getElementById("b2").style.color="gainsboro";
		qwstat=1;
		return;
	}
	if (qw.document.getElementById("b1").value==loesung) {
		resetPosition();
		showSolution();
		qw.document.getElementById("b1").value=schliessen;
		return;
	}
	if (qw.document.getElementById("b1").value==schliessen) {
		resetPosition();
		terminateQuestion();
	}
}

function b2_onClick() {
	if (qw.document.getElementById("b2").style.color=="black") {
		qw.document.getElementById("b2").style.color="gainsboro";
		resetPosition();
		gcRefresh(qlqh_gc);
		setMessage(qlqh);
		qwstat=1;
	}
}

function rt() {
	var twab,nwab,fl,sl,bt;
	var nEvent,nSite,nDate,nRound,nWhite,nBlack,nResult,nWhiteElo,nBlackElo,nECO,nAnnotator;
	var tEvent,tSite,tDate,tRound,tWhite,tBlack,tResult,tWhiteElo,tBlackElo,tECO,tAnnotator;
	var tEventSite,nEventSite;
	nEvent=d[d.length-1][0];
	nSite=d[d.length-1][1];
	nDate=d[d.length-1][2];
	nRound=d[d.length-1][3];
	nWhite=d[d.length-1][4];
	nBlack=d[d.length-1][5];
	nResult=d[d.length-1][6];
	nWhiteElo=d[d.length-1][7];
	nBlackElo=d[d.length-1][8];
	nECO=d[d.length-1][9];
	nAnnotator=d[d.length-1][10];
	if (nEvent!="?") {
		nEvent=" "+nEvent;
	} else {
		nEvent="";
	}
	if (nSite!="?") {
		nSite=" "+nSite;
	} else {
		nSite="";
	}
	if (nEvent!="") {
		nEventSite=nEvent;
	} else {
		nEventSite=nSite;
	}
	tEventSite=nEventSite;
	nyear=nDate.replace(/\..*$/,"");
	if (nyear=="????") nyear=""; 
	nmonth=nDate.replace(/^...../,"");
	nmonth=nmonth.replace(/...$/,"");
	if (nmonth=="??") nmonth="";
	nday=nDate.replace(/^......../,"");
	if (nday=="??") nday="";
	nDate=nday;
	if (nday!="") nDate=nDate+".";
	nDate=nDate+nmonth;
	if (nmonth!="") nDate=nDate+".";
	nDate=nDate+nyear;
	if (nDate!="") nDate=" "+nDate;
	tDate=nyear;
	if (tDate!="") tDate=" "+tDate;
	if(nRound=="?") {
		tRound="";
		nRound="";
	} else {
		tRound=" ("+nRound+")";
		nRound=" ("+nRound+")";
	}		
	if (nWhite=="?") {
		tWhite="";
		nWhite="";
	} else {
		tWhite=nWhite
		nWhite="<b>"+nWhite+"</b>";
	}
	if (nBlack=="?") {
		tBlack="";
		nBlack="";
	} else {
		tBlack=nBlack;
		nBlack="<b>"+nBlack+"</b>";
	}
	if (nResult=="*") {
		res="";
		nResult="";
		tResult="";
	} else {
		res=nResult;
		tResult=", "+nResult;
		nResult="&nbsp;&nbsp;<b>"+nResult+"</b>";
	}
	if (nWhiteElo!="") {
		tWhiteElo=" "+nWhiteElo;
		nWhiteElo=" "+nWhiteElo;
	} else {
		tWhiteElo="";
	}
	if (nBlackElo!="") {
		tBlackElo=" "+nBlackElo;
		nBlackElo=" "+nBlackElo;
	} else {
		tBlackElo="";
	}
	if (nWhite!=""&& nBlack!=""){
		twab=" - ";
		nwab="<b> - </b>";
	} else {
		twab="";
		nwab="";
	}
	if (nECO!="") {
		tECO="&nbsp;&nbsp;"+nECO;
		nECO="<b>"+nECO+"</b> ";
	} else {
		tECO="";
	}
	if (nAnnotator!="") {
		tAnnotator="&nbsp;&nbsp;["+nAnnotator+"]";
		nAnnotator=" <i>["+nAnnotator+"]</i>";
	} else {
		tAnnotator="";
	}
	fl=nWhite+nWhiteElo+nwab+nBlack+nBlackElo+nResult;
	sl=nECO+nEventSite+nRound+nDate;
	if (fl!=""&&(sl+nAnnotator)!="") {
		bt="<br>"
	} else {
		bt="";
	}
	if (fl+bt+sl+nAnnotator!="") {
		nh="<div align=\"center\" style=\"color:black\">"+"<span style=\"white-space:nowrap\">"+fl+bt+sl+"</span>"+nAnnotator+"</div><hr>";
	} else {
		nh="";
	}
	dummy=tWhite+tWhiteElo+twab+tBlack+tBlackElo;
	if (dummy!=""&&(tEventSite!=""||tECO!=""||tRound!="")) {
		dummy=dummy+", ";
	}
	dummy=dummy+tEventSite+tRound+tDate+tECO+tResult+tAnnotator;
	setTitle="<title>"+dummy+"</title>";
}

rt();

function re(r) {
	if (notLang == "en") {
		r=r.replace(/§1/g,"K");
		r=r.replace(/§2/g,"Q");
		r=r.replace(/§3/g,"R");
		r=r.replace(/§4/g,"B");
		r=r.replace(/§5/g,"N");
	}
	if (notLang == "de") {
		r=r.replace(/§1/g,"K");
		r=r.replace(/§2/g,"D");
		r=r.replace(/§3/g,"T");
		r=r.replace(/§4/g,"L");
		r=r.replace(/§5/g,"S");
	}
	r=r.replace(/\$132/g,"&lt;=&gt;");
	r=r.replace(/\$138/g,"(+)");
	r=r.replace(/\$140/g,"/\\");
	r=r.replace(/\$141/g,"\\/");
	r=r.replace(/\$142/g,"&gt;=");
	r=r.replace(/\$143/g,"=&lt;");
	r=r.replace(/\$144/g,"=");
	r=r.replace(/\$145/g,"RR");
	r=r.replace(/\$146/g,"N");
	r=r.replace(/\$11/g,"=");
	r=r.replace(/\$13/g,"~~");
	r=r.replace(/\$14/g,"+/=");
	r=r.replace(/\$15/g,"=/+");
	r=r.replace(/\$16/g,"+/-");
	r=r.replace(/\$17/g,"-/+");
	r=r.replace(/\$18/g,"+-");
	r=r.replace(/\$19/g,"-+");
	r=r.replace(/\$22/g,"(.)");
	r=r.replace(/\$32/g,"@");
	r=r.replace(/\$36/g,"|^");
	r=r.replace(/\$40/g,"-&gt;");
	r=r.replace(/\$44/g,"=/~");
	r=r.replace(/\$1/g,"!");
	r=r.replace(/\$2/g,"?");
	r=r.replace(/\$3/g,"!!");
	r=r.replace(/\$4/g,"??");
	r=r.replace(/\$5/g,"!?");
	r=r.replace(/\$6/g,"?!");
	r=r.replace(/\$8/g,"[]");
	return r;
}

function vwStatus() {
	if (!window.vw || popupblocker) {
			return 0;
		}
	if (vw.closed) {
			return 1;
		}
	if (!vwdisplay) {
			return 2;
		}
	return 3;
}

function stringToGif(x) {
	switch (x) {
		case "(": return path2 + "sq.gif";
		case ")": return path2 + "wk.gif";
		case "*": return path2 + "wq.gif";
		case "+": return path2 + "wr.gif";
		case ",": return path2 + "wb.gif";
		case "-": return path2 + "wn.gif";
		case ".": return path2 + "wp.gif";
		case "/": return path2 + "bk.gif";
		case "0": return path2 + "bq.gif";
		case "1": return path2 + "br.gif";
		case "2": return path2 + "bb.gif";
		case "3": return path2 + "bn.gif";
		case "4": return path2 + "bp.gif";
	}
}

function hexToInt(x) {
	switch(x) {
		case "0": return 0;
		case "1": return 1;
		case "2": return 2;
		case "3": return 3;
		case "4": return 4;
		case "5": return 5;
		case "6": return 6;
		case "7": return 7;
		case "8": return 8;
		case "9": return 9;
		case "a": return 10;
		case "b": return 11;
		case "c": return 12;
		case "d": return 13;
		case "e": return 14;
		case "f": return 15;
	}
}

function intToHex(x) {
	switch(x) {	
		case 0: return "0";
		case 1: return "1";
		case 2: return "2";
		case 3: return "3";
		case 4: return "4";
		case 5: return "5";
		case 6: return "6";
		case 7: return "7";
		case 8: return "8";
		case 9: return "9";
		case 10: return "a";
		case 11: return "b";
		case 12: return "c";
		case 13: return "d";
		case 14: return "e";
		case 15: return "f";
	}
}

function diaRefresh(x,y,z) {
	var dummy,meta;
	var xi=0;
	var yi=0;
	var xd=0;
	var yd=0;
	var xc="";
	var yc="";
	for (var i=0;i<=63;i++) {
		if (xd > 0){
			xd--;
			xc="(";
		} else {
			if(x.charCodeAt(xi) > 59) {
				xd=x.charCodeAt(xi)-60;
				xc="(";
				xi++;
			} else {
				xc=x.charAt(xi);
				xi++;
			}
		}
		if (yd > 0) {
			yd--;
			yc="(";
		} else {
			if(y.charCodeAt(yi) > 59) {
				yd=y.charCodeAt(yi)-60;
				yc="(";
				yi++;
			}
			else {
				yc=y.charAt(yi);
				yi++;
			}
		}
		if(yc!=xc) {
			w ? si=i : si=63-i;
			frame1.document.images[si].src=stringToGif(yc);
		}
	}
	dummy=d[z][8];
	if (dummy==0){
		dummy=1;
	}
	dummy+=9;
	if (d[z].length>dummy) {
		meta = d[z][dummy];
	} else {
		meta = "";
	}
	gcRefresh(meta);	
	frame2.focus();
}

function gcRefresh(meta) {
	var dummy,d1,d2,d3,d4,d5,hico,drawx,drawy,draw;
	var regMeta,regHighlight,highlightArray,regArrows,arrowsArray;
	if (oldGraphicComments){
		for (var i=0;i<=63;i++) {
			if (oldColoredFields[i]==1) {
				if((farbe(Math.floor(i/8),i%8))=="b"){
					frame1.document.getElementsByTagName("td")[i+10+2*Math.floor(i/8)+1].style.background=bf;
					dummy=frame1.document.images[i].src;
					dummy=dummy.replace(/_\.gif/,".gif");
					frame1.document.images[i].src=dummy;
				}
				if((farbe(Math.floor(i/8),i%8))=="w"){
					frame1.document.getElementsByTagName("td")[i+10+2*Math.floor(i/8)+1].style.background=wf;
				}
			}
			oldColoredFields[i]=0;
		}
		for (var i=64;i<=oldNumberOfArrows+63;i++) {
			frame1.document.images[i].style.visibility="hidden";
		}
	}
	oldGraphicComments=false;
	if (meta!="") {
		meta+=" ";
		regMeta=/\w\w[rgy][\w\w]?/;
		if(regMeta.test(meta)) {
			oldGraphicComments=true;
			regHighlight=/\w\w[rgy]\s/;
			if(regHighlight.test(meta)){
				highlightArray = meta.match(/\w\w[rgy]\s/gi);
				for (var i=0;i<highlightArray.length;i++){
					dummy = /(\w)(\w)([rgy])/;
					dummy.exec(highlightArray[i]);
					d1=hexToInt(RegExp.$1);
					d2=hexToInt(RegExp.$2);
					d3=RegExp.$3;
					if (w==false) {
						d1 = 7-d1;
						d2 = 7-d2;
					}
					if (d3=="g"){hico="lime"};
					if (d3=="y"){hico="yellow"};
					if (d3=="r"){hico="red"};
					drawx=d1;
					drawy=7-d2;
					draw=8*drawy+drawx;
					oldColoredFields[draw]=1;
					frame1.document.getElementsByTagName("td")[draw+10+2*Math.floor(draw/8)+1].style.background=hico;
					if (farbe(d1,d2)=="w") {
						dummy=frame1.document.images[draw].src;
						frame1.document.images[draw].src=dummy.replace(/\.gif/,"_.gif");
					}
				}
			}
			regArrows = /\w\w[rgy]\w\w/;
			if(regArrows.test(meta)) {
				arrowsArray = meta.match(/\w\w[rgy]\w\w/gi);
				oldNumberOfArrows = arrowsArray.length;
				for (var i=0;i<arrowsArray.length;i++){
					dummy = /(\w)(\w)([rgy])(\w)(\w)/;
					dummy.exec(arrowsArray[i]);
					d1=hexToInt(RegExp.$1);
					d2=hexToInt(RegExp.$2);
					d3=RegExp.$3;
					d4=hexToInt(RegExp.$4);
					d5=hexToInt(RegExp.$5);
					if (w==false) {
						d1 = 7-d1;
						d2 = 7-d2;
						d4 = 14-d4;
						d5 = 14-d5;
					}
					d3 = d3+intToHex(d4)+intToHex(d5);
					drawx = d1;
						if ((d4-7)<0){
							drawx = drawx+(d4-7);
						}
					drawx = drawx*fieldSize+3;
					drawy = 7-d2;
						if ((d5-7)>0) {
							drawy=drawy-(d5-7);
						}
					drawy = drawy*fieldSize+3;
					frame1.document.images[64+i].width=fieldSize*(1+Math.abs(7-d4));
					frame1.document.images[64+i].height=fieldSize*(1+Math.abs(7-d5));
					frame1.document.images[64+i].src=path3+d3+".gif";
					frame1.document.images[64+i].style.position="absolute";
					frame1.document.images[64+i].style.top=drawy+borderSize+ibw;	
					frame1.document.images[64+i].style.left=drawx+borderSize+ibw;
					frame1.document.images[64+i].style.visibility="visible";
				}
			}
		}
	}
}

function flipBoard(event) {
	var x,y,dummy0,dummy1,dummy2;
	x = isIE4 ? frame1.event.clientX : event.pageX;
	y = isIE4 ? frame1.event.clientY : event.pageY;
	if((x>10&&x<10+borderSize+3&&y>10&&y<10+8*fieldSize+2*borderSize+6+2*ibw)||(x>10+8*fieldSize+borderSize+3+2*ibw&&x<10+8*fieldSize+2*borderSize+6+2*ibw&&y>10&&y<10+8*fieldSize+2*borderSize+6+2*ibw)||(y>10&&y<10+borderSize+3&&x>10&&x<10+8*fieldSize+2*borderSize+6+2*ibw)||(y>10+8*fieldSize+borderSize+3+2*ibw&&y<10+8*fieldSize+2*borderSize+6+2*ibw&&x>10&&x<10+8*fieldSize+2*borderSize+6+2*ibw)) {
		w=(!w);
		diaRefresh("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",d[dneu][3],dneu);
		dummy1="ABCDEFGH";
		dummy2="12345678";
		for (var i=0;i<=99;i++) {
			dummy0=frame1.document.getElementsByTagName("td")[i].innerHTML;
			if (dummy0=="") continue;
			for (var j=0;j<=7;j++) {
				if (dummy0==dummy1.charAt(j)){
					frame1.document.getElementsByTagName("td")[i].innerHTML=dummy1.charAt(7-j);
					break;
				}
				if (dummy0==dummy2.charAt(j)){
					frame1.document.getElementsByTagName("td")[i].innerHTML=dummy2.charAt(7-j);
					break;
				}
			}
		}
	}
}

function kd(x) {
	var dummy0,dummy1,dummy2;
	if (!ok) {
		return false;
	}
	if (qwstat>0) {
		qw.focus();
		return false;
	}
	switch (x) {
		case 39:
			nnc(4);
			break;
		case 32:
			nnc(4);
			break;
		case 13:
			nnc(4);
			break;
		case 37:
			nnc(2);
			break;
		case 40:
			if (vwStatus()!=3){
				nnc(1);
			}
			else {
				if(vw.mark<vw.markmax) {
					vw.mark++;
					vw.document.anchors[vw.mark].style.color=hc;
					vw.document.anchors[vw.mark].style.background=hb;
					vw.document.anchors[vw.mark-1].style.color="";
					vw.document.anchors[vw.mark-1].style.background=dbg;
				}
			}
			break;
		case 38:
			if (vwStatus()!=3){
				nnc(0);
			}
			else {
				if(vw.mark) {
					vw.mark--;
					vw.document.anchors[vw.mark].style.color=hc;
					vw.document.anchors[vw.mark].style.background=hb;
					vw.document.anchors[vw.mark+1].style.color="";
					vw.document.anchors[vw.mark+1].style.background=dbg;
				}
			}
			break;
		case 9:
			break;
		default:
			return true;
	}
	return false;
}

function nc(x) {
	if (!ok) {
		return false;
	}
	if (qwstat>0) {
		qw.focus();
		return false;
	}
	x=parseInt(x);
	if (x>=1) {
		if (vwStatus() >1) {
			if (!isNav6) {
				vw.document.all.dih.style.display="none";
			}
			if (isNav6) {
				setTimeout("vw.document.body.style.display='none'",navDelay);
			}
			vwdisplay=false;
			vw.pid=pid;
		}
		dalt=dneu;
		dneu=x;
		if (dalt!=dneu) {
			frame2.document.anchors[dalt].style.background=dbg;
			frame2.document.anchors[dalt].style.color="";
			frame2.document.anchors[dneu].style.background=hb;
			frame2.document.anchors[dneu].style.color=hc;
			diaRefresh(d[dalt][3],d[dneu][3],dneu);
		}
		ok=true;
	}
}

function nnc(x) {
	var dummy,nx,vwn,bivwn,sivwn;
	if (qwstat>0) {
		qw.focus();
		return false;
	}
	if(x==1 && qiv[0]>0 && d[dneu][4]==0) {
		nc(d[fQ()][7]);
		return false;
	}
	if (!ok) {
		return false;
	}
	ok = false;
	if (vwStatus()>1){
		if (!isNav6) {
			vw.document.all.dih.style.display="none";
		}
		if (isNav6) {
			setTimeout("vw.document.body.style.display='none'",navDelay);
		}
		if (vw.pid!=pid) {
			vwdisplay=false;
			vw.pid=pid;
		}
	} else {
		vwdisplay=false;
	}
	if (vwStatus()==3 && x==4 && vw.mark!=vw.markmax) {
		ok = true;
		nnc(parseInt(vw.document.anchors[vw.mark].name.slice(1)));
	} else if ((d[dneu][8]<2) || (x!=4) || (vwdisplay==true)) {
		vwdisplay=false;
		if (!isQuestion(d[dneu][x+5])){
			dalt=dneu;
			dneu=d[dalt][x+5];
			if (dalt!=dneu) {
				frame2.document.anchors[dalt].style.background=dbg;
				frame2.document.anchors[dalt].style.color="";
				frame2.document.anchors[dneu].style.background=hb;
				frame2.document.anchors[dneu].style.color=hc;
				setTimeout("frame2.document.anchors[dneu].scrollIntoView(false)",(isNav6)*navDelay);
				diaRefresh(d[dalt][3],d[dneu][3],dneu);
			}
			ok=true;
		} else {
			ok=true;
			initQuestion(d[dneu][x+5]);
		}
	} else {
		if (isQuestion(d[dneu][x+5])) {
			ok=true;
			initQuestion(d[dneu][x+5]);
			return;
		}
		ih="";
		vwdisplay=true;
		if (vwStatus() < 2)	{
			popupblocker=false;
			vw = window.open("","vw",vWin);
			try {
				vw.document.open();
				vw.document.write("<html><body></body></html>");
				vw.document.close();
				pdummy=vw.document.getElementsByTagName("body")[0].text;
			} catch(e) {
				popupblocker=true;
			}
			if(popupblocker) {
					vwdisplay=false;
					dalt=dneu;
					dneu=d[dalt][x+5];
					if (dalt!=dneu)	{
						frame2.document.anchors[dalt].style.background=dbg;
						frame2.document.anchors[dalt].style.color="";
						frame2.document.anchors[dneu].style.background=hb;
						frame2.document.anchors[dneu].style.color=hc;
						setTimeout("frame2.document.anchors[dneu].scrollIntoView(false)",(isNav6)*navDelay);
						diaRefresh(d[dalt][3],d[dneu][3],dneu);
					}
					ok=true;
					return;
			}
			vw.document.open();
			vw.nnc=nnc;
			vw.kd=kd;
			vw.pid=pid;
			vw.ih=ih;
			vw.document.write('<html><head><title>'+title+'</title><link rel="StyleSheet" href="'+path1+'jsc.css" type="text/css"><style type="text/css">a {color: black; background: none}</style></head><body onKey'+(!isNav6 ? "Down" : "")+(isNav6 ? "Press" : "")+'="return kd(event.keyCode)">'+(!isNav6 ? "<div id=\"dih\"></div>" : "")+'</body></html>');
			vw.document.close();
		}
		vw.nnc=nnc;
		vw.kd=kd;
		vw.pid=pid;
		vw.ih=ih;
		vw.focus();
		vw.markmax=d[dneu][8]-1;
		vw.mark=vw.markmax;
		for (var i=2;i<=d[dneu][8];i++) {
			nx=d[dneu][8+i];
			vwn=d[nx][1];
			bivwn=vwn.match(/\$*[0-9]*\.\.\./);
			while (d[nx][8]) {
				vwn=vwn+ " " + d[d[nx][9]][1].replace(/[0-9]*\.\.\./,"");
				nx=d[nx][9];
			}
			ih=ih+('<a name="v' + (3+i)+'" onClick="nnc(' + (3+i) + ')" onMouseOver="if(mark>=0){document.anchors[mark].style.color=\'\'; document.anchors[mark].style.background=\''+dbg+'\'; style.color=\''+hc+'\'; style.background=\''+hb+'\'; mark = this.name.slice(1)-5}" onMouseOut="if(mark>=0){document.anchors[mark].style.color=\'\'; document.anchors[mark].style.background=\''+dbg+'\'; document.anchors[markmax].style.color=\''+hc+'\'; document.anchors[markmax].style.background=\''+hb+'\'; mark = markmax}">' + re(vwn) + '</a><br>');
		}
		nx=d[dneu][9];
		vwn=d[nx][1];
		if(bivwn && !vwn.match(/\.\.\./)) {
			sivwn=vwn.match(/\$14[012345]/);
			if(!sivwn)sivwn="";
			bivwn=bivwn+"";
			bivwn=bivwn.replace(/\$14[012345]/g,"");
			vwn=vwn.replace(/\$14[012345]/g,"");			
			vwn=sivwn+bivwn+vwn;
		}
		while (d[nx][8]){
			vwn=vwn+ " " + d[d[nx][9]][1].replace(/[0-9]*\.\.\./,"");
			nx=d[nx][9];
		}
		ih='<nobr>' + ih + '<a name="v4" style="color:'+hc+';background:'+hb+'" onClick="nnc(4)" onMouseOver="if(mark>=0){document.anchors[mark].style.color=\'\'; document.anchors[mark].style.background=\''+dbg+'\'; style.color=\''+hc+'\'; style.background=\''+hb+'\'; mark = markmax}" onMouseOut="if(mark>=0){document.anchors[mark].style.color=\'\'; document.anchors[mark].style.background=\''+dbg+'\'; document.anchors[markmax].style.color=\''+hc+'\'; document.anchors[markmax].style.background=\''+hb+'\'; mark = markmax}">' + re(vwn) + '</a></nobr>';

		if (!isNav6) {
			vw.document.all.dih.innerHTML=ih;
			vw.document.all.dih.style.display="";
		}
		if (isNav6)	{
			setTimeout("vw.document.body.innerHTML=ih",navDelay);
			setTimeout("vw.document.body.style.display=''",navDelay);
		}
		ok=true;
	}
}

function farbe(x,y)
{
	if (Math.ceil(x/2+y/2) > (x/2+y/2)){
		return "b";
	} else {
		return "w";
	}
}

function kauf (xo,xi) {
	if(xo==1) {
		if(d[xi-1][4]==0) {
			return '<br><span class="v"><span class="o1">[</span>';
		}
		else {
			return '';
		}
	}
	else {
		return '<span class="o'+xo+'">(</span>';
	}
}

function kzu (xo,xi) {
	var dummy="";
	for (var i=0; i<qiv[xo];i++) {
		dummy=dummy+"</span>";
	}
	qiv[xo]=0;
	if(xo==1) {
		if(d[xi+1][4]==0||xi+1==d.length-1) {
			return dummy+'<span class="o1">]</span></span><br>';
		} else {
			return dummy+'<span class="o1">;</span><br>';
		}
	}
	else {
		return dummy+'<span class="o'+xo+'">)</span>';
	}
}

function ib(x,y) {
	if(x>0 && x<7 && y>0 && y<7) return '';
	if (x==0) {
		if (y==0) {
			return ' style="border-left-color:'+ibc+'; border-left-style:solid; border-left-width:'+ibw+'; border-top-color:'+ibc+'; border-top-style:solid; border-top-width:'+ibw+'px"';
		}
		if (y==7) {
			return ' style="border-left-color:'+ibc+'; border-left-style:solid; border-left-width:'+ibw+'; border-bottom-color:'+ibc+'; border-bottom-style:solid; border-bottom-width:'+ibw+'px"';
		}
		if (y>0 && y<7) {
			return ' style="border-left-color:'+ibc+'; border-left-style:solid; border-left-width:'+ibw+'px"';
		}
	}
	if (x==7) {
		if (y==0) {
			return ' style="border-right-color:'+ibc+'; border-right-style:solid; border-right-width:'+ibw+'; border-top-color:'+ibc+'; border-top-style:solid; border-top-width:'+ibw+'px"';
		}
		if (y==7) {
			return ' style="border-right-color:'+ibc+'; border-right-style:solid; border-right-width:'+ibw+'; border-bottom-color:'+ibc+'; border-bottom-style:solid; border-bottom-width:'+ibw+'px"';
		}
		if (y>0 && y<7) {
			return ' style="border-right-color:'+ibc+'; border-right-style:solid; border-right-width:'+ibw+'px"';
		}
	}
	if (y==0) {
		return ' style="border-top-color:'+ibc+'; border-top-style:solid; border-top-width:'+ibw+'px"';
	}
	if (y==7) {
		return ' style="border-bottom-color:'+ibc+'; border-bottom-style:solid; border-bottom-width:'+ibw+'px"';
	}
}

function initFrame1() {
	var dummy,x,y,kx;
	if (set=="koenig_schwarz"||set=="koenig_bunt"||set=="fred_fertig") {
		sbc(c_ff);
		if (screen.width <=800) {
			path2="../pieces/"+set+"/40/";
		} else {
			path2="../pieces/"+set+"/50/";
		}
	} else {
		if (set=="") {
			set=c_default;		
		}
		sbc(eval("c_"+set));	
	}
	frame1.document.open();
	frame1.nnc=nnc;
	frame1.kd=kd;
	dummy=8*fieldSize+6+2*borderSize+2*ibw;
	frame1.document.write('<html><head><meta name="author" content="mue.wer@t-online.de"><link rel="StyleSheet" href="'+path1+'jsc.css" type="text/css"></head>');
	frame1.document.write('<body onKey'+(!isNav6 ? "Down" : "")+(isNav6 ? "Press" : "")+'="return kd(event.keyCode)"><div style="position: absolute; left: 10px; top: 10px"><table style="border-style: outset; border-width: 3px; color: '+bc+'; font-size: xx-small; background: '+bb+'" cellspacing="0" cellpadding="0" width="'+dummy+'"><tr>');
	if (w) {
		kx=" ABCDEFGH ";
	} else {
		kx=" HGFEDCBA ";
	}
	for(var i=0;i<=9;i++) {
		frame1.document.write('<td width="'+fieldSize+'" height="'+borderSize+'" align="center">');
		frame1.document.write(kx.charAt(i));
	}
	x=0;
	y=0;
	for (var i=0;i<=63;i++) {
		if (x==8) {
			frame1.document.write('<td width="'+borderSize+'" height="'+fieldSize+'" align="center">');
			if(w) {
				frame1.document.write(9-Math.floor(i/8));
			} else {
				frame1.document.write(Math.floor(i/8));
			}
			x=0;
			y++;
		}
		if (x==0) {
			frame1.document.write('<tr><td width="'+borderSize+'" height="'+fieldSize+'" align="center">');
			if(w) {
				frame1.document.write(8-Math.floor(i/8));
			}else {
				frame1.document.write(1+Math.floor(i/8));
			}
		}
		if (farbe(x,y)=="w") {
			dummy=wf;
		} else {
			dummy=bf;
		}
		frame1.document.write('<td style="background: '+dummy+'"><img onmousedown="return false" src="'+path2+'sq.gif" width="'+fieldSize+'" height="'+fieldSize+'"'+ib(x,y)+'>');
		x++;
	}
	frame1.document.write('<td width="'+borderSize+'" height="'+fieldSize+'" align="center">');
	if(w) {
		frame1.document.write(9-Math.floor(64/8));
	} else {
		frame1.document.write(Math.floor(64/8));
	}
	frame1.document.write('<tr>');
	for(var i=0;i<=9;i++) {
		frame1.document.write('<td width="'+fieldSize+'" height="'+borderSize+'" align="center">');
		frame1.document.write(kx.charAt(i));
	}
	frame1.document.write('</table><p><center><form><input type="button" style="width:'+fieldSize*1.2+'px; height:'+fieldSize*0.6+'px" value="I&lt;" onClick="nnc(0)"'+(isIE4 ? " onDblClick=\"nnc(0)\"" : "")+'><input type="button" style="width:'+fieldSize*1.2+'px; height:'+fieldSize*0.6+'px" value="&lt;" onClick="nnc(2)"'+(isIE4 ? " onDblClick=\"nnc(2)\"" : "")+'><input type="button" style="width:'+fieldSize*1.2+'px; height:'+fieldSize*0.6+'px" value="&gt;" onClick="nnc(4)"'+(isIE4 ? " onDblClick=\"nnc(4)\"" : "")+'><input type="button" style="width:'+fieldSize*1.2+'px; height:'+fieldSize*0.6+'px" value="&gt;I" onClick="nnc(1)"'+(isIE4 ? " onDblClick=\"nnc(1)\"" : "")+'"></form></center>');
	for(var i=0;i<=63;i++){
		frame1.document.write('<img onmousedown="return false" src="" style="position: absolute; left: 0px; top: 0px; visibility:hidden">');
	}
	frame1.document.write('</div></body></html>');
	frame1.document.close();
}

function initFrame2() {
	var dummy,k1,k2,kanz;
	frame2.document.open();
	frame2.nc=nc;
	frame2.kd=kd;
	frame2.nnc=nnc;
	frame2.document.write('<html><head><meta name="author" content="mue.wer@t-online.de"><link rel="StyleSheet" href="'+path1+'jsc.css" type="text/css"></head><body onKey'+(!isNav6 ? "Down" : "")+(isNav6 ? "Press" : "")+'="return kd(event.keyCode)">');
	for (var i=0 ;i<(d.length-1);i++ ) {
		if (isQuestion(i)) {
			if(!qiv[d[i][4]]){
				qiv[d[i][4]]=0;
			}
			qiv[d[i][4]]++;
			frame2.document.write('<span id="s'+i+'" style="font-weight:bold; color:black">*** </span>');
			frame2.document.write('<span id="v'+i+'" style="display:none">');
		}
		k1='';
		if((i>0)&&(d[i][7]!=i-1)&&(d[i][4]>=d[i-1][4])) {
			k1=kauf(d[i][4],i);
		}
		k2='';
		dummy =d[i+1][4];
		if (i+1==d.length-1){
			dummy=0;
		}
		if(d[i][8]==0 && d[i][4]!=0) {
			kanz=d[i][4]-dummy;
			if(kanz==0){
				kanz=1;
			}
			for (var j=0; j<kanz ; j++) {
				k2=k2+kzu(d[i][4]-j,i);
			}
		}
		frame2.document.write (k1+(re(d[i][0])=="" ? '' : '<span class="c">'+re(d[i][0])+' </span>')+'<a name="'+i+'" class="o'+d[i][4]+'" onClick="nc(this.name)">'+re(d[i][1])+'</a>'+(re(d[i][2])=="" ? '' : '<span class="c"> '+re(d[i][2])+'</span>')+k2+' ');
		if (i==0) frame2.document.write(nh);
	}
	if(d[d.length-2][4]==0 && d.length > 2) {
		frame2.document.write('<br>');
	}
	frame2.document.write('<span class="o0">'+re(res)+'</span>');
	for (var i=0; i<qiv[0];i++) {
		frame2.document.write('</span>');
	}
	frame2.document.write('</body></html>');
	frame2.document.close();
}

function initFrames() {
	initFrame1();
	qwstat=0;
	initFrame2();
	setTimeout("diaRefresh('{',d[0][3],0)",(isNav6)*1000);
	ok=true;
	draginit();
}
