const clearElement1 = document.querySelector('.js-clear')
const switchElement2 = document.querySelector('.js-switching')  
const button = document.querySelectorAll('button')
const calculationElement = document.querySelector('.js-calculation')

let calculation= '';
let numVariables1 =[]
let numVariables2 =[] 
let operVariable = []
let onOff = true
let step = 0
let combinedArray =[]
let showValue = '';

function getCalculation(){
initializingVariable()
document.querySelector('.js-h3').innerText = calculation;
combinedArray = []
numVariables1 = []
numVariables2 = []
operVariable = []
 step = 0

}
    //functions

    function initializingVariable(){

        const numbers = '0123456789.'
        const symbols = '+-*/'
        let variable1=''
        let variable2 = ''
        let operatorVariable = ''
                         
        for (const value of calculation) {
            if (numbers.includes(value) && step === 0 ){
                 variable1 += value        
                
            }else if(symbols.includes(value)){
                  operatorVariable += value 
                  variable2? numVariables2.push(variable2) : '';
                  variable2 = ''
                  
                  step = 2
            }else if(numbers.includes(value) && step === 2){
                  variable2 += value
                  operatorVariable? operVariable.push(operatorVariable) : '';
                  operatorVariable = ''     
        }
    }
    variable2? numVariables2.push(variable2) : '';
    numVariables1.push(variable1)
    operatorVariable? operVariable.push(operatorVariable) : '';
// checking for errors

    if(numVariables1[0] && !numVariables2[0] && !operVariable[0]){
        return calculation = numVariables1[0]
    }else if(numVariables1[0] && operVariable[0], !numVariables2){
        return calculation = 'syntaxError'
    }else if(operVariable[0].length > 1){
        return calculation = 'syntaxError' 
    }
   
    
    numVariables2.forEach((item, i) => {
    let value = numVariables1[i]? numVariables1[i] : ''
    value ? combinedArray.push(value, operVariable[i], numVariables2[i]) : combinedArray.push(operVariable[i], numVariables2[i])
    
    })


    if (symbols.includes(combinedArray[0])) return calculation = 'SyntaxError'
    
    console.log(numVariables1, numVariables2, operVariable)
    console.log(combinedArray)
    operatorVariable = ''
    variable1 = ''
    variable2 = ''
    calculatingValues()
    
    
}

function calculatingValues(){
    
    for (let i = 0; i < operVariable.length; i++){
        if (combinedArray.includes('/')){
            const index = combinedArray.indexOf('/')
            const value = Number(combinedArray[index - 1]) / Number(combinedArray[index + 1])
             combinedArray.splice(index - 1 , 2)
             combinedArray[index-1] = value
              
        }else if (combinedArray.includes('*')){
            const index = combinedArray.indexOf('*')
            const value = Number(combinedArray[index - 1]) * Number(combinedArray[index + 1])
            combinedArray.splice(index - 1 , 2)
            combinedArray[index-1] = value
        
        }else if (combinedArray.includes('+')){
            const index = combinedArray.indexOf('+')
            const value = Number(combinedArray[index - 1]) + Number(combinedArray[index + 1])
            combinedArray.splice(index - 1 , 2)
            combinedArray[index-1] = value
        
        }else if (combinedArray.includes('-')){
            const index = combinedArray.indexOf('-')
            const value = Number(combinedArray[index - 1]) - Number(combinedArray[index + 1])
            combinedArray.splice(index - 1 , 2)
            combinedArray[index-1] = value
        }
        console.log(combinedArray)
    }
        return calculation = combinedArray[0]
}


function displayResult(){
    if (!onOff){
    document.querySelector('.js-result').innerText = showValue;
    
    }
}


clearElement1.addEventListener('click', () =>{
        if (calculation){ 
           calculation = ''
           numVariables1 = []
           numVariables2 = []
           operVariable = []
           step = 0
           showValue = ''
        }
        displayResult()
        document.querySelector('.js-h3').innerText = calculation;
    })

    switchElement2.addEventListener('click', () =>{
        calculation= '';
        displayResult();
       
        if(onOff){
           switchElement2.innerText='ON';
           switchElement2.classList.add('greenButton');
            onOff = false
            
        }else{
           switchElement2.classList.remove('greenButton');
           switchElement2.innerText='OFF';
            calculation='';
            displayResult();
            onOff= true

        }
    })
   
calculationElement.addEventListener('click', ()=> getCalculation())
    
button.forEach((button) => {
button.addEventListener('click', (e) => {
console.log(e.target.value)
            calculation += e.target.value;
            showValue = calculation
            displayResult();
        })
    })
