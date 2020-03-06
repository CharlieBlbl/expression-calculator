function eval() {
	// Do not use eval!!!
	return;
}

function expressionCalculator (expr){
	// if (expr.match(/\(/g).length !== expr.match(/\(/g).length !== null ){
	// 	throw new Error ('"ExpressionError: Brackets must be paired"')
	// }
	
	if (expr.match(/\(/g) === expr.match(/\)/g) === null){
		return calculator(expr)}

	if (expr.indexOf('(') !== -1 && expr.indexOf(')') !== -1 && expr.match(/\(/g).length == expr.match(/\(/g).length) {

		let one = expr.indexOf('('),
			
			substr = expr.match(/\((.*)\)/)[1],			
			calc1 = calculator (substr)
			
			
			if (calc1 >= 0){
				res = expr.replace('('+substr+')', calc1.toString())
				return calculator (res)
			}else{
				let plus = expr.lastIndexOf('+', one),
					minus = expr.lastIndexOf('-', one)

				plus > minus ? res0 = expr.substring(0, one-1) + '-'+ expr.substring(one, expr.length-1) :	
				plus < minus ? res0 = expr.substring(0, one-1) + '+'+ expr.substring(one, expr.length-1) : res0 = '0-'+expr

				res = res0.replace('('+substr+')', Math.abs(calc1.toString()))
				return calculator (res)
							
			}		
	} else { throw new Error ('"ExpressionError: Brackets must be paired"')}

	

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