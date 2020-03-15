function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {   
    
    let str = " 48 + 59 * 86 * 92 * 23 ";
    let st = str.trim();
    let arr = str.split(' ');

    
    
    
    
    function multipliDivision (arr) {
        let AR = [];
        for (i = 0; i < arr.length; i++) {    
            if (arr[i] == '*' || arr[i] == '/' || arr[i] == '+' || arr[i] == '-' ) {
                if (arr[i] == '*') {
                    AR[AR.length-1] = ( Number(AR[AR.length-1]) * Number(arr[i+1]) );
                    i++;
                } else if (arr[i] == '/') {
                    AR[AR.length-1] = ( AR[AR.length-1] / arr[i+1] );
                    i++; 
                } else if (arr[i] == '+' || arr[i] == '-') {            
                    AR.push(arr[i]);
                }        
            }
            else {       
                AR.push(arr[i]);
            }   
        }
        return AR;
    }


    function sumDifference (arr) {
        let AR = [];
        for (i = 0; i < arr.length; i++) {    
            if (arr[i] == '*' || arr[i] == '/' || arr[i] == '+' || arr[i] == '-' ) {
                if (arr[i] == '+') {
                    AR[AR.length-1] = ( Number(AR[AR.length-1]) + Number(arr[i+1]) );
                    i++;
                } else if (arr[i] == '-') {
                    AR[AR.length-1] = ( AR[AR.length-1] - arr[i+1] );
                    i++; 
                } else if (arr[i] == '*' || arr[i] == '/') {            
                    AR.push(arr[i]);
                }        
            }
            else {       
                AR.push(arr[i]);
            }   
        }
        return AR;
    }

    






}

module.exports = {
    expressionCalculator
}