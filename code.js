var result = document.getElementById('ketqua');
var tmp = '';
var number = '';
var numbers = [];
var operators = [];

// Có dấu?
var sign = false;

// Đã có phép tính?
var opera = false;

function clickButton(obj){
	
	if (result.value == '0') {
		result.value = '';	
	}
	
	var btn = obj.innerHTML;
	switch(btn){
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case '.':
		{
			opera = false;			
			number += btn;
			result.value = tmp + number;
			break;
		}
		case '+/-':
		{
			opera = false;
			// + -> -
			if (sign) {				
				number = number.substring(1);
				result.value = tmp + number;
				sign = false;
			}
			// - -> +
			else {
				number = '-' + number;
				result.value = tmp + number;
				sign = true;
			}
			break;
		}
		case '+':
		case '-':
		case 'x':
		case '/':
		{			
			if (opera) {
				operators[operators.length - 1] = btn;
				result.value = result.value.substring(0, result.value.length-1) + btn;
			}
			else {			
				numbers.push(parseFloat(number));
				number = '';
				operators.push(btn);
				result.value = result.value + btn;
			}
			opera = true;
			tmp = result.value;
			break;	
		}
		case '=':
		{
			// opera = false;
			if (number != '') {
				numbers.push(parseFloat(number));	
			}
			
			break;
		}
		case '%':
		{
			// opera = false;
			if (number != '') {
				numbers.push(parseFloat(number));	
			}
			
			break;
		}
		case 'CE':
		{
			number = '';
			result.value = tmp + number;
			break;
		}
		case '&lt;-':
		{
			if (number.length > 0) {
				number = number.substring(0, number.length-1);	
			}
			result.value = tmp + number;
			break;
		}
	}
	
	console.log(numbers);
	console.log(operators);
}