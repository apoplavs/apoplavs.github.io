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
			return (this.satisfiedAppealLawer ? 3.5 : 2);
		}
		/* якщо подавалось клопотання про ЗЗ, воно НЕ було задоволено (обрано більш мякий ЗЗ)
		* i сторона обвинувачення не подавала апеляцію, або вона не була задоволена
		*/
		if (!this.satisfiedPetition && (!this.appealProsecutor
			|| (this.appealProsecutor && !this.satisfiedAppealProsecutor))) {
			return (5);
		}
		return (1);
	    },
        l: function() {
		    if (this.appealProsecutor) {
		        return (this.satisfiedAppealProsecutor ? 6 : 5);
            }
            if (this.appealLawer) {
                return (this.satisfiedAppealLawer ? 4 : 3);
            }
            if (this.takePetition) {
                return (this.satisfiedPetition ? 1 : 2);
            }
            return (0);

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
	meetings: {v1: '', v2: '', v3: '', v4: '', v5: '', v6: '', v7: '', v8: '', v9: '', v10: ''},
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
        v4: '', ds4: '', ts4: '', de4: '', te4: '',
        v5: '', ds5: '', ts5: '', de5: '', te5: '',
        v6: '', ds6: '', ts6: '', de6: '', te6: '',
        v7: '', ds7: '', ts7: '', de7: '', te7: '',
        v8: '', ds8: '', ts8: '', de8: '', te8: '',
        v9: '', ds9: '', ts9: '', de9: '', te9: '',
		v10: '', ds10: '', ts10: '', de10: '', te10: ''},
    //Складення процесуальних документів
    /* vN - Найменування процесуального документа;
    * dN  - дата реєстрації документа органом якому адресований документ;
    * tN  - час реєстрації документа органом якому адресований документ;
    */
    procDocs: {v1: '', d1: '', t1: '',
        v2: '', d2: '', t2: '',
        v3: '', d3: '', t3: '',
        v4: '', d4: '', t4: '',
        v5: '', d5: '', t5: '',
        v6: '', d6: '', t6: '',
        v7: '', d7: '', t7: '',
        v8: '', d8: '', t8: '',
        v9: '', d9: '', t9: '',
        v10: '', d10: '', t10: ''},
    //Перелік завірених адвокатом копій процесуальних та інших документів, що підтверджують наведені дані
    documents: {v1: false, //заява затриманого про відмову від захисника
		v2: true, //клопотання слідчого, прокурора про застосування запобіжного заходу
		v3: false, //повідомлення про підозру
		v4: false, //ухвала слідчого судді, суду про застосування запобіжного заходу
        v5: false, //апеляційна скарга захисника на ухвалу слідчого судді, суду про застосування запобіжного заходу
        v6: false, //заперечення на апеляційну скаргу прокурора на ухвалу слідчого судді, суду про застосування запобіжного заходу
        v7: false, //ухвала апеляційного суду за результатами розгляду апеляційної скарги прокурора/адвоката
        v8: false, //медична довідка, що підтверджує наявність у особи інфекційної хвороби
        v9: false, //скарга адвоката в порядку статті 206 КПК
        v10: false, //ухвала слідчого судді за результатами розгляду скарги адвоката в порядку статті 206 КПК
        other: '_______________________________________________________________________________________________________________', //інше
        sheets: 0 //Загальна кількість аркушів документів
	},
	sum: 0
};

// IN F
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

function makeReport() {
	console.log('(2 x ' + data.numTrips.k() + ' + ' + '2 x ' + data.specCategory.k() + ' x ' + data.numActs.k() + ' x ' +
        data.osk.k() + ' x ' + data.terminatePart.k() + ') x ' + data.paymentPerHour.k() + ' x ' + data.actsInNight.k() + ' x ' + data.termSubmission.k());
// розрахунок розміру винагороди
    data.sum = (2 * data.numTrips.k() + 2 * data.specCategory.k() * data.numActs.k() * data.osk.k() * data.terminatePart.k())
		* data.paymentPerHour.k() * data.actsInNight.k() * data.termSubmission.k();
    // костиль щоб заокруглювало як і exel
    data.sum += 0.0004;
    data.sum = data.sum.toFixed(2);
    // console.log(encodeURIComponent('https://image.freepik.com/free-icon/no-translate-detected_318-76970.jpg'));
    makePDF();
    return false;
}

function makePDF() {
		var a = 14;
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
                                    text: 'Розмір винагороди адвоката за надання БВПД (обрати)\n' +
                                    '[ЗЗ] особі, яка відповідно до положень кримінального процесуального законодавства вважається затриманою\n' +
                                    'та / або стосовно якої обрано запобіжний захід у вигляді тримання під вартою'
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
                                                bold: false,
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
                                                bold: false,
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
                                                bold: false,
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
                                                bold: false,
                                                text: ' - адвокат припинив надання БВПД до завершення строку дії доручення '
                                            },
                                            {
                                                bold: true,
                                                text: 'в інший час після конфіденційного побачення '
                                            },
                                            {
                                                bold: false,
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
                                                bold: false,
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
                                                bold: false,
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
                                        text: '6. Обрання затриманій особі запобіжного заходу (ЗЗ) у вигляді тримання під вартою:'
                                    },
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, true, true, false],
                                        text: ''
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
                                    }
                                ],

                                [
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, false, true, false],
                                       	text: 'А. Чи подавалося слідчим / прокурором клопотання '+
										'про обрання затриманій особі ЗЗ у вигляді тримання під вартою?'
                                    },
                                    {
                                        fillColor: '#dbe6c4',
                                        border: [true, true, true, false],
                                        alignment: 'center',
                                        margin: [0, 5, 0, 5],
                                        text: (data.osk.takePetition ? 'так' : 'ні')
                                    },
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, false, true, false],
                                        text: ''
                                    },
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, false, true, false],
                                        text: ''
                                    }
                                ],

                                [
                                    {
                                        fillColor: '#ffffff',
                                        border: [true, false, true, false],
                                        italics: true,
                                        text: 'Яке рішення прийняв суд за підсумками розгляду такого клопотання?'
                                    },
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, true, true, false],
                                        text: ''
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

                                [
                                    {
                                        fillColor: '#dbe6c4',
                                        border: [true, false, true, false],
                                        text: (data.osk.satisfiedPetition ? 'обрано ЗЗ у вигляді тримання під вартою' : 'обрано більш м’який ЗЗ або постановлено ухвалу про відмову в застосуванні ЗЗ')
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
                                    },
                                    {
                                        border: [true, false, true, false],
                                        fillColor: '#d9d9d9',
                                        text: ''
                                    }
                                ],

                                [
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, true, true, false],
                                        text: 'Б. Чи подавали Ви апеляційну скаргу адвоката на судове рішення '+
                                        'про обрання ЗЗ у вигляді тримання під вартою?'
                                    },
                                    {
                                        fillColor: '#dbe6c4',
                                        border: [true, true, true, false],
                                        alignment: 'center',
                                        margin: [0, 5, 0, 5],
                                        text: (data.osk.appealLawer ? 'так' : 'ні')
                                    },
                                    {
                                        bold: true,
                                        border: [true, false, true, false],
                                        margin: [0, 5, 0, 5],
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: 'Коск ='
                                    },
                                    {
                                        bold: true,
                                        border: [true, false, true, false],
                                        margin: [0, 5, 0, 5],
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: comma(data.osk.k())
                                    }
                                ],

                                [
                                    {
                                        fillColor: '#ffffff',
                                        border: [true, false, true, false],
                                        italics: true,
                                        text: 'Яке рішення прийняв суд за результатами розгляду такої апеляційної скарги?'
                                    },
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, true, true, false],
                                        text: ''
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

                                [
                                    {
                                        fillColor: '#dbe6c4',
                                        border: [true, false, true, false],
                                        text: (data.osk.satisfiedAppealLawer ? 'ЗЗ у вигляді тримання під вартою змінено на більш м\'який' : 'ЗЗ у вигляді тримання під вартою залишено без змін')
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
                                    },
                                    {
                                        border: [true, false, true, false],
                                        fillColor: '#d9d9d9',
                                        text: ''
                                    }
                                ],

                                [
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, true, true, false],
                                        text: 'В. Чи подавала сторона обвинувачення апеляційну скаргу на судове рішення '+
										'про обрання ЗЗ більш м’якого, ніж тримання під вартою, або ухвалу про відмову '+
										'в застосуванні ЗЗ?'
                                    },
                                    {
                                        fillColor: '#dbe6c4',
                                        border: [true, true, true, false],
                                        alignment: 'center',
                                        margin: [0, 5, 0, 5],
                                        text: (data.osk.appealProsecutor ? 'так' : 'ні')
                                    },
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, false, true, false],
                                        text: ''
                                    },
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, false, true, false],
                                        text: ''
                                    }
                                ],

                                [
                                    {
                                        fillColor: '#ffffff',
                                        border: [true, false, true, false],
                                        italics: true,
                                        text: 'Яке рішення прийняв суд за результатами розгляду такої апеляційної скарги?'
                                    },
                                    {
                                        fillColor: '#d9d9d9',
                                        border: [true, true, true, false],
                                        text: ''
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

                                [
                                    {
                                        fillColor: '#dbe6c4',
                                        border: [true, false, true, false],
                                        text: (data.osk.satisfiedAppealProsecutor ? 'обрано ЗЗ у вигляді тримання під вартою' : 'ЗЗ чи ухвалу про відмову в застосуванні ЗЗ залишено без змін')
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
                                    },
                                    {
                                        border: [true, false, true, false],
                                        fillColor: '#d9d9d9',
                                        text: ''
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
                                                bold: false,
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
                                                bold: false,
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
                                         margin: [2, 2, 2, 7],
                                         text: 'ЗЗ'
                                     }]]}
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''
                                    },
                                    {
                                        border: [false, false, false, false],
                                        fontSize: 8,
                                        text: 'Додаток 2\n'+
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
                                bold: false,
                                text: 'особі, яка відповідно до положень кримінального процесуального законодавства вважається затриманою та/або стосовно якої\n'+
                                    'обрано запобіжний захід у вигляді тримання під вартою (ЗЗ)\n \n'
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
                                bold: false,
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
                                bold: false,
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
                                bold: false,
                                text: data.commonData.detaineeName + '          ' + data.commonData.detaineeDate
                            }]
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
                                bold: false,
                                fontSize: 9,
                                text: '(відмітити потрібне):'
                            }]
                    },
                    {
                        table: {
                            widths: [4, 520],
                            body: [[{
                                border: [true, true, true, true],
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
                                border: [true, true, true, true],
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
                                border: [true, true, true, true],
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
                                border: [true, true, true, true],
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
                                bold: false,
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
                        bold: false,
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
                                        text: '6'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.meetings.v6
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
                                        text: '7'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.meetings.v7
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '3'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.meetings.v3
                                    },
                                    {
                                        alignment: 'center',
                                        text: '8'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.meetings.v8
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '4'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.meetings.v4
                                    },
                                    {
                                        alignment: 'center',
                                        text: '9'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.meetings.v9
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '5'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.meetings.v5
                                    },
                                    {
                                        alignment: 'center',
                                        text: '10'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.meetings.v10
                                    }
                                ]
                            ]}

                    },

//           Б. Участь у процесуальних діях

                    {
                        bold: false,
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
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '5'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.v5
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.ds5 + '      ' + data.procActions.ts5 + (data.procActions.ds5 != '' ? ' - ' : '') +
                                        (data.procActions.ds5 == data.procActions.de5 ? '' : '\n' + data.procActions.de5 + '    ') + data.procActions.te5
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '6'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.v6
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.ds6 + '      ' + data.procActions.ts6 + (data.procActions.ds6 != '' ? ' - ' : '') +
                                        (data.procActions.ds6 == data.procActions.de6 ? '' : '\n' + data.procActions.de6 + '    ') + data.procActions.te6
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '7'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.v7
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.ds7 + '      ' + data.procActions.ts7 + (data.procActions.ds7 != '' ? ' - ' : '') +
                                        (data.procActions.ds7 == data.procActions.de7 ? '' : '\n' + data.procActions.de7 + '    ') + data.procActions.te7
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '8'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.v8
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.ds8 + '      ' + data.procActions.ts8 + (data.procActions.ds8 != '' ? ' - ' : '') +
                                        (data.procActions.ds8 == data.procActions.de8 ? '' : '\n' + data.procActions.de8 + '    ') + data.procActions.te8
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '9'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.v9
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.ds9 + '      ' + data.procActions.ts9 + (data.procActions.ds9 != '' ? ' - ' : '') +
                                        (data.procActions.ds9 == data.procActions.de9 ? '' : '\n' + data.procActions.de9 + '    ') + data.procActions.te9
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '10'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.v10
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procActions.ds10 + '      ' + data.procActions.ts10 + (data.procActions.ds10 != '' ? ' - ' : '') +
                                        (data.procActions.ds10 == data.procActions.de10 ? '' : '\n' + data.procActions.de10 + '    ') + data.procActions.te10
                                    }
                          	    ]
                            ]}
                    },

//           В. Складання процесуальних документів

                    {
                        bold: false,
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
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '5'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.v5
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.d5 + '      ' + data.procDocs.t5
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '6'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.v6
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.d6 + '      ' + data.procDocs.t6
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '7'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.v7
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.d7 + '      ' + data.procDocs.t7
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '8'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.v8
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.d8 + '      ' + data.procDocs.t8
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '9'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.v9
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.d9 + '      ' + data.procDocs.t9
                                    }
                                ],
                                [
                                    {
                                        alignment: 'center',
                                        text: '10'
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.v10
                                    },
                                    {
                                        alignment: 'center',
                                        text: data.procDocs.d10 + '      ' + data.procDocs.t10
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
                                text: '\n2.4. Оскарження адвокатом рішення щодо обрання особі запобіжного заходу у вигляді тримання під вартою (К'
                            },
                            {
                                bold: true,
                                fontSize: 6,
                                text: 'оск'
                            },
                            {
                                bold: true,
                                fontSize: 9,
                                text: ') '
                            },
                            {
                                bold: false,
                                fontSize: 9,
                                text: '(відмітити потрібне):'
                            }]
                    },

                    {
                        fontSize: 8.5,
                        table: {
                            widths: [230, 305],
                            body: [[
                                {
                                    bold: true,
                                    fontSize: 9,
                                    alignment: 'center',
                                    text: 'Процесуальна дія'
                                },
                                {
                                    bold: true,
                                    alignment: 'center',
                                    text: [
				                            {
				                                bold: true,
                                                fontSize: 9,
				                                text: 'Результат '
				                            },
				                            {
				                                bold: false,
                                                fontSize: 8,
				                                italics: true,
				                                text: '(одна відмітка за результатом останньої процесуальної дії)'
				                            }]
                                }
                            ],
                            [
                                {
                                    margin: [10, 0, 0, 0],
                                    colSpan: 2,
                                     table: {
			                            widths: [4, 515],
			                            body: [
			                            [
			                            	{
			                                border: [true, true, true, true],
			                                margin: [-2, -5, -2, -6],
			                                fontSize: 14,
			                                bold: true,
			                                // одна відмітка за результатом останньої процесуальної дії
			                                text: (data.osk.l() == 0 ? 'X' : '')
			                            	},
			                                {
			                                    border: [false, false, false, false],
                                                margin: [0, -2, 0, -2],
			                                    text: 'клопотання слідчого, прокурора про обрання затриманій особі запобіжного заходу не подавалося або стосувалося більш'
			                                }
			                            ],
			                            [{
			                            	colSpan: 2,
			                            	border: [false, false, false, false],
                                            alignment: 'left',
			                                text: 'м’якого запобіжного заходу, ніж тримання під вартою'
			                            },
			                            {}]]}
                                },
                                {}
                            ],
                            [
                                {
                                    text: 'Розгляд клопотання слідчого, прокурора про обрання затриманій особі запобіжного заходу у вигляді тримання під вартою'
                                },
                                {
                                    table: {
                                        widths: [3, 280],
                                        body: [
                                            [
                                                {
                                                    border: [true, true, true, true],
                                                    margin: [-3, -5, -3, -6],
                                                    fontSize: 14,
                                                    bold: true,
                                                    // одна відмітка за результатом останньої процесуальної дії ЗРОБИТИ ФУНКЦІЮ В data
                                                    text: (data.osk.l() == 1 ? 'X' : '')
                                                },
                                                {
                                                    border: [false, false, false, false],
                                                    margin: [0, -2, -5, -2],
                                                    text: 'обрано запобіжний захід у вигляді тримання під вартою'
                                                }
                                            ],
                                            [
                                                {
                                                    colSpan: 2,
                                                    border: [false, false, false, false],
                                                    text: ''
                                                },
                                                {}
                                            ],
                                            [
                                                {
                                                    border: [true, true, true, true],
                                                    margin: [-3, -5, -3, -6],
                                                    fontSize: 14,
                                                    bold: true,
                                                    // одна відмітка за результатом останньої процесуальної дії ЗРОБИТИ ФУНКЦІЮ В data
                                                    text: (data.osk.l() == 2 ? 'X' : '')
                                                },
                                                {
                                                    border: [false, false, false, false],
                                                    margin: [0, -2, -5, -2],
                                                    text: 'обрано більш м’який запобіжний захід або постановлено ухвалу про'
                                                }
                                            ],
                                            [{
                                                colSpan: 2,
                                                border: [false, false, false, false],
                                                margin: [0, -1, -5, -1],
                                                alignment: 'left',
                                                text: 'відмову в застосуванні запобіжного заходу'
                                            },
                                                {}]]
                                    }
                                }
                            ],
                                [
                                    {
                                        text: 'Розгляд апеляційної скарги адвоката на судове рішення про обрання запобіжного заходу у вигляді тримання під вартою'
                                    },
                                    {
                                        table: {
                                            widths: [4, 280],
                                            body: [
                                                [
                                                    {
                                                        border: [true, true, true, true],
                                                        margin: [-3, -5, -3, -6],
                                                        fontSize: 14,
                                                        bold: true,
                                                        // одна відмітка за результатом останньої процесуальної дії ЗРОБИТИ ФУНКЦІЮ В data
                                                        text: (data.osk.l() == 3 ? 'X' : '')
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        margin: [0, -2, -5, -2],
                                                        text: 'запобіжний захід у вигляді тримання під вартою залишено без змін'
                                                    }
                                                ],
                                                [
                                                    {
                                                        colSpan: 2,
                                                        border: [false, false, false, false],
                                                        text: ''
                                                    },
                                                    {}
                                                ],
                                                [
                                                    {
                                                        border: [true, true, true, true],
                                                        margin: [-3, -5, -3, -6],
                                                        fontSize: 14,
                                                        bold: true,
                                                        // одна відмітка за результатом останньої процесуальної дії ЗРОБИТИ ФУНКЦІЮ В data
                                                        text: (data.osk.l() == 4 ? 'X' : '')
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        margin: [0, -2, -5, -2],
                                                        text: 'запобіжний захід у вигляді тримання під вартою змінено на більш '
                                                    }
                                                ],
                                                [{
                                                    colSpan: 2,
                                                    border: [false, false, false, false],
                                                    alignment: 'left',
                                                    text: 'м’який'
                                                },
                                                    {}]]
                                        }
                                    }
                                ],
                                [
                                    {
                                        fontSize: 8.5,
                                        text: 'Розгляд апеляційної скарги сторони обвинувачення на судове рішення про обрання запобіжного заходу більш м’якого, ніж тримання під вартою, або ухвалу про відмову в застосуванні запобіжного заходу'
                                    },
                                    {
                                        table: {
                                            widths: [4, 280],
                                            body: [
                                                [
                                                    {
                                                        border: [true, true, true, true],
                                                        margin: [-3, -5, -3, -6],
                                                        fontSize: 14,
                                                        bold: true,
                                                        // одна відмітка за результатом останньої процесуальної дії ЗРОБИТИ ФУНКЦІЮ В data
                                                        text: (data.osk.l() == 5 ? 'X' : '')
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        margin: [0, -2, -5, -2],
                                                        text: 'запобіжний захід чи ухвалу про відмову в застосуванні запобіжного'
                                                    }
                                                ],
                                                [{
                                                    colSpan: 2,
                                                    border: [false, false, false, false],
                                                    alignment: 'left',
                                                    text: 'заходу залишено без змін'
                                                },{}],
                                                [
                                                    {
                                                        border: [true, true, true, true],
                                                        margin: [-3, -5, -3, -6],
                                                        fontSize: 14,
                                                        bold: true,
                                                        // одна відмітка за результатом останньої процесуальної дії ЗРОБИТИ ФУНКЦІЮ В data
                                                        text: (data.osk.l() == 6 ? 'X' : '')
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        margin: [0, -2, -5, -2],
                                                        text: 'обрано запобіжний захід у вигляді тримання під вартою'
                                                    }
                                                ]]
                                        }
                                    }
                                ]
                         ]}
                    },
                    {
                        text: [
                            {
                                bold: true,
                                fontSize: 9,
                                text: '\n2.5. Припинення участі адвоката до завершення строку дії доручення для надання БВПД (К'
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
                                bold: false,
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
                                        border: [true, true, true, true],
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
                                    alignment: 'left',
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
                                        border: [true, true, true, true],
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
                                    alignment: 'left',
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
                                        border: [true, true, true, true],
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
                                    alignment: 'left',
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
                                bold: false,
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
                                bold: false,
                                fontSize: 9,
                                text: '(відмітити потрібне):'
                            }]
                    },
                    {
                        table: {
                            widths: [4, 50, 4, 80, 4, 80, 4, 80, 4, 80],
                            body: [
                                [{
                                border: [true, true, true, true],
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
                                    border: [true, true, true, true],
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
                                    border: [true, true, true, true],
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
                                    border: [true, true, true, true],
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
                                    border: [true, true, true, true],
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
                                bold: false,
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
                                bold: false,
                                fontSize: 9,
                                text: '(відмітити потрібне):'
                            }]
                    },
                    {
                        table: {
                            widths: [4, 70, 4, 85, 4, 85, 4, 85, 4, 85],
                            body: [
                                [{
                                    border: [true, true, true, true],
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
                                        border: [true, true, true, true],
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
                                        border: [true, true, true, true],
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
                                        border: [true, true, true, true],
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
                                        border: [true, true, true, true],
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
                    {
                        fontSize: 4,
                        text: '\n'

                    },

 // 3. ПЕРЕЛІК ЗАВІРЕНИХ АДВОКАТОМ КОПІЙ ПРОЦЕСУАЛЬНИХ ТА ІНШИХ ДОКУМЕНТІВ

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
                                        bold: false,
                                        fontSize: 9,
                                        text: '(відмітити потрібне) (додаються на '
                                    },
                                    {
                                        bold: false,
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
                            widths: [4, 200, 4, 310],
                            body: [
                                [{
                                    border: [true, true, true, true],
                                    margin: [-2, -5, -2, -5],
                                    fontSize: 14,
                                    bold: true,
                                    text: (data.documents.v1 ? 'X' : '')
                                },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: 'заява затриманого про відмову від захисника;'
                                    },
                                    {
                                        border: [true, true, true, true],
                                        margin: [-2, -5, -2, -5],
                                        fontSize: 14,
                                        bold: true,
                                        text: (data.documents.v2 ? 'X' : '')
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: 'клопотання слідчого, прокурора про застосування запобіжного заходу;'
                                    }
                                    ]
                            ]}
                        },
                    {
                        fontSize: 2,
                        text: '\n'

                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [4, 120, 4, 300],
                            body: [
                                [{
                                    border: [true, true, true, true],
                                    margin: [-2, -5, -2, -5],
                                    fontSize: 14,
                                    bold: true,
                                    text: (data.documents.v3 ? 'X' : '')
                                },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: 'повідомлення про підозру;'
                                    },
                                    {
                                        border: [true, true, true, true],
                                        margin: [-2, -5, -2, -5],
                                        fontSize: 14,
                                        bold: true,
                                        text: (data.documents.v4 ? 'X' : '')
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: 'ухвала слідчого судді, суду про застосування запобіжного заходу;'
                                    }
                                ]
                            ]}
                    },
                    {
                        fontSize: 2,
                        text: '\n'

                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [4, 500],
                            body: [
                                [{
                                    border: [true, true, true, true],
                                    margin: [-2, -5, -2, -5],
                                    fontSize: 14,
                                    bold: true,
                                    text: (data.documents.v5 ? 'X' : '')
                                },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: 'апеляційна скарга захисника на ухвалу слідчого судді, суду про застосування запобіжного заходу;'
                                    }
                                ]
                            ]}
                    },
                    {
                        fontSize: 2,
                        text: '\n'

                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [4, 500],
                            body: [
                                [{
                                    border: [true, true, true, true],
                                    margin: [-2, -5, -2, -5],
                                    fontSize: 14,
                                    bold: true,
                                    text: (data.documents.v6 ? 'X' : '')
                                },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: 'заперечення на апеляційну скаргу прокурора на ухвалу слідчого судді, суду про застосування запобіжного заходу;'
                                    }
                                ]
                            ]}
                    },
                    {
                        fontSize: 2,
                        text: '\n'

                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [4, 500],
                            body: [
                                [{
                                    border: [true, true, true, true],
                                    margin: [-2, -5, -2, -5],
                                    fontSize: 14,
                                    bold: true,
                                    text: (data.documents.v7 ? 'X' : '')
                                },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: 'ухвала апеляційного суду за результатами розгляду апеляційної скарги прокурора/адвоката;'
                                    }
                                ]
                            ]}
                    },
                    {
                        fontSize: 2,
                        text: '\n'

                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [4, 315, 4, 190],
                            body: [
                                [{
                                    border: [true, true, true, true],
                                    margin: [-2, -5, -2, -5],
                                    fontSize: 14,
                                    bold: true,
                                    text: (data.documents.v8 ? 'X' : '')
                                },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: 'медична довідка, що підтверджує наявність у особи інфекційної хвороби;'
                                    },
                                    {
                                        border: [true, true, true, true],
                                        margin: [-2, -5, -2, -5],
                                        fontSize: 14,
                                        bold: true,
                                        text: (data.documents.v9 ? 'X' : '')
                                    },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: 'скарга адвоката в порядку статті 206 КПК;'
                                    }
                                ]
                            ]}
                    },
                    {
                        fontSize: 2,
                        text: '\n'

                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [4, 500],
                            body: [
                                [{
                                    border: [true, true, true, true],
                                    margin: [-2, -5, -2, -5],
                                    fontSize: 14,
                                    bold: true,
                                    text: (data.documents.v10 ? 'X' : '')
                                },
                                    {
                                        border: [false, false, false, false],
                                        margin: [0, -2, 0, -2],
                                        text: 'ухвала слідчого судді за результатами розгляду скарги адвоката в порядку статті 206 КПК'
                                    }
                                ]
                            ]}
                    },
                    {
                        fontSize: 2,
                        text: '\n'

                    },
                    {
                        fontSize: 9,
                        table: {
                            widths: [4, 530],
                            body: [
                                [{
                                    border: [true, true, true, true],
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
                                    margin: [-4, -1, -4, 0],
                                    italics: true,
                                    fontSize: 11,
                                    text: '_' + comma(data.osk.k()) + '_'

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
                                        text: '(підпис адвоката)'
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
	var next_row = element.parentElement.parentElement.nextElementSibling;
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
    numstr = numstr.replace('.', ',')
    // ділимо на розряди
    numstr = numstr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	return (numstr);
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
