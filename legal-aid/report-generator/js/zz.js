function button1() {
		window.open('rest.html');
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

function buttonEnter() {
		var area = document.getElementById('area');
		var part = document.getElementById('part');
		var article = document.getElementById('article');
		var count1 = document.getElementById('count-1');
		var count2 = document.getElementById('count-2');
		var count3 = document.getElementById('count-3');
		var count4 = document.getElementById('count-4');
		var count5 = document.getElementById('count-5');

		if (part.value == '' || article.value == '') {
				alert('поля не заповнені');
				return;
		}

		var article_val = parseInt(article.value.replace(/-/g, ''));
		var part_val = parseInt(part.value);

		if (part_val == 1 && article_val == 118 || part_val == 1 && article_val == 123 || part_val == 1 && article_val == 124 || part_val == 1 && article_val == 125 || part_val == 2 && article_val == 125 || part_val == 1 && article_val == 126 || part_val == 1 && article_val == 128 || part_val == 1 && article_val == 129 || part_val == 1 && article_val == 132 || part_val == 1 && article_val == 133 || part_val == 1 && article_val == 134 || part_val == 1 && article_val == 135 || part_val == 1 && article_val == 136 || part_val == 2 && article_val == 136 || part_val == 1 && article_val == 139 || part_val == 1 && article_val == 140 || part_val == 1 && article_val == 142 || part_val == 1 && article_val == 143 || part_val == 1 && article_val == 144 || part_val == 1 && article_val == 145 || part_val == 1 && article_val == 150 || part_val == 1 && article_val == 151 || part_val == 1 && article_val == 154 || part_val == 2 && article_val == 154 || part_val == 1 && article_val == 1581 || part_val == 1 && article_val == 159 || part_val == 1 && article_val == 160 || part_val == 1 && article_val == 161 || part_val == 1 && article_val == 162 || part_val == 1 && article_val == 163 || part_val == 1 && article_val == 164 || part_val == 2 && article_val == 164 || part_val == 1 && article_val == 165 || part_val == 2 && article_val == 165 || part_val == 1 && article_val == 168 || part_val == 1 && article_val == 170 || part_val == 1 && article_val == 171 || part_val == 2 && article_val == 171 || part_val == 1 && article_val == 172 || part_val == 1 && article_val == 173 || part_val == 2 && article_val == 173 || part_val == 1 && article_val == 174 || part_val == 1 && article_val == 175 || part_val == 1 && article_val == 176 || part_val == 1 && article_val == 177 || part_val == 1 && article_val == 180 || part_val == 2 && article_val == 180 || part_val == 1 && article_val == 182 || part_val == 1 && article_val == 183 || part_val == 1 && article_val == 184 || part_val == 2 && article_val == 184 || part_val == 1 && article_val == 1881 || part_val == 1 && article_val == 190 || part_val == 1 && article_val == 192 || part_val == 2 && article_val == 192 || part_val == 1 && article_val == 193 || part_val == 1 && article_val == 195 || part_val == 1 && article_val == 197 || part_val == 1 && article_val == 1971 || part_val == 2 && article_val == 1971 || part_val == 3 && article_val == 1971 || part_val == 1 && article_val == 204 || part_val == 1 && article_val == 205 || part_val == 1 && article_val == 2051 || part_val == 2 && article_val == 2051 || part_val == 1 && article_val == 206 || part_val == 1 && article_val == 2091 || part_val == 1 && article_val == 210 || part_val == 1 && article_val == 212 || part_val == 2 && article_val == 212 || part_val == 1 && article_val == 2121 || part_val == 2 && article_val == 2121 || part_val == 1 && article_val == 213 || part_val == 1 && article_val == 216 || part_val == 1 && article_val == 219 || part_val == 1 && article_val == 2201 || part_val == 2 && article_val == 2201 || part_val == 3 && article_val == 2201 || part_val == 1 && article_val == 2202 || part_val == 1 && article_val == 222 || part_val == 1 && article_val == 2231 || part_val == 1 && article_val == 224 || part_val == 1 && article_val == 227 || part_val == 1 && article_val == 229 || part_val == 1 && article_val == 232 || part_val == 1 && article_val == 2321 || part_val == 1 && article_val == 2322 || part_val == 2 && article_val == 2322 || part_val == 1 && article_val == 238 || part_val == 1 && article_val == 239 || part_val == 1 && article_val == 2391 || part_val == 1 && article_val == 2392 || part_val == 1 && article_val == 240 || part_val == 1 && article_val == 241 || part_val == 1 && article_val == 242 || part_val == 3 && article_val == 243 || part_val == 1 && article_val == 244 || part_val == 2 && article_val == 244 || part_val == 1 && article_val == 247 || part_val == 1 && article_val == 248 || part_val == 1 && article_val == 249 || part_val == 1 && article_val == 252 || part_val == 1 && article_val == 253 || part_val == 1 && article_val == 254 || part_val == 1 && article_val == 268 || part_val == 1 && article_val == 269 || part_val == 1 && article_val == 270 || part_val == 1 && article_val == 271 || part_val == 1 && article_val == 272 || part_val == 1 && article_val == 275 || part_val == 1 && article_val == 276 || part_val == 1 && article_val == 279 || part_val == 1 && article_val == 280 || part_val == 1 && article_val == 281 || part_val == 1 && article_val == 282 || part_val == 1 && article_val == 283 || part_val == 1 && article_val == 284 || part_val == 1 && article_val == 285 || part_val == 1 && article_val == 286 || part_val == 1 && article_val == 290 || part_val == 1 && article_val == 293 || part_val == 1 && article_val == 295 || part_val == 1 && article_val == 296 || part_val == 1 && article_val == 298 || part_val == 1 && article_val == 2981 || part_val == 1 && article_val == 299 || part_val == 2 && article_val == 299 || part_val == 1 && article_val == 300 || part_val == 2 && article_val == 300 || part_val == 1 && article_val == 301 || part_val == 1 && article_val == 302 || part_val == 1 && article_val == 310 || part_val == 1 && article_val == 311 || part_val == 1 && article_val == 313 || part_val == 1 && article_val == 318 || part_val == 1 && article_val == 319 || part_val == 1 && article_val == 323 || part_val == 2 && article_val == 323 || part_val == 1 && article_val == 325 || part_val == 1 && article_val == 326 || part_val == 1 && article_val == 327 || part_val == 1 && article_val == 335 || part_val == 1 && article_val == 337 || part_val == 2 && article_val == 337 || part_val == 2 && article_val == 338 || part_val == 1 && article_val == 339 || part_val == 1 && article_val == 342 || part_val == 2 && article_val == 342 || part_val == 1 && article_val == 343 || part_val == 2 && article_val == 343 || part_val == 1 && article_val == 344 || part_val == 1 && article_val == 347 || part_val == 1 && article_val == 3471 || part_val == 1 && article_val == 350 || part_val == 1 && article_val == 351 || part_val == 2 && article_val == 351 || part_val == 1 && article_val == 3511 || part_val == 1 && article_val == 353 || part_val == 1 && article_val == 354 || part_val == 3 && article_val == 354 || part_val == 1 && article_val == 355 || part_val == 1 && article_val == 356 || part_val == 1 && article_val == 357 || part_val == 3 && article_val == 357 || part_val == 1 && article_val == 358 || part_val == 2 && article_val == 358 || part_val == 4 && article_val == 358 || part_val == 1 && article_val == 360 || part_val == 1 && article_val == 3611 || part_val == 1 && article_val == 3612 || part_val == 1 && article_val == 362 || part_val == 1 && article_val == 363 || part_val == 1 && article_val == 3631 || part_val == 1 && article_val == 3641 || part_val == 1 && article_val == 3652 || part_val == 2 && article_val == 3652 || part_val == 1 && article_val == 366 || part_val == 1 && article_val == 3661 || part_val == 1 && article_val == 367 || part_val == 1 && article_val == 3682 || part_val == 1 && article_val == 3683 || part_val == 1 && article_val == 3684 || part_val == 1 && article_val == 3692 || part_val == 1 && article_val == 371 || part_val == 1 && article_val == 374 || part_val == 1 && article_val == 376 || part_val == 1 && article_val == 381 || part_val == 1 && article_val == 383 || part_val == 1 && article_val == 384 || part_val == 1 && article_val == 385 || part_val == 1 && article_val == 386 || part_val == 1 && article_val == 387 || part_val == 2 && article_val == 387 || part_val == 1 && article_val == 388 || part_val == 1 && article_val == 389 || part_val == 2 && article_val == 389 || part_val == 1 && article_val == 3891 || part_val == 2 && article_val == 390 || part_val == 1 && article_val == 394 || part_val == 1 && article_val == 395 || part_val == 1 && article_val == 397 || part_val == 2 && article_val == 397 || part_val == 1 && article_val == 403 || part_val == 1 && article_val == 405 || part_val == 1 && article_val == 409 || part_val == 1 && article_val == 412 || part_val == 1 && article_val == 413 || part_val == 1 && article_val == 435 || part_val == 2 && article_val == 435 || part_val == 2 && article_val == 444 || part_val == 1 && article_val == 445) {
				count1.innerHTML++;
				area.innerHTML += 'ч. ' + part.value + ' ст. ' + article.value + ' ККУ - злочин невеликої тяжкості\n';

		} else if (part_val == 2 && article_val == 109 || part_val == 3 && article_val == 109 || part_val == 1 && article_val == 110 || part_val == 1 && article_val == 1102 || part_val == 1 && article_val == 116 || part_val == 1 && article_val == 117 || part_val == 1 && article_val == 119 || part_val == 1 && article_val == 120 || part_val == 2 && article_val == 120 || part_val == 1 && article_val == 122 || part_val == 2 && article_val == 122 || part_val == 2 && article_val == 126 || part_val == 1 && article_val == 127 || part_val == 2 && article_val == 129 || part_val == 1 && article_val == 130 || part_val == 2 && article_val == 130 || part_val == 1 && article_val == 131 || part_val == 2 && article_val == 133 || part_val == 3 && article_val == 133 || part_val == 2 && article_val == 134 || part_val == 2 && article_val == 135 || part_val == 3 && article_val == 136 || part_val == 1 && article_val == 137 || part_val == 2 && article_val == 137 || part_val == 1 && article_val == 138 || part_val == 2 && article_val == 139 || part_val == 2 && article_val == 140 || part_val == 1 && article_val == 141 || part_val == 2 && article_val == 142 || part_val == 2 && article_val == 143 || part_val == 3 && article_val == 143 || part_val == 4 && article_val == 143 || part_val == 2 && article_val == 144 || part_val == 3 && article_val == 144 || part_val == 1 && article_val == 146 || part_val == 2 && article_val == 146 || part_val == 1 && article_val == 148 || part_val == 2 && article_val == 150 || part_val == 1 && article_val == 1501 || part_val == 2 && article_val == 151 || part_val == 1 && article_val == 152 || part_val == 1 && article_val == 153 || part_val == 1 && article_val == 155 || part_val == 1 && article_val == 156 || part_val == 1 && article_val == 157 || part_val == 2 && article_val == 157 || part_val == 1 && article_val == 158 || part_val == 1 && article_val == 1582 || part_val == 2 && article_val == 1582 || part_val == 2 && article_val == 159 || part_val == 1 && article_val == 1591 || part_val == 2 && article_val == 1591 || part_val == 2 && article_val == 160 || part_val == 3 && article_val == 160 || part_val == 2 && article_val == 161 || part_val == 2 && article_val == 162 || part_val == 1 && article_val == 166 || part_val == 1 && article_val == 167 || part_val == 2 && article_val == 168 || part_val == 1 && article_val == 169 || part_val == 2 && article_val == 169 || part_val == 2 && article_val == 172 || part_val == 2 && article_val == 175 || part_val == 2 && article_val == 176 || part_val == 2 && article_val == 177 || part_val == 1 && article_val == 178 || part_val == 1 && article_val == 179 || part_val == 1 && article_val == 181 || part_val == 2 && article_val == 181 || part_val == 2 && article_val == 182 || part_val == 2 && article_val == 183 || part_val == 1 && article_val == 185 || part_val == 2 && article_val == 185 || part_val == 1 && article_val == 186 || part_val == 2 && article_val == 1881 || part_val == 1 && article_val == 189 || part_val == 2 && article_val == 190 || part_val == 1 && article_val == 191 || part_val == 2 && article_val == 191 || part_val == 1 && article_val == 194 || part_val == 1 && article_val == 1941 || part_val == 1 && article_val == 196 || part_val == 4 && article_val == 1971 || part_val == 1 && article_val == 198 || part_val == 1 && article_val == 200 || part_val == 2 && article_val == 200 || part_val == 1 && article_val == 2031 || part_val == 2 && article_val == 2031 || part_val == 2 && article_val == 204 || part_val == 2 && article_val == 205 || part_val == 2 && article_val == 206 || part_val == 1 && article_val == 2062 || part_val == 2 && article_val == 2062 || part_val == 2 && article_val == 2091 || part_val == 1 && article_val == 211 || part_val == 2 && article_val == 213 || part_val == 2 && article_val == 216 || part_val == 1 && article_val == 2181 || part_val == 4 && article_val == 2201 || part_val == 2 && article_val == 222 || part_val == 1 && article_val == 2221 || part_val == 2 && article_val == 2221 || part_val == 1 && article_val == 2232 || part_val == 2 && article_val == 224 || part_val == 2 && article_val == 229 || part_val == 1 && article_val == 231 || part_val == 2 && article_val == 2321 || part_val == 3 && article_val == 2321 || part_val == 4 && article_val == 2321 || part_val == 1 && article_val == 233 || part_val == 1 && article_val == 237 || part_val == 2 && article_val == 238 || part_val == 2 && article_val == 239 || part_val == 2 && article_val == 2391 || part_val == 3 && article_val == 2391 || part_val == 2 && article_val == 2392 || part_val == 3 && article_val == 2392 || part_val == 2 && article_val == 240 || part_val == 3 && article_val == 240 || part_val == 2 && article_val == 241 || part_val == 2 && article_val == 242 || part_val == 1 && article_val == 243 || part_val == 2 && article_val == 243 || part_val == 1 && article_val == 245 || part_val == 1 && article_val == 246 || part_val == 2 && article_val == 248 || part_val == 2 && article_val == 249 || part_val == 1 && article_val == 250 || part_val == 1 && article_val == 251 || part_val == 2 && article_val == 253 || part_val == 1 && article_val == 256 || part_val == 1 && article_val == 2581 || part_val == 1 && article_val == 2582 || part_val == 2 && article_val == 2582 || part_val == 1 && article_val == 260 || part_val == 2 && article_val == 263 || part_val == 1 && article_val == 264 || part_val == 1 && article_val == 265 || part_val == 1 && article_val == 2651 || part_val == 1 && article_val == 266 || part_val == 2 && article_val == 266 || part_val == 1 && article_val == 267 || part_val == 1 && article_val == 2671 || part_val == 2 && article_val == 2671 || part_val == 3 && article_val == 2671 || part_val == 2 && article_val == 268 || part_val == 1 && article_val == 2701 || part_val == 1 && article_val == 273 || part_val == 1 && article_val == 274 || part_val == 2 && article_val == 275 || part_val == 1 && article_val == 2761 || part_val == 1 && article_val == 277 || part_val == 2 && article_val == 280 || part_val == 2 && article_val == 281 || part_val == 2 && article_val == 282 || part_val == 1 && article_val == 287 || part_val == 1 && article_val == 288 || part_val == 1 && article_val == 289 || part_val == 1 && article_val == 291 || part_val == 1 && article_val == 292 || part_val == 2 && article_val == 296 || part_val == 3 && article_val == 296 || part_val == 1 && article_val == 297 || part_val == 2 && article_val == 297 || part_val == 2 && article_val == 298 || part_val == 3 && article_val == 298 || part_val == 4 && article_val == 298 || part_val == 2 && article_val == 2981 || part_val == 3 && article_val == 2981 || part_val == 3 && article_val == 300 || part_val == 2 && article_val == 301 || part_val == 2 && article_val == 302 || part_val == 1 && article_val == 303 || part_val == 1 && article_val == 309 || part_val == 2 && article_val == 309 || part_val == 2 && article_val == 311 || part_val == 1 && article_val == 312 || part_val == 1 && article_val == 314 || part_val == 1 && article_val == 315 || part_val == 1 && article_val == 316 || part_val == 2 && article_val == 316 || part_val == 1 && article_val == 317 || part_val == 2 && article_val == 318 || part_val == 2 && article_val == 319 || part_val == 1 && article_val == 320 || part_val == 2 && article_val == 320 || part_val == 1 && article_val == 321 || part_val == 2 && article_val == 321 || part_val == 3 && article_val == 321 || part_val == 1 && article_val == 3211 || part_val == 1 && article_val == 3212 || part_val == 1 && article_val == 322 || part_val == 3 && article_val == 323 || part_val == 1 && article_val == 324 || part_val == 2 && article_val == 326 || part_val == 2 && article_val == 327 || part_val == 1 && article_val == 328 || part_val == 1 && article_val == 329 || part_val == 2 && article_val == 329 || part_val == 1 && article_val == 330 || part_val == 1 && article_val == 332 || part_val == 1 && article_val == 3321 || part_val == 2 && article_val == 3321 || part_val == 1 && article_val == 333 || part_val == 2 && article_val == 333 || part_val == 1 && article_val == 334 || part_val == 1 && article_val == 336 || part_val == 1 && article_val == 3361 || part_val == 1 && article_val == 338 || part_val == 1 && article_val == 340 || part_val == 1 && article_val == 341 || part_val == 3 && article_val == 342 || part_val == 2 && article_val == 344 || part_val == 1 && article_val == 345 || part_val == 2 && article_val == 345 || part_val == 1 && article_val == 3451 || part_val == 2 && article_val == 3451 || part_val == 1 && article_val == 346 || part_val == 2 && article_val == 350 || part_val == 1 && article_val == 352 || part_val == 2 && article_val == 353 || part_val == 2 && article_val == 354 || part_val == 4 && article_val == 354 || part_val == 2 && article_val == 355 || part_val == 2 && article_val == 357 || part_val == 3 && article_val == 358 || part_val == 1 && article_val == 359 || part_val == 1 && article_val == 361 || part_val == 2 && article_val == 3611 || part_val == 2 && article_val == 3612 || part_val == 2 && article_val == 362 || part_val == 2 && article_val == 3631 || part_val == 1 && article_val == 364 || part_val == 1 && article_val == 365 || part_val == 2 && article_val == 366 || part_val == 2 && article_val == 367 || part_val == 1 && article_val == 368 || part_val == 2 && article_val == 3682 || part_val == 2 && article_val == 3683 || part_val == 3 && article_val == 3683 || part_val == 2 && article_val == 3684 || part_val == 3 && article_val == 3684 || part_val == 1 && article_val == 369 || part_val == 2 && article_val == 3692 || part_val == 1 && article_val == 3693 || part_val == 2 && article_val == 3693 || part_val == 3 && article_val == 3693 || part_val == 1 && article_val == 370 || part_val == 2 && article_val == 371 || part_val == 1 && article_val == 372 || part_val == 1 && article_val == 373 || part_val == 1 && article_val == 375 || part_val == 2 && article_val == 376 || part_val == 1 && article_val == 3761 || part_val == 1 && article_val == 377 || part_val == 1 && article_val == 378 || part_val == 1 && article_val == 380 || part_val == 2 && article_val == 381 || part_val == 1 && article_val == 382 || part_val == 2 && article_val == 382 || part_val == 2 && article_val == 383 || part_val == 2 && article_val == 384 || part_val == 2 && article_val == 388 || part_val == 1 && article_val == 390 || part_val == 3 && article_val == 390 || part_val == 1 && article_val == 391 || part_val == 1 && article_val == 393 || part_val == 1 && article_val == 396 || part_val == 1 && article_val == 398 || part_val == 2 && article_val == 398 || part_val == 1 && article_val == 399 || part_val == 1 && article_val == 402 || part_val == 2 && article_val == 403 || part_val == 1 && article_val == 404 || part_val == 1 && article_val == 406 || part_val == 2 && article_val == 406 || part_val == 1 && article_val == 407 || part_val == 2 && article_val == 407 || part_val == 3 && article_val == 407 || part_val == 1 && article_val == 408 || part_val == 2 && article_val == 409 || part_val == 1 && article_val == 411 || part_val == 2 && article_val == 412 || part_val == 2 && article_val == 413 || part_val == 3 && article_val == 413 || part_val == 1 && article_val == 414 || part_val == 1 && article_val == 415 || part_val == 1 && article_val == 418 || part_val == 1 && article_val == 421 || part_val == 2 && article_val == 421 || part_val == 3 && article_val == 421 || part_val == 1 && article_val == 422 || part_val == 2 && article_val == 422 || part_val == 1 && article_val == 425 || part_val == 1 && article_val == 426 || part_val == 1 && article_val == 4261 || part_val == 3 && article_val == 431 || part_val == 1 && article_val == 434 || part_val == 1 && article_val == 436 || part_val == 1 && article_val == 4361 || part_val == 2 && article_val == 442) {
				count2.innerHTML++;
				area.innerHTML += 'ч. ' + part.value + ' ст. ' + article.value + ' ККУ - злочин середньої тяжкості\n';

		} else if (part_val == 1 && article_val == 109 || part_val == 2 && article_val == 110 || part_val == 2 && article_val == 1102 || part_val == 3 && article_val == 1102 || part_val == 4 && article_val == 1102 || part_val == 1 && article_val == 1141 || part_val == 2 && article_val == 119 || part_val == 3 && article_val == 120 || part_val == 1 && article_val == 121 || part_val == 2 && article_val == 121 || part_val == 2 && article_val == 127 || part_val == 3 && article_val == 130 || part_val == 4 && article_val == 130 || part_val == 2 && article_val == 131 || part_val == 3 && article_val == 135 || part_val == 5 && article_val == 143 || part_val == 3 && article_val == 146 || part_val == 1 && article_val == 147 || part_val == 1 && article_val == 149 || part_val == 3 && article_val == 150 || part_val == 2 && article_val == 1501 || part_val == 3 && article_val == 1501 || part_val == 2 && article_val == 152 || part_val == 2 && article_val == 153 || part_val == 2 && article_val == 155 || part_val == 2 && article_val == 156 || part_val == 3 && article_val == 157 || part_val == 4 && article_val == 157 || part_val == 2 && article_val == 158 || part_val == 3 && article_val == 158 || part_val == 4 && article_val == 158 || part_val == 2 && article_val == 1581 || part_val == 3 && article_val == 1591 || part_val == 4 && article_val == 160 || part_val == 3 && article_val == 161 || part_val == 2 && article_val == 163 || part_val == 3 && article_val == 176 || part_val == 3 && article_val == 177 || part_val == 3 && article_val == 185 || part_val == 4 && article_val == 185 || part_val == 2 && article_val == 186 || part_val == 3 && article_val == 186 || part_val == 4 && article_val == 186 || part_val == 1 && article_val == 187 || part_val == 2 && article_val == 187 || part_val == 2 && article_val == 189 || part_val == 3 && article_val == 189 || part_val == 3 && article_val == 190 || part_val == 3 && article_val == 191 || part_val == 4 && article_val == 191 || part_val == 2 && article_val == 194 || part_val == 2 && article_val == 1941 || part_val == 1 && article_val == 199 || part_val == 2 && article_val == 199 || part_val == 1 && article_val == 201 || part_val == 3 && article_val == 204 || part_val == 3 && article_val == 206 || part_val == 3 && article_val == 2062 || part_val == 1 && article_val == 209 || part_val == 2 && article_val == 210 || part_val == 2 && article_val == 211 || part_val == 3 && article_val == 212 || part_val == 3 && article_val == 2121 || part_val == 3 && article_val == 224 || part_val == 3 && article_val == 229 || part_val == 1 && article_val == 236 || part_val == 4 && article_val == 240 || part_val == 1 && article_val == 245 || part_val == 2 && article_val == 256 || part_val == 1 && article_val == 258 || part_val == 2 && article_val == 2581 || part_val == 1 && article_val == 2584 || part_val == 2 && article_val == 2584 || part_val == 1 && article_val == 2585 || part_val == 2 && article_val == 2585 || part_val == 1 && article_val == 259 || part_val == 2 && article_val == 259 || part_val == 2 && article_val == 260 || part_val == 3 && article_val == 260 || part_val == 1 && article_val == 262 || part_val == 2 && article_val == 262 || part_val == 1 && article_val == 263 || part_val == 1 && article_val == 2631 || part_val == 2 && article_val == 2631 || part_val == 2 && article_val == 265 || part_val == 2 && article_val == 2651 || part_val == 4 && article_val == 2671 || part_val == 2 && article_val == 269 || part_val == 2 && article_val == 270 || part_val == 2 && article_val == 2701 || part_val == 2 && article_val == 271 || part_val == 2 && article_val == 272 || part_val == 2 && article_val == 273 || part_val == 2 && article_val == 276 || part_val == 3 && article_val == 276 || part_val == 2 && article_val == 277 || part_val == 1 && article_val == 278 || part_val == 2 && article_val == 278 || part_val == 2 && article_val == 279 || part_val == 2 && article_val == 283 || part_val == 2 && article_val == 286 || part_val == 3 && article_val == 286 || part_val == 2 && article_val == 289 || part_val == 2 && article_val == 292 || part_val == 1 && article_val == 294 || part_val == 4 && article_val == 296 || part_val == 3 && article_val == 297 || part_val == 5 && article_val == 298 || part_val == 3 && article_val == 301 || part_val == 4 && article_val == 301 || part_val == 3 && article_val == 302 || part_val == 2 && article_val == 303 || part_val == 3 && article_val == 303 || part_val == 1 && article_val == 304 || part_val == 2 && article_val == 304 || part_val == 1 && article_val == 305 || part_val == 2 && article_val == 305 || part_val == 1 && article_val == 307 || part_val == 2 && article_val == 307 || part_val == 1 && article_val == 308 || part_val == 2 && article_val == 308 || part_val == 3 && article_val == 309 || part_val == 2 && article_val == 310 || part_val == 3 && article_val == 311 || part_val == 2 && article_val == 312 || part_val == 2 && article_val == 313 || part_val == 2 && article_val == 314 || part_val == 2 && article_val == 317 || part_val == 4 && article_val == 321 || part_val == 2 && article_val == 3211 || part_val == 3 && article_val == 3211 || part_val == 2 && article_val == 3212 || part_val == 3 && article_val == 3212 || part_val == 4 && article_val == 323 || part_val == 2 && article_val == 325 || part_val == 2 && article_val == 328 || part_val == 2 && article_val == 330 || part_val == 2 && article_val == 332 || part_val == 3 && article_val == 332 || part_val == 3 && article_val == 3321 || part_val == 2 && article_val == 346 || part_val == 3 && article_val == 355 || part_val == 2 && article_val == 359 || part_val == 3 && article_val == 359 || part_val == 2 && article_val == 361 || part_val == 3 && article_val == 362 || part_val == 2 && article_val == 364 || part_val == 2 && article_val == 3641 || part_val == 2 && article_val == 365 || part_val == 3 && article_val == 365 || part_val == 3 && article_val == 3652 || part_val == 2 && article_val == 368 || part_val == 3 && article_val == 368 || part_val == 3 && article_val == 3682 || part_val == 4 && article_val == 3683 || part_val == 4 && article_val == 3684 || part_val == 2 && article_val == 369 || part_val == 3 && article_val == 369 || part_val == 4 && article_val == 369 || part_val == 3 && article_val == 3692 || part_val == 2 && article_val == 370 || part_val == 3 && article_val == 371 || part_val == 2 && article_val == 372 || part_val == 2 && article_val == 373 || part_val == 2 && article_val == 374 || part_val == 2 && article_val == 375 || part_val == 1 && article_val == 3761 || part_val == 2 && article_val == 377 || part_val == 3 && article_val == 382 || part_val == 4 && article_val == 382 || part_val == 1 && article_val == 392 || part_val == 2 && article_val == 393 || part_val == 2 && article_val == 399 || part_val == 2 && article_val == 402 || part_val == 3 && article_val == 402 || part_val == 4 && article_val == 402 || part_val == 3 && article_val == 403 || part_val == 2 && article_val == 404 || part_val == 3 && article_val == 404 || part_val == 2 && article_val == 405 || part_val == 3 && article_val == 405 || part_val == 4 && article_val == 405 || part_val == 3 && article_val == 406 || part_val == 4 && article_val == 407 || part_val == 5 && article_val == 407 || part_val == 2 && article_val == 408 || part_val == 3 && article_val == 408 || part_val == 3 && article_val == 409 || part_val == 4 && article_val == 409 || part_val == 1 && article_val == 410 || part_val == 2 && article_val == 410 || part_val == 2 && article_val == 411 || part_val == 3 && article_val == 411 || part_val == 4 && article_val == 411 || part_val == 2 && article_val == 414 || part_val == 2 && article_val == 415 || part_val == 2 && article_val == 418 || part_val == 3 && article_val == 418 || part_val == 1 && article_val == 419 || part_val == 2 && article_val == 419 || part_val == 3 && article_val == 419 || part_val == 1 && article_val == 420 || part_val == 2 && article_val == 420 || part_val == 3 && article_val == 420 || part_val == 3 && article_val == 422 || part_val == 2 && article_val == 425 || part_val == 3 && article_val == 425 || part_val == 4 && article_val == 425 || part_val == 2 && article_val == 426 || part_val == 3 && article_val == 426 || part_val == 4 && article_val == 426 || part_val == 2 && article_val == 4261 || part_val == 3 && article_val == 4261 || part_val == 4 && article_val == 4261 || part_val == 1 && article_val == 427 || part_val == 1 && article_val == 428 || part_val == 2 && article_val == 428 || part_val == 3 && article_val == 428 || part_val == 1 && article_val == 429 || part_val == 1 && article_val == 430 || part_val == 1 && article_val == 431 || part_val == 2 && article_val == 431 || part_val == 1 && article_val == 432 || part_val == 1 && article_val == 433 || part_val == 2 && article_val == 433 || part_val == 2 && article_val == 4361 || part_val == 1 && article_val == 440 || part_val == 1 && article_val == 444 || part_val == 1 && article_val == 447 || part_val == 4 && article_val == 447) {
				count3.innerHTML++;
				area.innerHTML += 'ч. ' + part.value + ' ст. ' + article.value + ' ККУ - тяжкий злочин\n';

		} else if (part_val == 3 && article_val == 110 || part_val == 1 && article_val == 111 || part_val == 1 && article_val == 113 || part_val == 1 && article_val == 114 || part_val == 2 && article_val == 1141 || part_val == 2 && article_val == 147 || part_val == 2 && article_val == 149 || part_val == 3 && article_val == 149 || part_val == 3 && article_val == 152 || part_val == 4 && article_val == 152 || part_val == 3 && article_val == 153 || part_val == 5 && article_val == 185 || part_val == 5 && article_val == 186 || part_val == 3 && article_val == 187 || part_val == 4 && article_val == 187 || part_val == 4 && article_val == 189 || part_val == 4 && article_val == 190 || part_val == 5 && article_val == 191 || part_val == 3 && article_val == 1941 || part_val == 3 && article_val == 199 || part_val == 2 && article_val == 201 || part_val == 1 && article_val == 2032 || part_val == 2 && article_val == 2032 || part_val == 2 && article_val == 209 || part_val == 3 && article_val == 209 || part_val == 2 && article_val == 233 || part_val == 2 && article_val == 252 || part_val == 1 && article_val == 255 || part_val == 1 && article_val == 257 || part_val == 2 && article_val == 258 || part_val == 1 && article_val == 2583 || part_val == 3 && article_val == 2585 || part_val == 4 && article_val == 260 || part_val == 5 && article_val == 260 || part_val == 1 && article_val == 261 || part_val == 3 && article_val == 262 || part_val == 3 && article_val == 2631 || part_val == 3 && article_val == 265 || part_val == 3 && article_val == 2651 || part_val == 2 && article_val == 267 || part_val == 3 && article_val == 2701 || part_val == 2 && article_val == 274 || part_val == 3 && article_val == 277 || part_val == 3 && article_val == 278 || part_val == 3 && article_val == 279 || part_val == 3 && article_val == 280 || part_val == 3 && article_val == 281 || part_val == 3 && article_val == 282 || part_val == 3 && article_val == 289 || part_val == 3 && article_val == 292 || part_val == 2 && article_val == 294 || part_val == 4 && article_val == 297 || part_val == 5 && article_val == 301 || part_val == 4 && article_val == 303 || part_val == 3 && article_val == 305 || part_val == 1 && article_val == 306 || part_val == 2 && article_val == 306 || part_val == 3 && article_val == 307 || part_val == 3 && article_val == 308 || part_val == 3 && article_val == 312 || part_val == 3 && article_val == 313 || part_val == 3 && article_val == 314 || part_val == 2 && article_val == 315 || part_val == 3 && article_val == 345 || part_val == 4 && article_val == 345 || part_val == 3 && article_val == 3451 || part_val == 4 && article_val == 3451 || part_val == 3 && article_val == 346 || part_val == 2 && article_val == 347 || part_val == 2 && article_val == 3471 || part_val == 1 && article_val == 3481 || part_val == 1 && article_val == 349 || part_val == 1 && article_val == 3491 || part_val == 3 && article_val == 350 || part_val == 2 && article_val == 352 || part_val == 4 && article_val == 368 || part_val == 3 && article_val == 377 || part_val == 2 && article_val == 378 || part_val == 3 && article_val == 398 || part_val == 3 && article_val == 399 || part_val == 4 && article_val == 404 || part_val == 5 && article_val == 404 || part_val == 4 && article_val == 408 || part_val == 3 && article_val == 410 || part_val == 4 && article_val == 410 || part_val == 3 && article_val == 414 || part_val == 1 && article_val == 416 || part_val == 1 && article_val == 417 || part_val == 5 && article_val == 4261 || part_val == 1 && article_val == 437 || part_val == 2 && article_val == 437 || part_val == 1 && article_val == 438 || part_val == 2 && article_val == 438 || part_val == 1 && article_val == 439 || part_val == 2 && article_val == 439 || part_val == 1 && article_val == 441 || part_val == 1 && article_val == 442 || part_val == 1 && article_val == 446 || part_val == 2 && article_val == 446 || part_val == 2 && article_val == 447 || part_val == 3 && article_val == 447) {
				count4.innerHTML++;
				area.innerHTML += 'ч. ' + part.value + ' ст. ' + article.value + ' ККУ - особливо тяжкий злочин\n';

		} else if (part_val == 1 && article_val == 112 || part_val == 1 && article_val == 115 || part_val == 2 && article_val == 115 || part_val == 3 && article_val == 258 || part_val == 1 && article_val == 348 || part_val == 1 && article_val == 379 || part_val == 1 && article_val == 400 || part_val == 1 && article_val == 443) {
				count5.innerHTML++;
				area.innerHTML += 'ч. ' + part.value + ' ст. ' + article.value + ' ККУ - посягання на життя\n';

		} else {
				alert('неіснуюча стаття');
		}
		buttonDel();
}