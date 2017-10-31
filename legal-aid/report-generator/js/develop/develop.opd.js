var data = {
	commonData: {
        lawyerName: '___________________________________________________________________________________',
        arrandDate: '__ __ / __ __ / __ __ __ __',
        arrandNum: '_____ – ________________',
        detaineeName: '___________________________________________________________________________________________________________',
        detaineeDate: '__ __ / __ __ / __ __ __ __'
	},
		//кількість виїздів адвоката
	numTrips: {v1: 1, k: function() {
		if (data.terminatePart.v1 || data.terminatePart.v2) {
			return (1);
		}
		return (this.v1 || 0);
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
		k: function() {
			return (1);
		}},
	//розмір прожиткового мінімуму
	paymentPerHour: {v1: 1762, k: function() {
		return ((this.v1 * 0.025).toFixed(2));
	}},
	//строк подання акту
	termSubmission: {v1: 1, k: function() {
		return (this.v1);}, l: function () {
	    switch (this.v1) {
            case 1:
                return ('до 45 днів');
            case 0.75:
                return ('від 46 до 60 днів');
            case 0.5:
                return ('від 61 до 90 днів');
            case 0.25:
                return ('від 91 до 120 днів');
            default:
                return ('понад 120 днів');
        }
    }},
	//Побачення з особою, якій надається БВПД
	meetings: {v1: '', v2: '', v3: '', v4: ''},
	//Участь у процесуальних діях
	/* vN - назва процесуальної дії;
	* dsN (date Start)N - дата початку процесульної дії;
	* tsN (time Start)N - час початку процесульної дії;
	* deN (date End)N - дата закінчення процесульної дії;
	* teN (time Start)N - час закінчення процесульної дії;
	*/
	procActions: {v1: '', ds1: '', ts1: '', de1: '', te1: '',
        v2: '', ds2: '', ts2: '', de2: '', te2: '',
        v3: '', ds3: '', ts3: '', de3: '', te3: '',
        v4: '', ds4: '', ts4: '', de4: '', te4: ''},
    //Складення процесуальних документів
    /* vN - Найменування процесуального документа;
    * dN  - дата реєстрації документа органом якому адресований документ;
    * tN  - час реєстрації документа органом якому адресований документ;
    */
    procDocs: {v1: '', d1: '', t1: '',
        v2: '', d2: '', t2: '',
        v3: '', d3: '', t3: '',
        v4: '', d4: '', t4: ''},
    //Перелік завірених адвокатом копій процесуальних та інших документів, що підтверджують наведені дані
    documents: {v1: false, //клопотання адвоката;
		v2: false, //скарга(и) адвоката;
		v3: false, //протокол(и) процесуальної(их) дії(й);
        v4: false, //медична довідка, що підтверджує наявність у особи інфекційної хвороби
        other: '_______________________________________________________________________________________________________________', //інше
        sheets: 0 //Загальна кількість аркушів документів
	},
	sum: 0
};

/**
 * записує дані в глобальний масив data[]
 * @param attr
 * @param field
 * @param value
 * @param type
 */
function setData(attr, field, value, type) {
    switch (type) {
        case 'num' :
            data[attr][field] = (parseInt(value) || 0);
            break;
        case 'date' :
            data[attr][field] = value.replace(/-/g, '/');
            break;
        case 'flo' :
            data[attr][field] = (parseFloat(value) || 0);
            break;
        default :
            data[attr][field] = value;
    }
}

/**
 * викликається при натисненні кнопки створити звіт
 * робить підготовчі дій по формуванню pdf файлу
 * @returns {boolean}
 */
function makeReport() {
	// розрахунок розміру винагороди
    data.sum = (2 * data.numTrips.k() + 2 * data.specCategory.k() * data.numActs.k() * data.osk.k() * data.terminatePart.k())
		* data.paymentPerHour.k() * data.actsInNight.k() * data.termSubmission.k();
    // костиль щоб заокруглювало як і exel
    data.sum += 0.0004;
    data.sum = data.sum.toFixed(2);
    makePDF();
    return false;
}

function makePDF() {
		var docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            pageMargins: [ 25, 15, 15, 10 ],
				content: [
                    {
                        fontSize: 9,
                        table: {
                            widths: [400, 45, 45, '*'],
                            body: [
                            	[{
                                    border: [false, false, true, false],
                                    fillColor: '#286e28',
									color: 'white',
                                    colSpan: 4,
                                    alignment: 'center',
                                    text: 'Розмір винагороди адвоката за надання БВПД\n' +
                                    '[АЗ] особі, до якої застосовано адміністративне затримання та / або адміністративний арешт,\n' +
                                    'або [ОПД] у разі залучення до окремої процесуальної дії'
								},{}, {}, {}],
								[
									{border: [false, false, false, false], text: '\n'},
									{border: [false, false, false, false], text: '\n'},
									{border: [false, false, false, false], text: '\n'},
                                    {border: [false, false, false, false], text: '\n'}
								],
                                [
                                    {
                                        border: [false, false, false, false],
                                        fillColor: '#dbe6c4',
                                        alignment: 'right',
                                        margin: [-20, 5, -4, 5],
                                        fontSize: 8,
                                        colSpan: 2,
										text: 'P=(2 х Квиїздів + 2 х Кос. кат x Кдій х Коск х Кприп) х Огод х Кос. час х Кзвіт=' +
                                        '(2 x ' + comma(data.numTrips.k()) + ' + ' + '2 x ' + comma(data.specCategory.k()) + ' x ' + comma(data.numActs.k()) + ' x ' +
                                        comma(data.osk.k()) + ' x ' + comma(data.terminatePart.k()) + ') x ' + comma(data.paymentPerHour.k()) + ' x ' +
                                        comma(data.actsInNight.k()) + ' x ' + comma(data.termSubmission.k()) + '='

                                    },
									{},
                                    {
                                        border: [false, false, true, false],
                                        fontSize: 15,
										bold: true,
                                        alignment: 'right',
                                        fillColor: '#286e28',
                                        color: 'white',
                                        colSpan: 2,
                                        text: comma(data.sum) + ' '
                                    },
									{}
                                ],
                                [
                                    {border: [false, false, false, false], text: '\n'},
                                    {border: [false, false, false, false], text: '\n'},
                                    {border: [false, false, false, false], text: '\n'},
                                    {border: [false, false, false, false], text: '\n'}
                                ],
                                [
                                    {
                                        fillColor: '#d9d9d9',
                                        text: [
											{
                                                bold: true,
												text: '1. Кількість виїздів адвоката\n'
											},
                                            {
                                                fontSize: 8,
                                                text: 'для побачення з особою, якій надається БВПД, участі у процесуальних діях та / або збирання доказів'
                                            }]
                                    },
                                    {
                                        fillColor: '#dbe6c4',
                                        margin: [0, 5, 0, 5],
                                        alignment: 'center',
										text: data.numTrips.v1
									},
                                    {
                                        bold: true,
                                        margin: [0, 5, 0, 5],
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: 'Квиїздів='
                                    },
                                    {
                                        bold: true,
                                        margin: [0, 5, 0, 5],
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: comma(data.numTrips.k())
                                    }
                                ],

//2. Припинення участі адвоката до завершення строку дії доручення

                                [
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, true, true, false],
                                        text: [
                                            {
                                                bold: true,
                                                text: '2. Припинення участі адвоката до завершення строку дії доручення, '
                                            },
                                            {
                                                text: ' якщо:'
                                            }]
                                    },
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, true, true, false],
                                        text: ''
                                    },
                                    {
                                        border: [true, true, true, false],
                                        fillColor: '#d9d9d9',
                                        text: ''
                                    },
                                    {
                                        border: [true, true, true, false],
                                        fillColor: '#d9d9d9',
                                        text: ''
                                    }
                                ],


                                [
                                    {
                                        fillColor: '#ffffff',
                                        border: [true, false, false, false],
                                        italics: true,
                                        text: [
                                            {
                                                bold: true,
                                                text: ' - під час першого конфіденційного побачення '
                                            },
                                            {
                                                text: 'з адвокатом особа, якій надається '+
												'БВПД, заявила про відмову від його послуг у письмовій формі, або ж адвокат внаслідок '+
												'конфлікту інтересів чи з інших причин прийняв рішення про відмову від надання БВПД особі;'
                                            }]
                                    },
                                    {
                                        fillColor: '#dbe6c4',
                                        border: [true, false, false, false],
                                        alignment: 'center',
                                        text: '\n' + (data.terminatePart.v1 || data.terminatePart.v2 ? 'так' : 'ні')
                                    },
                                    {
                                        bold: true,
                                        border: [true, false, true, false],
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: '\n \nКприп ='
                                    },
                                    {
                                        bold: true,
                                        border: [true, false, true, false],
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: '\n \n' + comma(data.terminatePart.k())
                                    }
                                ],


                                [
                                    {
                                        fillColor: '#ffffff',
                                        border: [true, false, true, false],
                                        italics: true,
                                        text: [
                                            {
                                                text: ' - адвокат припинив надання БВПД до завершення строку дії доручення '
                                            },
                                            {
                                                bold: true,
                                                text: 'в інший час після конфіденційного побачення '
                                            },
                                            {
                                                text: 'з будь-яких інших підстав, визначених законом '
                                            }]
                                    },
                                    {
                                        fillColor: '#dbe6c4',
                                        border: [true, false, true, false],
                                        alignment: 'center',
                                        text: (data.terminatePart.v3 ? 'так' : 'ні')
                                    },
                                    {
                                        border: [true, false, true, false],
                                        fillColor: '#d9d9d9',
                                        text: ''
                                    },
                                    {
                                        border: [true, false, true, false],
                                        fillColor: '#d9d9d9',
                                        text: ''
                                    }
                                ],

// 3. Особлива категорія особи, якій надається БВПД

                                [
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, true, true, false],
                                       	bold: true,
										text: '3. Особлива категорія особи, якій надається БВПД:'
                                    },
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, true, true, false],
                                        text: ''
                                    },
                                    {
                                        border: [true, true, true, false],
                                        fillColor: '#d9d9d9',
                                        text: ''
                                    },
                                    {
                                        border: [true, true, true, false],
                                        fillColor: '#d9d9d9',
                                        text: ''
                                    }
                                ],


                                [
                                    {
                                        fillColor: '#ffffff',
                                        border: [true, false, true, false],
                                        italics: true,
										text: ' - у віці до 18 років;'
                                    },
                                    {
                                        fillColor: '#dbe6c4',
                                        border: [true, false, true, false],
                                        alignment: 'center',
                                        text: (data.specCategory.v1 ? 'так' : 'ні')
                                    },
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, false, true, false],
                                        text: ''
                                    },
                                    {
                                        border: [true, false, true, false],
                                        fillColor: '#d9d9d9',
                                        text: ''
                                    }
                                ],


                                [
                                    {
                                        fillColor: '#ffffff',
                                        border: [true, false, true, false],
                                        italics: true,
                                        text: ' - яка через свої фізичні або психічні вади (німа, глуха, сліпа тощо) не може '+
										'сама реалізувати своє право на захист;'
                                    },
                                    {
                                        fillColor: '#dbe6c4',
                                        border: [true, false, true, false],
                                        alignment: 'center',
                                        text: (data.specCategory.v2 ? 'так' : 'ні')
                                    },
                                    {
                                        bold: true,
                                        border: [true, false, true, false],
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: '\nКос. кат='
                                    },
                                    {
                                        bold: true,
                                        border: [true, false, true, false],
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: '\n' + comma(data.specCategory.k())
                                    }
                                ],

                                [
                                    {
                                        fillColor: '#ffffff',
                                        border: [true, false, true, false],
                                        italics: true,
                                        text: ' - яка не володіє мовою, якою ведеться провадження;'
                                    },
                                    {
                                        fillColor: '#dbe6c4',
                                        border: [true, false, true, false],
                                        alignment: 'center',
                                        text: (data.specCategory.v3 ? 'так' : 'ні')
                                    },
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, false, true, false],
                                        text: ''
                                    },
                                    {
                                        border: [true, false, true, false],
                                        fillColor: '#d9d9d9',
                                        text: ''
                                    }
                                ],


                                [
                                    {
                                        fillColor: '#ffffff',
                                        border: [true, false, true, false],
                                        italics: true,
                                        text: ' - у якої виявлено інфекційну хворобу, що підтверджується відповідною медичною довідкою'
                                    },
                                    {
                                        fillColor: '#dbe6c4',
                                        border: [true, false, true, false],
                                        alignment: 'center',
                                        text: (data.specCategory.v4 ? 'так' : 'ні')
                                    },
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, false, true, false],
                                        text: ''
                                    },
                                    {
                                        border: [true, false, true, false],
                                        fillColor: '#d9d9d9',
                                        text: ''
                                    }
                                ],

// 4. Сумарна кількість дій адвоката з надання БВПД

                                [
                                    {
                                        fillColor: '#d9d9d9',
                                        text: [
                                            {
                                                bold: true,
                                                text: '4. Сумарна кількість дій адвоката з надання БВПД,\n'
                                            },
                                            {
                                                fontSize: 8,
                                                text: 'зазначених у реєстрі дій адвоката (побачення з особою,'+
												'якій надається БВПД, участь у процесуальних діях, складення процесуальних документів)'
                                            }]
                                    },
                                    {
                                        fillColor: '#dbe6c4',
                                        alignment: 'center',
                                        text: '\n' + data.numActs.v1
                                    },
                                    {
                                        bold: true,

                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: '\nКдій ='
                                    },
                                    {
                                        bold: true,
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: '\n' + comma(data.numActs.k())
                                    }
                                ],

                                [
                                    {
                                        fillColor: '#d9d9d9',
                                        text: [
                                            {
                                                bold: true,
                                                text: '- у разі якщо кількість дій адвоката = 0, '
                                            },
                                            {
                                                fontSize: 8,
                                                text: 'вказати чи припав час виїзду повністю або частково на нічний час '+
                                                '(з 22.00 до 6.00) або вихідні (субота, неділя), або святкові / неробочі дні'
                                            }]
                                    },
                                    {
                                        fillColor: '#dbe6c4',
                                        alignment: 'center',
                                        margin: [0, 5, 0, 5],
                                        text: (data.numActs.v2 ? 'так' : 'ні')
                                    },
                                    {
                                        fillColor: '#d9d9d9',
                                        text: ''
                                    },
                                    {
                                        fillColor: '#d9d9d9',
                                        text: ''
                                    }
                                ],

// 5. Частка дій адвоката у нічний час, вихідні, святкові та неробочі дні від загальної кількості таких дій

                                [
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, true, true, false],
                                        bold: true,
                                      	text: '5. Частка дій адвоката у нічний час, вихідні, святкові та неробочі дні від загальної кількості таких дій'
                                    },
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, true, true, false],
                                        margin: [0, 5, 0, 5],
                                        alignment: 'center',
                                        text: (data.actsInNight.percent == 0 ? '0,00' : comma(data.actsInNight.percent)) + '%'
                                    },
                                    {
                                        bold: true,
                                        border: [true, false, true, false],
                                        margin: [0, 5, 0, 5],
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: 'Кос. час ='
                                    },
                                    {
                                        bold: true,
                                        border: [true, false, true, false],
                                        margin: [0, 5, 0, 5],
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: comma(data.actsInNight.k())
                                    }
                                ],

                                [
                                    {
                                        fillColor: '#ffffff',
                                        border: [true, false, true, false],
                                        italics: true,
                                       	text: '- кількість дій, які повністю або частково припадають на:\n' +
                                        'нічний час (з 22.00 до 6.00) або вихідні (субота, неділя), або святкові / неробочі дні'
                                    },
                                    {
                                        fillColor: '#dbe6c4',
                                        border: [true, false, true, false],
                                        margin: [0, 5, 0, 5],
                                        alignment: 'center',
                                        text: data.actsInNight.v1
                                    },
                                    {
                                        border: [true, false, true, false],
                                        fillColor: '#d9d9d9',
                                        text: ''
                                    },
                                    {
                                        border: [true, false, true, false],
                                        fillColor: '#d9d9d9',
                                        text: ''
                                    }
                                ],

// 6. Обрання затриманій особі запобіжного заходу (ЗЗ) у вигляді тримання під вартою:

                                [
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, true, true, false],
                                        bold: true,
                                        text: '6. Коефіцієнт оскарження рішення щодо обрання запобіжного заходу особі, якій\nнадається правова допомога'
                                    },
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, true, true, false],
                                        text: ''
                                    },
                                    {
                                        bold: true,
                                        margin: [0, 5, 0, 5],
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: 'Коск ='
                                    },
                                    {
                                        bold: true,
                                        margin: [0, 5, 0, 5],
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: comma(data.osk.k())
                                    }
                                ],

// 7. Розмір прожиткового мінімуму, грн.

                                [
                                    {
                                        fillColor: '#d9d9d9',
                                        text: [
                                            {
                                                bold: true,
                                                text: '7. Розмір прожиткового мінімуму, грн.\n'
                                            },
                                            {
                                                fontSize: 8,
                                                text: 'для працездатних осіб на момент подання адвокатом акта'
                                            }]
                                    },
                                    {
                                        fillColor: '#dbe6c4',
                                        margin: [0, 5, 0, 5],
                                        alignment: 'center',
                                        text: comma(data.paymentPerHour.v1) + ',00'
                                    },
                                    {
                                        bold: true,
                                        margin: [0, 5, 0, 5],
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: 'Огод ='
                                    },
                                    {
                                        bold: true,
                                        margin: [0, 5, 0, 5],
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: comma(data.paymentPerHour.k()) + '0'
                                    }
                                ],


// 8. Строк подання акта

                                [
                                    {
                                        fillColor: '#d9d9d9',
                                        text: [
                                            {
                                                bold: true,
                                                text: '8. Строк подання акта\n'
                                            },
                                            {
                                                fontSize: 7,
                                                text: 'починаючи з дня, наступного за днем завершення надання БВПД / відповідної стадії провадження (процесу)'
                                            }]
                                    },
                                    {
                                        fillColor: '#dbe6c4',
                                        alignment: 'center',
                                        text: data.termSubmission.l()
                                    },
                                    {
                                        bold: true,
                                        margin: [0, 5, 0, 5],
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: 'Кзвіт ='
                                    },
                                    {
                                        bold: true,
                                        margin: [0, 5, 0, 5],
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: comma(data.termSubmission.k())
                                    }
                                ],

                                [
                                    {border: [false, false, false, false], text: '\n'},
                                    {border: [false, false, false, false], text: '\n'},
                                    {border: [false, false, false, false], text: '\n'},
                                    {border: [false, false, false, false], text: '\n'}
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        fillColor: '#dbe6c4',
                                        alignment: 'right',
                                        margin: [-20, 5, -4, 5],
                                        fontSize: 8,
                                        colSpan: 2,
                                        text: 'P=(2 х Квиїздів + 2 х Кос. кат x Кдій х Коск х Кприп) х Огод х Кос. час х Кзвіт=' +
                                        '(2 x ' + comma(data.numTrips.k()) + ' + ' + '2 x ' + comma(data.specCategory.k()) + ' x ' + comma(data.numActs.k()) + ' x ' +
                                        comma(data.osk.k()) + ' x ' + comma(data.terminatePart.k()) + ') x ' + comma(data.paymentPerHour.k()) + ' x ' +
                                        comma(data.actsInNight.k()) + ' x ' + comma(data.termSubmission.k()) + '='

                                    },
                                    {},
                                    {
                                        border: [false, false, true, false],
                                        fontSize: 15,
                                        bold: true,
                                        alignment: 'right',
                                        fillColor: '#286e28',
                                        color: 'white',
                                        colSpan: 2,
                                        text: comma(data.sum) + ' '
                                    },
                                    {}
                                ]

                            ]
                        }
                    },









          // Розрахунок розміру винагороди адвоката за надання безоплатної вторинної правової допомоги

                    {
                        pageBreak: 'before',
                        table: {
                             widths: ['*', 170, 250],
                            body: [
                                [{
                                 fontSize: 14,
                                    border: [false, false, false, false],
                                 table: {
                                     body: [[{
                                         bold: true,
                                         margin: [-3, 2, -3, 9],
                                         text: 'ОПД'
                                     }]]}
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''
                                    },
                                    {
                                        border: [false, false, false, false],
                                        fontSize: 8,
                                        text: 'Додаток 3\n'+
                                            'до акта надання безоплатної вторинної правової допомоги\n \n'+
                                            'від «_____» ____________________ 20 ___ року  № _________\n \n'
                                    }]]
                        }
                    },
                    // Заголовок
                    {
                        alignment: 'center',
                        fontSize: 9,
                        text: [
                            {
                                bold: true,
                                text: 'Розрахунок розміру винагороди адвоката за надання безоплатної вторинної правової допомоги\n'
                            },
                            {
                                text: 'у разі залучення до окремої процесуальної дії (ОПД)\n \n'
                            }]
                    },

//  1. ЗАГАЛЬНІ ДАНІ

                    {
                        table: {
                            widths: [545],
                            body: [[{
                                border: [false, false, false, false],
                                margin: [-2, -2, -2, -2],
                                fontSize: 9,
                                bold: true,
                                fillColor: '#bebebe',
                                text: '1. ЗАГАЛЬНІ ДАНІ'
                        }]]}
                    },
                    {
                        fontSize: 3,
                        text: '\n'

                    },
                    {
                        fontSize: 9,
                        text: [
                            {
                                bold: true,
                                text: '1.1. П.І.Б. адвоката, який (яка) надав(ла) БВПД  '
                            },
                            {
                                text: data.commonData.lawyerName
                            }]
                    },
                    {
                        fontSize: 3,
                        text: '\n'

                    },
                    {
                        fontSize: 9,
                        text: [
                            {
                                bold: true,
                                text: '1.2. Доручення центру з надання БВПД  '
                            },
                            {
                                text: 'від ' + data.commonData.arrandDate + '   № ' + data.commonData.arrandNum
                            }]
                    },
                    {
                        fontSize: 3,
                        text: '\n'

                    },
                    {
                        fontSize: 9,
                        text: [
                            {
                                bold: true,
                                text: '1.3. П.І.Б., дата народження особи, якій надано БВПД\n'
                            },
                            {
                                text: data.commonData.detaineeName + '          ' + data.commonData.detaineeDate
                            }]
                    },
                    {
                        fontSize: 2,
                        text: '\n'

                    },

// 2. ВИХІДНІ ДАНІ ДЛЯ РОЗРАХУНКУ ЗНАЧЕНЬ КОЕФІЦІЄНТІВ, ЩО ВИЗНАЧАЮТЬ РОЗМІР ВИНАГОРОДИ АДВОКАТА

                    {
                        table: {
                            widths: [545],
                            body: [[{
                                border: [false, false, false, false],
                                margin: [-2, -2, -2, -2],
                                fontSize: 9,
                                bold: true,
                                fillColor: '#bebebe',
                                text: '2. ВИХІДНІ ДАНІ ДЛЯ РОЗРАХУНКУ ЗНАЧЕНЬ КОЕФІЦІЄНТІВ, ЩО ВИЗНАЧАЮТЬ РОЗМІР ВИНАГОРОДИ АДВОКАТА'
                            }]]}
                    },
                    {
                        text: [
                            {
                                bold: true,
                                fontSize: 9,
                                text: '2.1. Кількість виїздів адвоката для побачення з особою, якій надається БВПД, участі у процесуальних діях та/або збирання\n'+
                                'доказів (К'
                            },
                            {
                                bold: true,
                                fontSize: 6,
                                text: 'виїздів'
                            },
                            {
                                bold: true,
                                fontSize: 9,
                                italics: true,
                                text: ')   _' + data.numTrips.v1 + '_.'
                            }]
                    },
                    {
                        fontSize: 2,
                        text: '\n'

                    },
                    {
                        text: [
                            {
                                bold: true,
                                fontSize: 9,
                                text: '2.2. Особлива категорія особи, якій надається БВПД (К'
                            },
                            {
                                bold: true,
                                fontSize: 6,
                                text: 'ос. кат'
                            },
                            {
                                bold: true,
                                fontSize: 9,
                                text: ') '
                            },
                            {
                                fontSize: 9,
                                text: '(відмітити потрібне):'
                            }]
                    },
                    {
                        table: {
                            widths: [4, 520],
                            body: [[{
                                margin: [-2, -5, -2, -5],
                                fontSize: 14,
                                bold: true,
                                text: (data.specCategory.v1 ? 'X' : '')
                            },
                                {
                                    border: [false, false, false, false],
                                    margin: [0, -2, 0, -2],
                                    fontSize: 9,
                                    text: 'у віці до 18 років;'
                                }
                            ]]}
                    },
                    {
                        fontSize: 2,
                        text: '\n'

                    },
                    {
                        table: {
                            widths: [4, 520],
                            body: [[{
                                margin: [-2, -5, -2, -5],
                                fontSize: 14,
                                bold: true,
                                text: (data.specCategory.v2 ? 'X' : '')
                            },
                                {
                                    border: [false, false, false, false],
                                    margin: [0, -2, 0, -2],
                                    fontSize: 9,
                                    text: 'через свої фізичні або психічні вади (німа, глуха, сліпа тощо) не може сама реалізувати своє право на захист;'
                                }
                            ]]}
                    },
                    {
                        fontSize: 2,
                        text: '\n'

                    },
                    {
                        table: {
                            widths: [4, 520],
                            body: [[{
                                margin: [-2, -5, -2, -5],
                                fontSize: 14,
                                bold: true,
                                text: (data.specCategory.v3 ? 'X' : '')
                            },
                                {
                                    border: [false, false, false, false],
                                    margin: [0, -2, 0, -2],
                                    fontSize: 9,
                                    text: 'не володіє мовою, якою ведеться провадження;'
                                }
                            ]]}
                    },
                    {
                        fontSize: 2,
                        text: '\n'

                    },
                    {
                        table: {
                            widths: [4, 520],
                            body: [[{
                                margin: [-2, -5, -2, -5],
                                fontSize: 14,
                                bold: true,
                                text: (data.specCategory.v4 ? 'X' : '')
                            },
                                {
                                    border: [false, false, false, false],
                                    margin: [0, -2, 0, -2],
                                    fontSize: 9,
                                    text: 'виявлено інфекційну хворобу, що підтверджується відповідною медичною довідкою.'
                                }
                            ]]}

                    },
                    {
                        fontSize: 4,
                        text: '\n'

                    },

//  2.3. Сумарна кількість дій адвоката з надання БВПД, зазначених у реєстрі дій адвоката

                    {
                        text: [
                            {
                                bold: true,
                                fontSize: 9,
                                text: '2.3. Сумарна кількість дій адвоката з надання БВПД, зазначених у реєстрі дій адвоката (К'
                            },
                            {
                                bold: true,
                                fontSize: 6,
                                text: 'дій'
                            },
                            {
                                bold: true,
                                fontSize: 9,
                                italics: true,
                                text: ')*   _' + data.numActs.v1 + '_.\n'
                            },
                            {
                                fontSize: 6,
                                text: '* У разі якщо затриману особу звільнено до моменту прибуття адвоката, вказується 0.'
                            }]
                    },
                    {
                        fontSize: 3,
                        text: '\n'

                    },

//           Реєстр дій адвоката

                    {
                        bold: true,
                        fontSize: 9,
                        text: 'Реєстр дій адвоката'
                    },
                    {
                        fontSize: 3,
                        text: '\n'

                    },

//           Побачення з особою, якій надається БВПД

                    {
                        fontSize: 9,
                        text: 'А. Побачення з особою, якій надається БВПД'
                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [20, '*', 20, '*'],
                            body: [[
                                {
                                    bold: true,
                                    margin: [-4, 0, -4, 0],
                                    alignment: 'center',
                                    text: '№ з/п'
                                },
                                {
                                    bold: true,
                                    alignment: 'center',
                                    text: 'Дата і час початку та закінчення'
                                },
                                {
                                    bold: true,
                                    margin: [-4, 0, -4, 0],
                                    alignment: 'center',
                                    text: '№ з/п'
                                },
                                {
                                    bold: true,
                                    alignment: 'center',
                                    text: 'Дата і час початку та закінчення'
                                }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '1'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.meetings.v1
                                    },
                                    {
                                        alignment: 'center',
                                        text: '3'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.meetings.v3
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '2'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.meetings.v2
                                    },
                                    {
                                        alignment: 'center',
                                        text: '4'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.meetings.v4
                                    }
                                ]
                            ]}

                    },

//           Б. Участь у процесуальних діях

                    {
                        fontSize: 9,
                        text: '\nБ. Участь у процесуальних діях'
                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [20, '*', 130],
                            body: [[
                                {
                                    bold: true,
                                    margin: [-4, 0, -4, 0],
                                    alignment: 'center',
                                    text: '№ з/п'
                                },
                                {
                                    bold: true,
                                    alignment: 'center',
                                    text: 'Найменування процесуальної дії'
                                },
                                {
                                    bold: true,
                                    alignment: 'center',
                                    text: 'Дата і час початку\n' +
                                    'та закінчення'
                                }
                            ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '1'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.v1
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.ds1 + '      ' + data.procActions.ts1 + (data.procActions.ds1 != '' ? ' - ' : '') +
                                        (data.procActions.ds1 == data.procActions.de1 ? '' : '\n' + data.procActions.de1 + '    ') + data.procActions.te1
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '2'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.v2
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.ds2 + '      ' + data.procActions.ts2 + (data.procActions.ds2 != '' ? ' - ' : '') +
                                        (data.procActions.ds2 == data.procActions.de2 ? '' : '\n' + data.procActions.de2 + '    ') + data.procActions.te2
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '3'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.v3
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.ds3 + '      ' + data.procActions.ts3 + (data.procActions.ds3 != '' ? ' - ' : '') +
                                        (data.procActions.ds3 == data.procActions.de3 ? '' : '\n' + data.procActions.de3 + '    ') + data.procActions.te3
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '4'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.v4
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.ds4 + '      ' + data.procActions.ts4 + (data.procActions.ds4 != '' ? ' - ' : '') +
                                        (data.procActions.ds4 == data.procActions.de4 ? '' : '\n' + data.procActions.de4 + '    ') + data.procActions.te4
                                    }
                                ]
                            ]}
                    },

//           В. Складання процесуальних документів

                    {
                        fontSize: 9,
                        text: '\nВ. Складання процесуальних документів'
                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [20, '*', 130],
                            body: [[
                                {
                                    bold: true,
                                    margin: [-4, 0, -4, 0],
                                    alignment: 'center',
                                    text: '№ з/п'
                                },
                                {
                                    bold: true,
                                    alignment: 'center',
                                    text: 'Найменування процесуального документа'
                                },
                                {
                                    bold: true,
                                    alignment: 'center',
                                    text: 'Дата і час реєстрації органом\n' +
                                    '(службовою особою), якому\n'+
                                    '(якій) адресовано документ'
                                }
                            ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '1'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.v1
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.d1 + '      ' + data.procDocs.t1
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '2'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.v2
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.d2 + '      ' + data.procDocs.t2
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '3'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.v3
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.d3 + '      ' + data.procDocs.t3
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '4'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.v4
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.d4 + '      ' + data.procDocs.t4
                                    }
                                ]
                            ]}
                    },

//   2.4. Оскарження адвокатом рішення щодо обрання особі запобіжного заходу у вигляді тримання під вартою

                    {
                        text: [
                            {
                                bold: true,
                                fontSize: 9,
                                text: '2.4. К'
                            },
                            {
                                bold: true,
                                fontSize: 6,
                                text: 'оск'
                            },
                            {
                                bold: true,
                                fontSize: 9,
                                text: '=1.'
                            }]
                    },
                    {
                        text: [
                            {
                                bold: true,
                                fontSize: 9,
                                text: '2.5. Припинення участі адвоката до завершення строку дії доручення для надання БВПД (К'
                            },
                            {
                                bold: true,
                                fontSize: 6,
                                text: 'прип'
                            },
                            {
                                bold: true,
                                fontSize: 9,
                                text: ') '
                            },
                            {
                                fontSize: 9,
                                text: '(відмітити потрібне):'
                            }]
                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [4, 525],
                            body: [
                                [
                                    {
                                        margin: [-2, -5, -2, -6],
                                        fontSize: 14,
                                        bold: true,
                                        text: (data.terminatePart.v1 ? 'X' : '')
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: 'під час першого конфіденційного побачення з адвокатом особа, якій надається БВПД, заявила про відмову від його послуг'
                                    }
                                ],
                                [{
                                    colSpan: 2,
                                    border: [false, false, false, false],
                                    margin: [0, -2, 0, -2],
                                    text: 'у письмовій формі;'
                                },
                                    {}]]}
                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [4, 525],
                            body: [
                                [
                                    {
                                        margin: [-2, -5, -2, -6],
                                        fontSize: 14,
                                        bold: true,
                                        text: (data.terminatePart.v2 ? 'X' : '')
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: 'адвокат під час першого конфіденційного побачення внаслідок конфлікту інтересів чи з інших причин прийняв'
                                    }
                                ],
                                [{
                                    colSpan: 2,
                                    border: [false, false, false, false],
                                    margin: [0, -2, 0, -2],
                                    text: 'рішення про відмову від надання БВПД особі;'
                                },
                                    {}]]}
                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [4, 525],
                            body: [
                                [
                                    {
                                        margin: [-2, -5, -2, -6],
                                        fontSize: 14,
                                        bold: true,
                                        text: (data.terminatePart.v3 ? 'X' : '')
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: 'адвокат припинив надання БВПД до завершення строку дії доручення в інший час після конфіденційного побачення'
                                    }
                                ],
                                [{
                                    colSpan: 2,
                                    border: [false, false, false, false],
                                    margin: [0, -2, 0, -2],
                                    text: 'з будь-яких інших підстав, визначених законом.'
                                },
                                    {}]]}
                    },
                    {
                        fontSize: 4,
                        text: '\n'

                    },

  //   2.6. Частка дій адвоката з надання БВПД, що повністю або частково припадали на нічний час, вихідні, святкові та неробочі дні

                    {
                        text: [
                            {
                                bold: true,
                                fontSize: 9,
                                text: '2.6. Частка дій адвоката з надання БВПД, що повністю або частково припадали на нічний час, вихідні, святкові та неробочі\n'+
                                    'дні, від загальної кількості таких дій '
                            },
                            {
                                fontSize: 9,
                                text: 'згідно з даними, наведеними у реєстрі дій адвоката '
                            },
                            {
                                bold: true,
                                fontSize: 9,
                                text: '(К'
                            },
                            {
                                bold: true,
                                fontSize: 6,
                                text: 'ос. час'
                            },
                            {
                                bold: true,
                                fontSize: 9,
                                text: ') '
                            },
                            {
                                fontSize: 9,
                                text: '(відмітити потрібне):'
                            }]
                    },
                    {
                        table: {
                            widths: [4, 50, 4, 80, 4, 80, 4, 80, 4, 80],
                            body: [
                                [{
                                margin: [-2, -5, -2, -5],
                                fontSize: 14,
                                bold: true,
                                text: (data.actsInNight.percent < 10 ? 'X' : '')
                            },
                                {
                                    border: [false, false, false, false],
                                    margin: [0, -2, 0, -2],
                                    fontSize: 9,
                                    text: 'до 10 %;'
                                },
                                {
                                    margin: [-2, -5, -2, -5],
                                    fontSize: 14,
                                    bold: true,
                                    text: (data.actsInNight.percent >= 10 && data.actsInNight.percent < 20 ? 'X' : '')
                                },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        fontSize: 9,
                                        text: 'від 10 % до 20 %;'
                                    },
                                {
                                    margin: [-2, -5, -2, -5],
                                    fontSize: 14,
                                    bold: true,
                                    text: (data.actsInNight.percent >= 20 && data.actsInNight.percent < 30 ? 'X' : '')
                                },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        fontSize: 9,
                                        text: 'від 20 % до 30 %;'
                                    },
                                {
                                    margin: [-2, -5, -2, -5],
                                    fontSize: 14,
                                    bold: true,
                                    text: (data.actsInNight.percent >= 30 && data.actsInNight.percent < 50 ? 'X' : '')
                                },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        fontSize: 9,
                                        text: 'від 30 % до 50 %;'
                                    },
                                {
                                    margin: [-2, -5, -2, -5],
                                    fontSize: 14,
                                    bold: true,
                                    text: (data.actsInNight.percent >= 50 ? 'X' : '')
                                },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        fontSize: 9,
                                        text: 'понад 50 %.'
                                    }
                                ]
                            ]}
                    },
                    {
                        fontSize: 4,
                        text: '\n'

                    },

 //   2.7. Строк подання акта надання БВПД до центру з надання БВПД
                    {
                        text: [
                            {
                                bold: true,
                                fontSize: 9,
                                text: '2.7. Строк подання акта надання БВПД до центру з надання БВПД, '
                            },
                            {
                                fontSize: 9,
                                text: 'починаючи з дня, наступного за днем завершення надання\nБВПД/стадії провадження чи процесу'
                            },
                            {
                                bold: true,
                                fontSize: 9,
                                text: '(К'
                            },
                            {
                                bold: true,
                                fontSize: 6,
                                text: 'звіт'
                            },
                            {
                                bold: true,
                                fontSize: 9,
                                text: ') '
                            },
                            {
                                fontSize: 9,
                                text: '(відмітити потрібне):'
                            }]
                    },
                    {
                        table: {
                            widths: [4, 70, 4, 85, 4, 85, 4, 85, 4, 85],
                            body: [
                                [{
                                    margin: [-2, -5, -2, -5],
                                    fontSize: 14,
                                    bold: true,
                                    text: (data.termSubmission.v1 == 1 ? 'X' : '')
                                },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        fontSize: 9,
                                        text: 'до 45 днів;'
                                    },
                                    {
                                        margin: [-2, -5, -2, -5],
                                        fontSize: 14,
                                        bold: true,
                                        text: (data.termSubmission.v1 == 0.75 ? 'X' : '')
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        fontSize: 9,
                                        text: 'від 46 до 60 днів;'
                                    },
                                    {
                                        margin: [-2, -5, -2, -5],
                                        fontSize: 14,
                                        bold: true,
                                        text: (data.termSubmission.v1 == 0.5 ? 'X' : '')
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        fontSize: 9,
                                        text: 'від 61 до 90 днів;'
                                    },
                                    {
                                        margin: [-2, -5, -2, -5],
                                        fontSize: 14,
                                        bold: true,
                                        text: (data.termSubmission.v1 == 0.25 ? 'X' : '')
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        fontSize: 9,
                                        text: 'від 91 до 120 днів;'
                                    },
                                    {
                                        margin: [-2, -5, -2, -5],
                                        fontSize: 14,
                                        bold: true,
                                        text: (data.termSubmission.v1 == 0 ? 'X' : '')
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        fontSize: 9,
                                        text: 'понад 120 днів.'
                                    }
                                ]
                            ]}
                    },

 // 3. ПЕРЕЛІК ЗАВІРЕНИХ АДВОКАТОМ КОПІЙ ПРОЦЕСУАЛЬНИХ ТА ІНШИХ ДОКУМЕНТІВ

                    {
                        pageBreak: 'before',
                        fontSize: 12,
                        text: '\n'

                    },
                    {
                        text: [
                            {
                                alignment: 'right',
                                color: 'gray',
                                fontSize: 9,
                                text: '2                                        '
                            },
                            {
                                color: 'gray',
                                fontSize: 9,
                                text: '                                          Продовження додатка 3'
                            }]

                    },
                    {
                        table: {
                            widths: [545],
                            body: [[{
                                border: [false, false, false, false],
                                margin: [-2, -2, -2, -2],
                                fontSize: 9,
                                bold: true,
                                fillColor: '#bebebe',
                                text: [
                                    {
                                        bold: true,
                                        fontSize: 9,
                                        text: '3.  ПЕРЕЛІК ЗАВІРЕНИХ АДВОКАТОМ КОПІЙ ПРОЦЕСУАЛЬНИХ ТА ІНШИХ ДОКУМЕНТІВ,  ЩО  ПІДТВЕРДЖУЮТЬ  НАВЕДЕНІ\nДАНІ '
                                    },
                                    {
                                        fontSize: 9,
                                        text: '(відмітити потрібне) (додаються на '
                                    },
                                    {
                                        fontSize: 9,
                                        italics: true,
                                        text: '_' + data.documents.sheets + '_ арк.):'
                                    }]
                            }]]}
                    },
                    {
                        fontSize: 3,
                        text: '\n'

                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [4, 95, 4, 85, 4, 160],
                            body: [
                                [{
                                    margin: [-2, -5, -2, -5],
                                    fontSize: 14,
                                    bold: true,
                                    text: (data.documents.v1 ? 'X' : '')
                                },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: 'клопотання адвоката;'
                                    },
                                    {
                                        margin: [-2, -5, -2, -5],
                                        fontSize: 14,
                                        bold: true,
                                        text: (data.documents.v2 ? 'X' : '')
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: 'скарга(и) адвоката;'
                                    },
                                    {
                                        margin: [-2, -5, -2, -5],
                                        fontSize: 14,
                                        bold: true,
                                        text: (data.documents.v3 ? 'X' : '')
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: 'протокол(и) процесуальної(их) дії(й);'
                                    }
                                ]
                            ]}
                    },
                    {
                        fontSize: 3,
                        text: '\n'

                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [4, 315],
                            body: [
                                [{
                                    margin: [-2, -5, -2, -5],
                                    fontSize: 14,
                                    bold: true,
                                    text: (data.documents.v4 ? 'X' : '')
                                },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: 'медична довідка, що підтверджує наявність у особи інфекційної хвороби;'
                                    }
                                ]
                            ]}
                    },
                    {
                        fontSize: 3,
                        text: '\n'

                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [4, 530],
                            body: [
                                [{
                                    margin: [-2, -5, -2, -5],
                                    fontSize: 14,
                                    bold: true,
                                    text: (data.documents.other.indexOf('____') == -1 ? 'X' : '')
                                },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: [
                                            {
                                                text: 'інше (зазначити)  '
                                            },
                                            {
                                                italics: true,
                                                text: data.documents.other
                                            }]
                                    }
                                ]
                            ]}
                    },
                    {
                        fontSize: 9,
                        text: '____________________________________________________________________________________________________________________________________.'

                    },
                    {
                        fontSize: 4,
                        text: '\n'

                    },

   //  4. РОЗМІР ВИНАГОРОДИ АДВОКАТА ЗА НАДАННЯ БВПД:

                    {
                        table: {
                            widths: [545],
                            body: [[{
                                border: [false, false, false, false],
                                margin: [-2, -2, -2, -2],
                                fontSize: 9,
                                bold: true,
                                fillColor: '#bebebe',
                                text: '4. РОЗМІР ВИНАГОРОДИ АДВОКАТА ЗА НАДАННЯ БВПД:'
                            }]]}
                    },
                    {
                        fontSize: 6,
                        text: '\n'

                    },

                    {
                        fontSize: 10,
                        table: {
                            body: [[{
                                border: [false, false, false, false],
                                text: [
                                    {
                                        text: 'P'
                                    },
                                    {
                                        fontSize: 7,
                                        text: 'затр./ОПД/екс'
                                    },
                                    {
                                        text: ' = (2  x '
                                    }]
                                },
                                {
                                    border: [false, false, false, false],
                                    alignment: 'center',
                                    margin: [-4, -1, -4, 0],
                                    italics: true,
                                    fontSize: 11,
                                    text: '_' + comma(data.numTrips.k()) + '_'

                                },
                                {
                                    border: [false, false, false, false],
                                    text: ' +  2  x '
                                },
                                {
                                    border: [false, false, false, false],
                                    alignment: 'center',
                                    margin: [-4, -1, -4, 0],
                                    italics: true,
                                    fontSize: 11,
                                    text: '_' + comma(data.specCategory.k()) + '_'

                                },
                                {
                                    border: [false, false, false, false],
                                    text: ' x '
                                },
                                {
                                    border: [false, false, false, false],
                                    alignment: 'center',
                                    margin: [-4, -1, -4, 0],
                                    italics: true,
                                    fontSize: 11,
                                    text: '_' + comma(data.numActs.k()) + '_'

                                },
                                {
                                    border: [false, false, false, false],
                                    text: ' x '
                                },
                                {
                                    border: [false, false, false, false],
                                    alignment: 'center',
                                    margin: [-5, 0, -5, 0],
                                    text: comma(data.osk.k())

                                },
                                {
                                    border: [false, false, false, false],
                                    text: ' x '
                                },
                                {
                                    border: [false, false, false, false],
                                    alignment: 'center',
                                    margin: [-4, -1, -4, 0],
                                    italics: true,
                                    fontSize: 11,
                                    text: '_' + comma(data.terminatePart.k()) + '_)'

                                },
                                {
                                    border: [false, false, false, false],
                                    text: ' x '
                                },
                                {
                                    border: [false, false, false, false],
                                    alignment: 'center',
                                    margin: [-4, -1, -4, 0],
                                    italics: true,
                                    fontSize: 11,
                                    text: '_' + comma(data.paymentPerHour.k()) + '_ грн'

                                },
                                {
                                    border: [false, false, false, false],
                                    text: ' x '
                                },
                                {
                                    border: [false, false, false, false],
                                    alignment: 'center',
                                    margin: [-4, -1, -4, 0],
                                    italics: true,
                                    fontSize: 11,
                                    text: '_' + comma(data.actsInNight.k()) + '_'

                                },
                                {
                                    border: [false, false, false, false],
                                    text: ' x '
                                },
                                {
                                    border: [false, false, false, false],
                                    alignment: 'center',
                                    margin: [-4, -1, -4, 0],
                                    italics: true,
                                    fontSize: 11,
                                    text: '_' + comma(data.termSubmission.k()) + '_'

                                },
                                {
                                    border: [false, false, false, false],
                                    text: ' = '
                                },
                                {
                                    border: [false, false, false, false],
                                    margin: [-4, -1, -4, 0],
                                    italics: true,
                                    fontSize: 11,
                                    text: comma(data.sum)

                                },
                                {
                                    border: [false, false, false, false],
                                    text: ' грн.'
                                }],
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: ''
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [-7, -4, -7, 0],
                                        alignment: 'center',
                                        text: [
                                            {
                                                fontSize: 8,
                                                text: 'К'
                                            },
                                            {
                                                fontSize: 6,
                                                text: 'виїздів'
                                            }]
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [-7, -4, -7, 0],
                                        alignment: 'center',
                                        text: [
                                            {
                                                fontSize: 8,
                                                text: 'К'
                                            },
                                            {
                                                fontSize: 6,
                                                text: 'ос. кат'
                                            }]
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [-7, -4, -7, 0],
                                        alignment: 'center',
                                        text: [
                                            {
                                                fontSize: 8,
                                                text: 'К'
                                            },
                                            {
                                                fontSize: 6,
                                                text: 'дій'
                                            }]
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [-7, -4, -7, 0],
                                        alignment: 'center',
                                        text: [
                                            {
                                                fontSize: 8,
                                                text: 'К'
                                            },
                                            {
                                                fontSize: 6,
                                                text: 'оск'
                                            }]
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [-7, -4, -7, 0],
                                        alignment: 'center',
                                        text: [
                                            {
                                                fontSize: 8,
                                                text: 'К'
                                            },
                                            {
                                                fontSize: 6,
                                                text: 'прип'
                                            }]
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [-7, -4, -7, 0],
                                        alignment: 'center',
                                        text: [
                                            {
                                                fontSize: 8,
                                                text: 'О'
                                            },
                                            {
                                                fontSize: 6,
                                                text: 'год'
                                            }]
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [-7, -4, -7, 0],
                                        alignment: 'center',
                                        text: [
                                            {
                                                fontSize: 8,
                                                text: 'К'
                                            },
                                            {
                                                fontSize: 6,
                                                text: 'ос. час'
                                            }]
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [-7, -4, -7, 0],
                                        alignment: 'center',
                                        text: [
                                            {
                                                fontSize: 8,
                                                text: 'К'
                                            },
                                            {
                                                fontSize: 6,
                                                text: 'звіт'
                                            }]
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''
                                    }

                                ]
                            ]}
                    },
                    {
                        fontSize: 4,
                        text: '\n'

                    },
                    {
                        fontSize: 9,
                        text: 'Достовірність інформації, зазначеної у цьому додатку, підтверджую.'

                    },
                    {
                        fontSize: 9,
                        text: '\n'

                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [160, 50, 90],
                            body: [[{
                                border: [false, false, false, false],
                                bold: true,
                                text: 'Складено __ __ / __ __ / __ __ __ __'
                                },
                                {
                                    border: [false, false, false, false],
                                    text: ''
                                },
                                {
                                    border: [false, false, false, false],
                                    text: '_____________________'
                                }
                            ],
                            [
                                {
                                    fontSize: 7,
                                    border: [false, false, false, false],
                                    margin: [0, -4, 0, 0],
                                    alignment: 'center',
                                    text: '(дата)'
                                },
                                {
                                    border: [false, false, false, false],
                                    text: ''
                                },
                                {
                                    fontSize: 7,
                                    border: [false, false, false, false],
                                    margin: [0, -4, 0, 0],
                                    alignment: 'center',
                                    text: '(підпис адвоката)'
                                }
                            ]]
                        }
                    },
                    {
                        fontSize: 9,
                        text: '\n'

                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [250, 5, 90],
                            body: [[{
                                border: [false, false, false, false],
                                bold: true,
                                text: 'Подано до центру з надання БВПД __ __ / __ __ / __ __ __ __'
                            },
                                {
                                    border: [false, false, false, false],
                                    text: ''
                                },
                                {
                                    border: [false, false, false, false],
                                    text: '_____________________'
                                }
                            ],
                                [
                                    {
                                        fontSize: 7,
                                        border: [false, false, false, false],
                                        margin: [120, -4, 0, 0],
                                        alignment: 'center',
                                        text: '(дата)'
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''
                                    },
                                    {
                                        fontSize: 7,
                                        border: [false, false, false, false],
                                        margin: [0, -4, 0, 0],
                                        alignment: 'center',
                                        text: '(підпис адвоката)'
                                    }
                                ]]
                        }
                    },
                    {
                        fontSize: 9,
                        text: '\n'

                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [170, 250, 90],
                            body: [[{
                                border: [false, false, false, false],
                                bold: true,
                                text: 'Прийнято __ __ / __ __ / __ __ __ __'
                            },
                                {
                                    border: [false, false, false, false],
                                    bold: true,
                                    text: 'Центр з надання БВПД __________________________________'
                                },
                                {
                                    border: [false, false, false, false],
                                    text: '____________________'
                                }
                            ],
                                [
                                    {
                                        fontSize: 7,
                                        border: [false, false, false, false],
                                        margin: [0, -4, 0, 0],
                                        alignment: 'center',
                                        text: '(дата)'
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [100, -4, 0, 0],
                                        fontSize: 7,
                                        text: ' (прізвище, ініціали уповноваженої особи)'
                                    },
                                    {
                                        fontSize: 7,
                                        border: [false, false, false, false],
                                        margin: [0, -4, 0, 0],
                                        alignment: 'center',
                                        text: '(підпис)'
                                    }
                                ]]
                        }
                    }
				]
		};
    // pdfMake.fonts = {
    //     Roboto: {
    //         normal: 'Roboto-Regular.ttf',
    //         bold: 'Roboto-Medium.ttf',
    //         italics: 'Roboto-Italic.ttf',
    //         bolditalics: 'Roboto-MediumItalic.ttf'
    //     }
    // };
		pdfMake.createPdf(docDefinition).open();
}





function showTripInNight(valu) {
	var isshow = document.getElementById("trip-in-night");
	var istrip = document.getElementById("myonoffswitch7");
	if (valu == 0) {
		isshow.style.display = 'table-row';
	}
	else {
		isshow.style.display = 'none';
		istrip.checked = false;
	}
}

function showNextField(element) {
	var next_row = element.parentElement.parentElement.nextElementSibling.nextElementSibling;
	if (element.value != '') {
		next_row.style.display = 'table-row';
	}
}

/**
 * показує або ховає і вимикає поля для вибору субєкта, який подавав апеляційну скаргу
 * @param element
 */
function showAppeal(element) {
	var lawerApeal = document.getElementById('lawerApeal');
	var lawerApeal1 = lawerApeal.nextElementSibling;
	var prosecutorApeal = document.getElementById('prosecutorApeal');
	var prosecutorApeal1 = prosecutorApeal.nextElementSibling;
	if (element.value == 1) {
		turnOff(['myonoffswitch9']);
        setData('osk', 'appealLawer', false, '');
        // Встановлює, що ЗЗ у вигляді тримання під вартою не обрано
        setData('osk', 'satisfiedPetition', false, '');
		lawerApeal.style.display = 'none';
		lawerApeal1.style.display = 'none';
		prosecutorApeal.style.display = 'table-row';
		prosecutorApeal1.style.display = 'table-row';
	}
	else {
		turnOff(['myonoffswitch10']);
        setData('osk', 'appealProsecutor', false, '');
        // Встановлює, що обрано ЗЗ у вигляді тримання під вартою
        setData('osk', 'satisfiedPetition', true, '');
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

/**
 * розрахунок відсотка кількості дій у нічний час
 */
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

/**
 * викликається в розділі припинення участі адвоката до завершення строку дії доручення
 * для виключення інших (крім вибраного) випадків припинення участі та заміни значення в data
 * @param n
 * @param stan
 */
function changeTerm(n, stan) {
	switch (n) {
		case 1:
            if(stan){
            	turnOff(['myonoffswitch1', 'myonoffswitch2']);
                setData('terminatePart', 'v2', false, '');
                setData('terminatePart', 'v3', false, '');
            	turnOn(['document1']);
                setData('documents', 'v1', true, '');
            	setData('terminatePart', 'v1', true, '');
            }else{
            	turnOff(['document1']);
                setData('documents', 'v1', false, '');
            	setData('terminatePart', 'v1', false, '');
            }
            break;
        case 2:
            if(stan){
                turnOff(['myonoffswitch', 'myonoffswitch2', 'document1']);
                setData('terminatePart', 'v1', false, '');
                setData('terminatePart', 'v3', false, '');
                setData('documents', 'v1', false, '');
                setData('terminatePart', 'v2', true, '');
            }else{
                setData('terminatePart', 'v2', false, '');
            }
            break;
        case 3:
            if(stan){
                turnOff(['myonoffswitch', 'myonoffswitch1', 'document1']);
                setData('terminatePart', 'v1', false, '');
                setData('terminatePart', 'v2', false, '');
                setData('documents', 'v1', false, '');
                setData('terminatePart', 'v3', true, '');
            }else{
                setData('terminatePart', 'v3', false, '');
            }
            break;
	}
}

/**
 * приймає число, перетворює на рядок і замінює крапки комами
 * @param num
 * @returns {string}
 */
function comma(num) {
	var numstr = num.toString();
	// замінюємо крапки в числах комами
    numstr = numstr.replace('.', ',');
    // ділимо на розряди
    numstr = numstr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	return (numstr);
}
