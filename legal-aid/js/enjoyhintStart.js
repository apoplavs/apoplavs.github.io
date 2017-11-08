/**
 * функція яка запускає сценарй підказок
 */
function enjoyhintStart() {
    $("head").append('<link href="js/enjoyhint-master/enjoyhint.css" rel="stylesheet">');
    $.getScript("js/enjoyhint-master/enjoyhint.min.js", function () {
            var hintInstance = new EnjoyHint();

            var hintSteps = [
                {
                    "next div.tab-container": '<h1>Вітаю</h2>' +
                        '<h4>Схоже Ви у нас вперше<h4/>'+
                    '<h4>бажаєте ознайомитися з функіоналом системи ?<h4>',
                    shape: 'rect',
                    bottom: 38,
                    nextButton: {text: 'TAK'},
                    skipButton: {text: 'HI'}
                },
                {
                    "next ul.tabs": 'тут знаходяться вкладки з основними можливостями системи',
                    shape: 'rect',
                    nextButton: {text: 'Далі'},
                    showSkip: false
                },
                {
                    "click ul.tabs>li:nth-child(3)": 'спробуйте натиснути на одну з них',
                    shape: 'rect',
                    bottom: 25,
                    left: 5,
                    right: 10,
                    showNext: false,
                    showSkip: false
                },
                {
                    "next tbody>tr>th": 'Ви можете створити звіт про надання адвокатом правової допомоги<br/>'+
                    'просто заповнивши дану форму',
                    shape: 'rect',
                    margin: 10,
                    nextButton: {text: 'Далі'},
                    showSkip: false
                },
                {
                    "next table.main-table>tbody:nth-child(1)>tr:nth-child(5)>td:nth-child(2)>input": 'для зручного заповнення полів з вибором дати або часу<br/>'+
                    'натисніть на поле мишкою, та виберіть необхідне значення використовуючи клавіші <img src="arrows.png" width="100px"><br/><br/><br/>',
                    shape: 'rect',
                    nextButton: {text: 'Далі'},
                    showSkip: false
                },
                {
                    "next table.main-table>tbody:nth-child(1)>tr:nth-child(25)>td:nth-child(2)>select": 'те ж саме можна робити з випадаючими списками.<br/>'+
                    'Перейти до наступного поля можна натиснувши <img src="keyTab.png" width="80px"><br/><br/>',
                    shape: 'rect',
                    nextButton: {text: 'Далі'},
                    showSkip: false
                },
                {
                    "next button.submit-button": 'після заповнення всіх необхідних полів натисніть сюди<br/>'+
                    'і звіт буде створений',
                    shape: 'rect',
                    margin: 15,
                    nextButton: {text: 'Далі'},
                    showSkip: false
                },
                {
                    "next body>footer>div>big": '<p align="left">щось працює неправильно;<br/>'+
                    'знайшли помилку;<br/>'+
                    'маєте пропозиції щодо вдосконалення сервісу;<br/>'+
                    'інші технічні питання;<br/>'+
                    'пишіть сюди.</p>',
                    shape: 'rect',
                    margin: 27,
                    nextButton: {text: 'ОК'},
                    showSkip: false
                }

            ];
            hintInstance.set(hintSteps);
            hintInstance.run();
    });
}


/**
 * встановлює cookie
 */
function setCookie() {
    // отримуємо поточну дату
    var date = new Date();

    // отримуємо поточний рік і добавляємо 1
    date = date.getFullYear() + 1;

    // встановлюємо час для cookie
    var exp = "expires=Thu, 01 Nov " + date.toString() + " 00:00:01 GMT";
document.cookie = "hint=1; " + exp;
}