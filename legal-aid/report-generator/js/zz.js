var data = {
	lawyerName: '________________________________________________',
	arrandDate: '__ __ / __ __ / __ __ __ __',
	arrandNum: '_____ – ________________',
	detaineeName: '______________________________________________________________',
	detaineeDate: '__ __ / __ __ / __ __ __ __',
	numTrips: {v: '____', k: function() {
		if (data.terminatePart.v1 || data.terminatePart.v2) {
			return (1);
		}
		return (parseInt(this.v) || 0);
	}},
	terminatePart: {v1: false, v2: false, v3: false, k: function() {
		if (this.v1 || this.v2 || this.v3) {
			return (0.5);
		}
		return (1);
	}},
	specCategory: {v1: false, v2: false, v3: false, v4: false, k: function() {
		if (data.terminatePart.v1 || data.terminatePart.v2) {
			return (1);
		}
		var i = 0;
		if (this.v1) {i++;}
		if (this.v2) {i++;}
		if (this.v3) {i++;}
		if (this.v4) {i++;}
		if (i == 0) {
			return (1);
		}
		if (i == 1) {
			return (1.2);
		}
			return (1.3);
	}},
	numActs: {v1: 0, v2: false, k: function() {
		if (this.v1 || this.v2 || this.v3) {
			return (0.5);
		}
		return (1);
	}},

}
 function fun1(field, f1, value) {
 	// data[field][f1] = value;
 	data.terminatePart.k();

 	// console.log(field);
 	// var a = data.numTrips.k();
 	// data.numTrips.k = parseInt(data.numTrips.v) || 0;
 	// console.log(data.terminatePart.k());
 }

function button2() {
		var a = 14;
		var docDefinition = {
				content: [
						// if you don't need styles, you can use a simple string to define a paragraph
						'This is a standard paragraph, using default style',

						// using a { text: '...' } object lets you set styling properties
						{
								text: 'це код в ЮТФ-8',
								fontSize: 15,
								style: 'header'
						},
						{
								text: 'це код в ЮТФ-8',
								fontSize: a,
								style: 'header'
						},
						{
								text: 'це код знову в ЮТФ-8',
								fontSize: 15,
								alignment: 'right'
						},

						// if you set pass an array instead of a string, you'll be able
						// to style any fragment individually
						{
								text: [
										'This paragraph is defined as an array of elements to make it possible to ', {
												text: 'restyle part of it and make it bigger ',
												fontSize: 15
										},
										'than the rest.'
								]
						}
				],
				styles: {
						header: {
								fontSize: 15,
								bold: true
						},
						subheader: {
								fontSize: 15,
								bold: true
						},
						quote: {
								italics: true
						},
						small: {
								fontSize: 8
						}
				}
		};
		pdfMake.createPdf(docDefinition).open();
}





function showTripInNight(value) {
	var isshow = document.getElementById("trip-in-night");
	var istrip = document.getElementById("myonoffswitch7");
	if (value == 0) {
		isshow.style.display = 'table-row';
	}
	else {
		isshow.style.display = 'none';
		istrip.checked = false;
	}
}

function showNextField(element) {
	var next_row = element.parentElement.parentElement.nextElementSibling;
	if (element.value != '') {
		next_row.style.display = 'table-row';
	}
}

function showAppeal(element) {
	var lawerApeal = document.getElementById('lawerApeal');
	var lawerApeal1 = lawerApeal.nextElementSibling;
	var prosecutorApeal = document.getElementById('prosecutorApeal');
	var prosecutorApeal1 = prosecutorApeal.nextElementSibling;
	if (element.value == 1) {
		turnOff(['myonoffswitch9']);
		lawerApeal.style.display = 'none';
		lawerApeal1.style.display = 'none';
		prosecutorApeal.style.display = 'table-row';
		prosecutorApeal1.style.display = 'table-row';
	}
	else {
		turnOff(['myonoffswitch10']);
		lawerApeal.style.display = 'table-row';
		lawerApeal1.style.display = 'table-row';
		prosecutorApeal.style.display = 'none';
		prosecutorApeal1.style.display = 'none';
	}
}

function turnOff(IDelements) {
	for (i = 0; i < IDelements.length; i++) {
		document.getElementById(IDelements[i]).checked = false;
	}
}
function turnOn(IDelements) {
	for (i = 0; i < IDelements.length; i++) {
		document.getElementById(IDelements[i]).checked = true;
	}
}

function makeReport(argument) {
	// body...
}













function button3() {
		var part = document.getElementById('part');
		var article = document.getElementById('article');

		if (part.value == '') {
				part.value = '3';
		} else if (article.value.length < 5) {
				article.value += '3';
		}
}

function button4() {
		var part = document.getElementById('part');
		var article = document.getElementById('article');

		if (part.value == '') {
				part.value = '4';
		} else if (article.value.length < 5) {
				article.value += '4';
		}
}

function button5() {
		var part = document.getElementById('part');
		var article = document.getElementById('article');

		if (part.value == '') {
				part.value = '5';
		} else if (article.value.length < 5) {
				article.value += '5';
		}
}

function button6() {
		var part = document.getElementById('part');
		var article = document.getElementById('article');

		if (part.value == '') {
				alert('частини 6 не існує в жодній статті ККУ');
		} else if (article.value.length < 5) {
				article.value += '6';
		}
}

function button7() {
		var part = document.getElementById('part');
		var article = document.getElementById('article');

		if (part.value == '') {
				alert('частини 7 не існує в жодній статті ККУ');
		} else if (article.value.length < 5) {
				article.value += '7';
		}
}

function button8() {
		var part = document.getElementById('part');
		var article = document.getElementById('article');

		if (part.value == '') {
				alert('частини 8 не існує в жодній статті ККУ');
		} else if (article.value.length < 5) {
				article.value += '8';
		}
}

function button9() {
		var part = document.getElementById('part');
		var article = document.getElementById('article');

		if (part.value == '') {
				alert('частини 9 не існує в жодній статті ККУ');
		} else if (article.value.length < 5) {
				article.value += '9';
		}
}

function button0() {
		var part = document.getElementById('part');
		var article = document.getElementById('article');

		if (part.value == '') {
				alert('частини 0 не існує в жодній статті ККУ');
		} else if (article.value != '' && article.value.length < 5) {
				article.value += '0';
		}
}

function buttonX() {
		var part = document.getElementById('part');
		var article = document.getElementById('article');

		if (part.value == '' || article.value == '') {
				alert('примітка до статті ККУ');
		} else if (article.value.indexOf('-') == -1 && article.value.length > 2 && article.value.length < 4) {
				article.value += '-';
		}
}

function buttonDel() {
		var part = document.getElementById('part');
		var article = document.getElementById('article');

		article.value = '';
		part.value = '';
}


function buttonC() {
		buttonDel();
		var area = document.getElementById('area');
		var count1 = document.getElementById('count-1');
		var count2 = document.getElementById('count-2');
		var count3 = document.getElementById('count-3');
		var count4 = document.getElementById('count-4');
		var count5 = document.getElementById('count-5');

		count1.innerHTML = '0';
		count2.innerHTML = '0';
		count3.innerHTML = '0';
		count4.innerHTML = '0';
		count5.innerHTML = '0';
		area.innerHTML = '';
}
