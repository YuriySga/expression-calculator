function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {    
    let str = expr.trim();
    let arr = str.split('');
    let arr1 = [];
    let arr2 = []; 
    arr.forEach(item => {if (item !== " " && item !== "") arr1.push(item);} );     
    for (let i=0; i < arr1.length; i++) {
        if (isNaN(Number(arr1[i])) === false) {  
            if (isNaN(Number(arr2[arr2.length-1])) === false) {
                arr2[arr2.length-1] = arr2[arr2.length-1] + arr1[i];                 
            } else {
                arr2.push(arr1[i]);
            }                  
        } else {
            arr2.push(arr1[i]);
        }     
    }
    let res = changeBrackets(arr2);    
    let result = multipliDivision(res)[0];
    return Number(result.toFixed(4));
}

function changeBrackets (arr) {
    let b = arr.indexOf(')', 0);
    let a = arr.lastIndexOf('(', b);
    if (a == -1 && b == -1) {
        return arr;
    } else if (a == -1 || b == -1) {
        throw Error("ExpressionError: Brackets must be paired");      
    } else {
        let removed = arr.splice(a, b-a+1);
        removed.shift();
        removed.pop();
        arr.splice(a, 0, removed);
        let test = changeBrackets(arr);
        return (arr.length == test.length) ? arr :  test ;
    }    
}

function multipliDivision (arr, st = "*/") {
    let step = st; 
    let temp = null;       
    let arrRes = [];
    if (step == "*/") {
        for (let i = 0; i < arr.length; i++) {    
            if (arr[i] == '*' || arr[i] == '/' || arr[i] == '+' || arr[i] == '-') {            
                if (Array.isArray(arr[i+1]) == false && Array.isArray(arrRes[arrRes.length-1]) == false ) {                
                    if (arr[i] == '*') {                    
                        arrRes[arrRes.length-1] =  Number(arrRes[arrRes.length-1]) * Number(arr[i+1]);
                        i++;
                    } else if (arr[i] == '/') {
                        if (Number(arr[i+1]) === 0) throw Error("TypeError: Division by zero.");
                        arrRes[arrRes.length-1] = ( arrRes[arrRes.length-1] / arr[i+1] );
                        i++;
                    } else if (arr[i] == '+' || arr[i] == '-') {
                        arrRes.push(arr[i]);
                    }
                } else if (Array.isArray(arrRes[arrRes.length-1]) == true) {    //arr is not solved
                    arrRes.push(arr[i]);
                } else if (Array.isArray(arr[i+1]) == true) {
                    temp = multipliDivision(arr[i+1]); 
                    if (arr[i] == '*') {
                        if (temp.length == 1) { 
                            arrRes[arrRes.length-1] = Number(arrRes[arrRes.length-1]) * Number( temp) ;
                            i++;
                        } else {                        
                            arrRes.push(arr[i]);
                            arrRes.push(temp);
                            i++;
                        }
                    } else if (arr[i] == '/') {                    
                        if (temp.length == 1) { 
                            if (Number(temp) === 0) throw Error("TypeError: Division by zero.");
                            arrRes[arrRes.length-1] =  Number(arrRes[arrRes.length-1]) / Number(temp) ;
                            i++;
                        } else {
                            arrRes.push(arr[i]);                                                        
                            arrRes.push(temp);                            
                            i++;
                        }
                    } else if (arr[i] == '+' || arr[i] == '-') {                                     
                        arrRes.push(arr[i]);                    
                        arrRes.push((temp.length == 1) ? temp[0] : temp);
                        i++;
                    }            
                }      
            } else if (Array.isArray(arr[i]) == true) {
                temp = multipliDivision(arr[i]);
                if (temp.length == 1) {
                    arrRes.push(temp[0]);
                } else {
                    arrRes.push(temp);
                }
            } else {       
                arrRes.push(arr[i]);
            }  
        }
    } else if (step == "+-") {
        for (let i = 0; i < arr.length; i++) {    
            if (arr[i] == '+' || arr[i] == '-') {            
                if (Array.isArray(arr[i+1]) == false && Array.isArray(arrRes[arrRes.length-1]) == false ) {                
                    if (arr[i] == '+') {                    
                        arrRes[arrRes.length-1] =  Number(arrRes[arrRes.length-1]) + Number(arr[i+1]);
                        i++;
                    } else if (arr[i] == '-') {
                        arrRes[arrRes.length-1] = Number(arrRes[arrRes.length-1]) - Number(arr[i+1]);
                        i++;
                    }
                } else if (Array.isArray(arr[i+1]) == true) {
                    temp = multipliDivision(arr[i+1]); 
                    if (arr[i] == '+') {
                        if (temp.length == 1) { 
                            arrRes[arrRes.length-1] = Number(arrRes[arrRes.length-1]) + Number( temp) ;
                            i++;
                        } else {                        
                            arrRes.push(arr[i]);
                            arrRes.push(temp);
                            i++;
                        }
                    } else if (arr[i] == '-') {                    
                        if (temp.length == 1) { 
                            arrRes[arrRes.length-1] =  Number(arrRes[arrRes.length-1]) - Number(temp) ;
                            i++;
                            temp = null;
                        } else {
                            arrRes.push(arr[i]);                                                        
                            arrRes.push(temp);                            
                            i++;
                        }
                    }            
                }      
            } else if (Array.isArray(arr[i]) == true) {
                temp = multipliDivision(arr[i]);
                if (temp.length == 1) {
                    arrRes.push(temp[0]);
                } else {
                    arrRes.push(temp);
                }
            } else {       
                arrRes.push(arr[i]);
            }  
        }
    }
    return (step == "*/") ? multipliDivision(arrRes, "+-") : arrRes;    
}














module.exports = {
    expressionCalculator
}