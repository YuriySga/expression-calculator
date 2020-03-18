function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) { 
    let str = expr.trim();
    let arr = str.split(' ');
    let arr1 = [];
    arr.forEach(item => {if (item !== " " && item !== "") arr1.push(item);} );
    let res = changeBrackets(arr1);
    
    let result = multipliDivision(res)[0];
    if (result == Infinity) {
        throw Error("TypeError: Division by zero.");        
    }
    if (isNaN(result) === true) {
        throw Error("ExpressionError: Brackets must be paired");        
    }
    
    return Number(result.toFixed(4));
}

function changeBrackets (arr) {
    let a = (arr.indexOf('(', 0));
    let b = (arr.indexOf(')', a));
    if (a == -1 && b == -1) {
        return arr;
        } 
    else {
        let removed = arr.splice(a, b-a+1);
        removed.shift();
        removed.pop();
        arr.splice(a, 0, removed);
        return (arr.indexOf('(', 0) == -1) ? arr : changeBrackets(arr);
    }
}

function multipliDivision (arr, st = "*/") {
    let step = st; 
    let temp = null;       
    let AR = [];
    if (step == "*/") {
        for (let i = 0; i < arr.length; i++) {    
            if (arr[i] == '*' || arr[i] == '/' || arr[i] == '+' || arr[i] == '-') {            
                if (Array.isArray(arr[i+1]) == false && Array.isArray(AR[AR.length-1]) == false ) {                
                    if (arr[i] == '*') {                    
                        AR[AR.length-1] =  Number(AR[AR.length-1]) * Number(arr[i+1]);
                        i++;
                    } else if (arr[i] == '/') {
                        AR[AR.length-1] = ( AR[AR.length-1] / arr[i+1] );
                        i++;
                    } else if (arr[i] == '+' || arr[i] == '-') {
                        AR.push(arr[i]);
                    }
                } else if (Array.isArray(AR[AR.length-1]) == true) {    //arr is not solved
                    AR.push(arr[i]);
                } else if (Array.isArray(arr[i+1]) == true) {
                    temp = multipliDivision(arr[i+1]); 
                    if (arr[i] == '*') {
                        if (temp.length == 1) { 
                            AR[AR.length-1] = Number(AR[AR.length-1]) * Number( temp) ;
                            temp = null;
                            i++;
                        } else {                        
                            AR.push(arr[i]);
                            AR.push(temp);
                            temp = null;
                            i++;
                        }
                    } else if (arr[i] == '/') {                    
                        if (temp.length == 1) { 
                            AR[AR.length-1] =  Number(AR[AR.length-1]) / Number(temp) ;
                            i++;
                            temp = null;
                        } else {
                            AR.push(arr[i]);                                                        
                            AR.push(temp);                            
                            i++;
                            temp = null;
                        }
                    } else if (arr[i] == '+' || arr[i] == '-') {                                     
                        AR.push(arr[i]);                    
                        AR.push((temp.length == 1) ? temp[0] : temp);
                        i++;
                        temp = null;
                    }            
                }      
            } else if (Array.isArray(arr[i]) == true) {
                temp = multipliDivision(arr[i]);
                if (temp.length == 1) {
                    AR.push(temp[0]);
                    temp = null;
                } else {
                    AR.push(temp);
                    temp = null;
                }
            } else {       
                AR.push(arr[i]);
            }  
        }
    } else if (step == "+-") {
        for (let i = 0; i < arr.length; i++) {    
            if (arr[i] == '+' || arr[i] == '-') {            
                if (Array.isArray(arr[i+1]) == false && Array.isArray(AR[AR.length-1]) == false ) {                
                    if (arr[i] == '+') {                    
                        AR[AR.length-1] =  Number(AR[AR.length-1]) + Number(arr[i+1]);
                        i++;
                    } else if (arr[i] == '-') {
                        AR[AR.length-1] = ( AR[AR.length-1] - arr[i+1] );
                        i++;
                    }
                } else if (Array.isArray(arr[i+1]) == true) {/////
                    temp = multipliDivision(arr[i+1]); 
                    if (arr[i] == '+') {
                        if (temp.length == 1) { 
                            AR[AR.length-1] = Number(AR[AR.length-1]) + Number( temp) ;
                            temp = null;
                            i++;
                        } else {                        
                            AR.push(arr[i]);
                            AR.push(temp);
                            temp = null;
                            i++;
                        }
                    } else if (arr[i] == '-') {                    
                        if (temp.length == 1) { 
                            AR[AR.length-1] =  Number(AR[AR.length-1]) - Number(temp) ;
                            i++;
                            temp = null;
                        } else {
                            AR.push(arr[i]);                                                        
                            AR.push(temp);                            
                            i++;
                            temp = null;
                        }
                    }            
                }      
            } else if (Array.isArray(arr[i]) == true) {
                temp = multipliDivision(arr[i]);
                if (temp.length == 1) {
                    AR.push(temp[0]);
                    temp = null;
                } else {
                    AR.push(temp);
                    temp = null;
                }

            } else {       
                AR.push(arr[i]);
            }  
        }
    }
    return (step == "*/") ? multipliDivision(AR, "+-") : AR;    
}














module.exports = {
    expressionCalculator
}