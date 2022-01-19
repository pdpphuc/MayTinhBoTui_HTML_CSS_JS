var result = document.getElementById('ketqua');
var tmp = '';
var number = '';
var numbers = [];
var operators = [];

// Có dấu?
var sign = false;

// Đã có phép tính?
var opera = false;

function countPrecedence(operators) {
	var count = 0;
	for(var i = 0; i < operators.length; ++i){
		if(operators[i] == 'x' || operators[i] == '/')
			count++;
	}
	return count;
}

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
			
			// Tính các phép tính ưu tiên trước
			while(countPrecedence(operators) > 0) {
				for (var i = 0; i < operators.length; ++i) {
					if (operators[i] == 'x') {
						numbers[i] = numbers[i] * numbers[i+1];
						numbers.splice(i+1, 1);
						operators.splice(i, 1);
						break;
					}
					else if (operators[i] == '/') {
						// Phép tính không hợp lệ
						if (numbers[i+1] == 0) {
							result.value = '0';
							operators = [];							
						}
						else {							
							numbers[i] = numbers[i] / numbers[i+1];
							numbers.splice(i+1, 1);
							operators.splice(i, 1);
						}
						break;
					}					
				}
			}
			
			// Tính các phép tính + -
			while (numbers.length > 1) {
				if (operators[0] == '+') {
					numbers[0] += numbers[1];	
				}
				else {
					numbers[0] -= numbers[1];		
				}
				numbers.splice(1, 1);
				operators.splice(0, 1);
			}
				
			// In kết quả
			result.value = numbers[0];
			
			tmp = '';
			number = '';
			numbers = [];
			operators = [];	
			break;
		}
		case '%':
		{
			// opera = false;
			if (number != '') {
				numbers.push(parseFloat(number));	
			}
			if (numbers.length != 2 || numbers[1] == 0 || operators.length != 1 || operators[0] != '/') {
				result.value = '0';	
			}
			else {
				result.value = numbers[0] / numbers[1] * 100;				
			}
			tmp = '';
			number = '';
			numbers = [];
			operators = [];		
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