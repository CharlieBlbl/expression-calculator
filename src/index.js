function eval() {
	// Do not use eval!!!
	return;
}

function expressionCalculator (expr){
	if (expr.indexOf('(') == -1 && expr.indexOf(')') == -1){
		return calculator(expr)
	} else {

		let one = expr.indexOf('('),
			two = expr.indexOf(')'),
			substr = expr.substring(one+1, two),
			re = new RegExp (substr),
			calc1 = (calculator(substr)).toString()

			expr.replace(re, calc1)

		return calculator (expr.replace(re, calc1))
	}
}

function calculator (expr1){

	let strplus = expr1.split('+'),
		strmin = strplus.map(el => el.split('-'))
	  
  
	  
	function dividemul (a){
		  
		  let arr1 = [a].map(el => el.split('*'))
		  
  
		  for (let i =0; i < arr1.length; i++){
			  for (let j = 0; j < arr1[i].length; j++){
				  arr1[i][j] = arr1[i][j].split('/').reduce((a, b) => {if (Number(b) == 0){ 
					throw new Error('TypeError: Division by zero.')
					} else{
					  return Number(a) / Number(b)}})
			  }
			  
			  arr1[i] = arr1[i].reduce((a, b) =>Number(a) * Number(b))               
		  }        
		  return arr1        
	}

	
  
	function minus (b){
		  b = b.flatMap(el => dividemul(el) )
		  return b.reduce((a, b) =>Number(a) - Number(b))
	} 
  
	strmin = strmin.flatMap (el => minus(el))    
		
	  
	return strmin.reduce((a, b) => Number(a) + Number(b))
	  
  }
  
module.exports = {
	expressionCalculator
}