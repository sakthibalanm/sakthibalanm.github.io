//20050319
try {dummy=path2OutputDir} catch (e) {path2OutputDir=".."};
var columns=columnNames.length;
var rows=tableData.length/columns;
var mark=-1;
var columnSortModus = new Array();
var sortStatus=new Array(0,1);
var sortArray=new Array();
var sortIndex=new Array();

function sm(x,y) {
	if(mark>-1) {
		rsm(mark);
	}
	mark=x;
	document.getElementById(x).style.background="highlight";
	document.getElementById(x).style.color="highlighttext";
	if(y) {
		document.getElementById(x).scrollIntoView(false);
	}
}

function rsm(x) {
	document.getElementById(x).style.background="ivory";
	document.getElementById(x).style.color="black";
}

function wo() {
	window.open(path2OutputDir+"/"+hrefDir+"/"+hrefBase+"_"+hrefNumber[sortIndex[mark]]+".html", hrefBase+"_"+hrefNumber[sortIndex[mark]], "scrollbars=yes, resizable=yes");
}

function kd(x) {
	switch (x) {
		case 13:
			if(mark>-1) {
				wo();
			}
			break;
		case 36:
			sm(0,true);
			break;
		case 35:
			sm(rows-1,true);
			break;
		case 40:
			if(mark<rows-1){
				sm(mark+1,true);
			}
			break;
		case 38:
			if(mark>0){
				sm(mark-1,true);
			}
			break;
		default:
			return true;
	}
	return false;
}

function getImage(x) {
	if(sortStatus[0]!=x) {
		return path2OutputDir+"/jscss/n.gif";
	} else {
		if(sortStatus[1]==1) return path2OutputDir+"/jscss/d.gif";
		if(sortStatus[1]==-1) return path2OutputDir+"/jscss/u.gif";
	}
}

function fSort(a,b) {
	a_ = a.replace(/%\d*$/,"");
	b_ = b.replace(/%\d*$/,"");
	if (columnSortModus[sortStatus[0]-1] == 0) {
		if (a_ > b_) return 1;
		if (a_ < b_) return -1;
		return 0;
	} else {
		return a_-b_;
	}
}

function setSortIndex(x) {
	if (sortStatus[0]==x) {
		sortStatus[1]=-sortStatus[1];
		sortIndex.reverse();
		setIhTab();
		return;
	}
	sortStatus[0]=x;
	sortStatus[1]=1;
	if (sortStatus[0]==0) {
		for (i=0;i<rows;++i) {
			sortIndex[i]=i;
		}
		setIhTab();
		return;
	}
	for(i=0;i<rows;++i) {
		sortArray[i] = tableData[i * columns + x-1]+"%"+i;
	}
	sortArray.sort(fSort);
	for (i=0;i<rows;++i) {
		sortIndex[i]=sortArray[i].match(/\d*$/);
	}
	setIhTab();
}

function setIhTab() {
	ih="<table width=\"100%\" class=\"ttable\" cellpadding=\"0px\" cellspacing=\"0px\"><tr>"
	ih+="<th class=\"tth\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" onclick=\"setSortIndex(0);\"><tr><th class=\"ithl\">Nr.</th><th class=\"ithr\"><img src=\""+getImage(0)+"\" width=\"7\" height=\"4\" border=\"0\" alt=\"\"></th></tr></table></th>";
	for(i=1;i<=columns;++i) {
		ih+="<th class=\"tth\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" onclick=\"setSortIndex("+i+");\"><tr><th class=\"ithl\">"+columnNames[i-1]+"</th><th class=\"ithr\"><img src=\""+getImage(i)+"\" width=\"7\" height=\"4\" border=\"0\" alt=\"\"></th></tr></table></th>";
	}
	ih+="</tr>";
	for(i=0;i<rows;++i) {
		ih+="<tr class=\"ttr\" id=\""+i+"\" onmouseover=\"sm("+i+",false)\" onmouseout=\"rsm("+i+")\" onclick=\"sm("+i+",false);wo();\">"
		ih+="<td class=\"ttd\">"+(parseInt(sortIndex[i])+1)+"</td>";
		for (j=1;j<=columns;++j) {
			ih+="<td class=\"ttd\">"+tableData[sortIndex[i]*columns+j-1]+"</td>";
		}
		ih+="</tr>";
	}
	ih+="</table>";
	document.getElementById("tab").innerHTML=ih;
}

function initTable() {
	for(j=0;j<columns;++j) {
		columnSortModus[j]=1;
		for(i=0;i<rows;++i) {
			if(isNaN(tableData[i*columns+j])) {
				columnSortModus[j]=0;
				break;
			}
		}
	}	
	for (i=0;i<rows;++i) {
		sortIndex[i]=i;
	}
	setIhTab();
}
