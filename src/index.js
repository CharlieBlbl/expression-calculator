function eval() {
	// Do not use eval!!!
	return;
}

function expressionCalculator (expr){
	
	

	if (expr.match(/\(/g) === null && expr.match(/\)/g) === null){
		return calculator(expr)
	}else if (expr.match(/\(/g) === null || expr.match(/\)/g) === null){
		throw new Error ("ExpressionError: Brackets must be paired")
		}else if (expr.match(/\(/g).length !== expr.match(/\)/g).length) {
			throw new Error ("ExpressionError: Brackets must be paired")
		}else {
				while (/\(|\)/gm.test(expr)){

					console.log('0:'+expr)

					expr = expr.replace(/\([^\(\)]+\)/gm, match => calculator(match.slice(1, match.length - 1)))	
					
					console.log('1:'+expr)


					while(/\+[\s]+\-/gm.test(expr)){
						expr = expr.replace(/\+[\s]+\-/gm, '-')
					}				
				
					while(/\-[\s]+\-/gm.test(expr)){
						expr = expr.replace(/\-[\s]+\-/gm, '+')
					}				
				
					while(/\*[\s]+\-/gm.test(expr)){
						let x = expr.match(/\*[\s]+\-/).index
						let str = expr.slice(0 , x)
						let br = str.lastIndexOf('(')
							expr = expr.replace(/\*[\s]+\-/gm, '*')

						if (br == -1){
							let	a = expr.slice(0,x-1).lastIndexOf('-')
							let	b = expr.slice(0,x-1).lastIndexOf('+')
						a > b ? expr =  expr.slice(0, a-1).concat('+') + expr.slice(a+1) 
							  : a < b ? expr =  expr.slice(0, b-1).concat('-') + expr.slice(b+1)  
										: expr = '0-'+expr
						}else{
							let str2 = str.slice(br+1)
							let str3 = str.slice(br+1)
							let	a = str2.lastIndexOf('-')
							let	b = str2.lastIndexOf('+')
			
							a > b ? str2 =  str2.slice(0, a-1).concat('+') + str2.slice(a+1) 
								  : a < b ? str2 =  str2.slice(0, b-1).concat('-') + str2.slice(b+1) 
									      : str2 = '0-'+str2
										expr = expr.replace(str3, str2)
											
									}				
				
					}

					while(/\/[\s]+\-/gm.test(expr)){

						let x = expr.match(/\/[\s]+\-/).index
						let str = expr.slice(0 , x)
						let br = str.lastIndexOf('(')
						expr = expr.replace(/\/[\s]+\-/, '/')

						if (br == -1){
							let	a = expr.slice(0,x-1).lastIndexOf('-')
							let	b = expr.slice(0,x-1).lastIndexOf('+')				

						a > b ? expr =  expr.slice(0, a-1).concat('+') + expr.slice(a+1) 
							  : a < b ? expr =  expr.slice(0, b-1).concat('-') + expr.slice(b+1)  
									  : expr = '0-'+expr

						}else{
							let str2 = str.slice(br+1)
							let str3 = str.slice(br+1)
							let	a = str2.lastIndexOf('-')
							let	b = str2.lastIndexOf('+')

							a > b ? str2 =  str2.slice(0, a-1).concat('+') + str2.slice(a+1) 
							: a < b ? str2 =  str2.slice(0, b-1).concat('-') + str2.slice(b+1) 
									: str2 = '0-'+str2
							expr = expr.replace(str3, str2)
								
						}


						
						

						console.log('3:'+expr)
				
					}

					// console.log('3:'+expr)


					
					
				}	
				return calculator (expr)	
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