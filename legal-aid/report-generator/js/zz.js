var data = {
	commonData: {
        lawyerName: '________________________________________________',
        arrandDate: '__ __ / __ __ / __ __ __ __',
        arrandNum: '_____ – ________________',
        detaineeName: '______________________________________________________________',
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
	}},
	//розмір прожиткового мінімуму
	paymentPerHour: {v1: 1762, k: function() {
		return ((this.v1 * 0.025).toFixed(2));
	}},
	//строк подання акту
	termSubmission: {v1: 1, k: function() {
		return (this.v1);
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
        other: '', //інше
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
            data[attr][field] = value.replace('/-/g', '/');
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
    // alert(sum);
    makePDF();
    return false;
}

function makePDF() {
		var a = 14;
		var docDefinition = {
            pageMargins: [ 20, 10, 10, 11 ],
				content: [
                    {
                        fontSize: 9,
                        table: {
                            widths: [390, '*', '*', '*'],
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
                                        alignment: 'center',
										text: '\n' + data.numTrips.v1
									},
                                    {
                                        bold: true,

                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: '\nКвиїздів='
                                    },
                                    {
                                        bold: true,
                                        alignment: 'center',
                                        fillColor: '#d9d9d9',
                                        text: '\n' + comma(data.numTrips.k())
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
                                       	text: '- кількість дій, які повністю або частково припадають на: ' +
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

// потрібно прописувати
// розмір прожиткового мінімуму








                                ['Column 1', 'Column 2', 'Column 3', 'Column 4'],
                                ['One value goes here', 'Another one here', 'OK?', 'or NO?']
                            ]
                        }
                    },

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
	return (numstr.replace('.', ','));
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
