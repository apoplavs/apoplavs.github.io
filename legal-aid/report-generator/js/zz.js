var data = {
	lawyerName: '________________________________________________',
	arrandDate: '__ __ / __ __ / __ __ __ __',
	arrandNum: '_____ – ________________',
	detaineeName: '______________________________________________________________',
	detaineeDate: '__ __ / __ __ / __ __ __ __',
		//кількість виїздів адвоката
	numTrips: {v: 1, k: function() {
		if (data.terminatePart.v1 || data.terminatePart.v2) {
			return (1);
		}
		return (this.v || 0);
	}},
		//Припинення участі адвоката до завершення строку дії доручення
	terminatePart: {v1: false, v2: false, v3: false, k: function() {
		if (this.v1 || this.v2 || this.v3) {
			return (0.5);
		}
		return (1);
	}},
	//Особлива категорія особи
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

	//Сумарна кількість дій
	numActs: {v1: 1, v2: false, k: function() {
		if (data.terminatePart.v1 || data.terminatePart.v2) {
			return (1);
		}
		switch (this.v1) {
			case 0:
				return (0.25);
			case 1:
				return (1);
			case 2:
				return (2);
			case 3:
				return (2.53);
			case 4:
				return (2.93);
			case 5:
				return (3.25);
			case 6:
				return (3.42);
			case 7:
				return (3.56);
			case 8:
				return (3.69);
			case 9:
				return (3.8);
			case 10:
				return (3.9);
			case 11:
				return (3.99);
			case 12:
				return (4.07);
			case 13:
				return (4.15);
			case 14:
				return (4.22);
		}
		return (4.29);
	}},
	//кількість дій в нічний час
	actsInNight: {v1: 0, percent: 0, k: function() {
		if (data.numActs.v1 == 0 && data.numActs.v2) {
			return (1.5);
		}
		if (this.percent >= 50) {
			return (1.5);
		}
		if (this.percent >= 30) {
			return (1.4);
		}
		if (this.percent >= 20) {
			return (1.3);
		}
		if (this.percent >= 10) {
			return (1.2);
		}
		return (1);
	}},

	//обрання затриманій особі запобіжного заходу у вигляді тримання під вартою
	osk: {
		//чи подавалося слідчим/прокурором клопотання про обрання затриманій особі ЗЗ
		takePetition: true,
		//чи обрано ЗЗ у вигляді тримання під вартою
		satisfiedPetition: false,
		//чи подавав адвокат апеляційну скаргу на судове рішення
		appealLawer: false,
		//чи задовольнили апеляцію адвоката
		satisfiedAppealLawer: false,
		//чи подавала сторона обвинувачення апеляційну скаргу на судове рішення
		appealProsecutor: false,
		//чи задовольнили апеляцію сторони обвинувачення
		satisfiedAppealProsecutor: false,
		k: function() {
		if (data.terminatePart.v1 || data.terminatePart.v2 || !this.takePetition
			|| (this.takePetition && this.satisfiedPetition && !this.appealLawer)
			|| (!this.satisfiedPetition && this.appealProsecutor && this.satisfiedAppealProsecutor)) {
			return (1);
		}
		// якщо подавалось клопотання про ЗЗ, воно було задоволено і адвокат подав апеляцію
		if (this.satisfiedPetition && this.appealLawer) {
			// якщо апеляція скасувала ЗЗ (3.5) якщо ні (2)
			return (satisfiedAppealLawer ? 3.5 : 2);
		}
		/* якщо подавалось клопотання про ЗЗ, воно НЕ було задоволено (обрано більш мякий ЗЗ)
		* i сторона обвинувачення не подавала апеляцію, або вона не була задоволена
		*/
		if (!this.satisfiedPetition && (!this.appealProsecutor
			|| (this.appealProsecutor && !this.satisfiedAppealProsecutor))) {
			return (5);
		}
		return (1);
	}},
	//розмір прожиткового мінімуму
	paymentPerHour: {v1: 1762, k: function() {
		return ((this.v1 * 0.025).toFixed(3));
	}},
	//строк подання акту
	termSubmission: {v1: 1, k: function() {
		return (this.v1);
	}},
	//Побачення з особою, якій надається БВПД
	meetings: {v1: '', v2: '', v3: '', v4: '', v5: '', v6: '', v7: '', v8: '', v9: '', v10: ''},
	//Участь у процесуальних діях
	procActions: {v1: '', v2: '', v3: '', v4: '', v5: '', v6: '', v7: '', v8: '', v9: '', v10: ''}


}



function fun1(field, f1, value) {
	 data[field][f1] = value;
	// data.terminatePart.k();

	 // console.log(data[field].k());
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

function calcPercents() {
	var percent = document.getElementById('percent');
	if (data.actsInNight.v1 > data.numActs.v1) {
		document.getElementById('actsInNight').value = data.numActs.v1;
		data.actsInNight.v1 = data.numActs.v1;
	}
	if (data.numActs.v1 == 0) {
		percent.innerHTML = '0.00 %';
	}
	if (data.numActs.v1 > 0 && data.actsInNight.v1 <= data.numActs.v1) {
		data.actsInNight.percent =(data.actsInNight.v1 / data.numActs.v1) * 100;
		data.actsInNight.percent = data.actsInNight.percent.toFixed(2);
		percent.innerHTML = data.actsInNight.percent + ' %';
	}
}


// IN FEATURE
function setData(attr, field, value) {
	 data[attr][field] = value;
	// data.terminatePart.k();

	 console.log(data[field].k());
	// var a = data.numTrips.k();
	// data.numTrips.k = parseInt(data.numTrips.v) || 0;
	// console.log(data.terminatePart.k());
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
