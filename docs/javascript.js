console.log(' Start to fill the tab1');

/* help function */

let destination_table = []
let order_table = []
let name_table = []
let city_table = []

// let renderEngine = function(template, data){
//     //the constant will be {{ }} as angular
//     debugger
//     let arr = template.split('{{');
//     for(let i = 1; i<arr.length; i++){
//         let fragment = arr[i];
//         let frag = fragment.split('}}');
//         arr[i] = data[ frag[0] ] + frag[1]; 
//     }
//     return arr.join('');
// }

//let s = '<tr><td>{{code}}</td><td>{{name}}</td><td>{{price}}</td></tr>'

function addInTable(){
    let dest = document.querySelector('.TabOfChoice tbody');
    let destTemplate = '<tr><td>#CODE</td><td>#NAME</td><td>#PRICE</td></tr>';
    let destHTML = '';

    for(let i = 0; i<destination_table.length; i++){
        destHTML += destTemplate.replace('#CODE', destination_table[i].code)
                                .replace('#NAME', destination_table[i].name)
                                .replace('#PRICE', destination_table[i].price)
    }

    dest.innerHTML = destHTML
}

function profitTot(table){
    for(let i=0; i<table.length; i++){
        tot += table[i].total
    }
    table.splice(0, table.length);
}

/* ***************************************************************** */
/*Start the real code of the page*/

try{
destination_table = [
    { code:1, name:'Marseille', price:400 },
    { code:2, name:'Rome', price:350 },
    { code:3, name:'Prague', price:200 },
    { code:4, name:'Manchester', price:250 },
    { code:5, name:'New-York', price:900 },
    { code:6, name:'Pekin', price:700 },
]

addInTable()
console.log('End fill the tab1');
}
catch(error){console.error('error in fill tab1', error);}


/* function that retrieves user input and displays an array with orders */


function send(){
    try{
    let dbTravel = document.querySelectorAll('.RegForm input');
    let dbDest = document.querySelector('.TabOfReg tbody');

        if(dbTravel[2].value < destination_table.length+1){
            let dbObject = {
                total:dbTravel[3].value*destination_table[dbTravel[2].value-1].price,
                passagers:dbTravel[3].value,
                travel_name:destination_table[dbTravel[2].value-1].name,
                personnalID:dbTravel[1].value,
                name:(dbTravel[0].value).toLowerCase(),
                code:dbTravel[2].value
            }
            let dbTemplate = '<tr><td>#TOTAL</td><td>#PASSAGERS</td><td>#TRAVELNAME</td><td>#PERSONNALID</td><td>#NAME</td><td>#CODE</td></tr>';
            let dbHTML = '';
    
            dbHTML +=  dbTemplate.replace('#TOTAL', dbObject.total)
                             .replace('#PASSAGERS', dbObject.passagers)
                             .replace('#TRAVELNAME', dbObject.travel_name)
                             .replace('#PERSONNALID', dbObject.personnalID)
                             .replace('#NAME', dbObject.name)
                             .replace('#CODE', dbObject.code)

            dbDest.innerHTML += dbHTML;
            order_table.push(dbObject); 
        } else{alert('No travelId matches')}
        console.log('End fill the tab1');
    } catch(error){console.error('error in fill tab2', error);}
}

/* function that allows, no matter in what way the user inputs his research, to give him the right output */

function search(idInput, idSpan, selectorTab){
    let InputSearch = document.getElementById(idInput).value;
    let searchTab = document.querySelector(selectorTab);
    let selectLine = document.querySelectorAll('.TabOfReg tr');
    let profit = document.getElementById(idSpan);
    let flag
    tot = 0;

    searchTab.innerHTML = ''
    for (let i = 0; i < order_table.length; i++) {
        if (order_table[i].name == InputSearch) {
            searchTab.innerHTML += selectLine[i+1].innerHTML
            name_table.push(order_table[i])
            flag = 'customerName'
        }
        if (order_table[i].travel_name == InputSearch) {
            searchTab.innerHTML += selectLine[i+1].innerHTML
            city_table.push(order_table[i])
            flag = 'cityName'
        }
    }

    if(flag == 'customerName'){
        profitTot(name_table)
    } else if(flag == 'cityName'){
        profitTot(city_table)
    } 
    profit.innerHTML = tot+'$'
}

function addDest(){
    //let tabOfChoice = document.querySelector('.TabOfChoice tbody');
    let newDest = document.querySelectorAll('.addDestination input');
    let newObject = {
        code: (destination_table[destination_table.length-1].code)+1,
        name: newDest[0].value.charAt(0).toUpperCase() + newDest[0].value.substr(1),
        price: newDest[1].value
    }
    destination_table.push(newObject);
    addInTable()

    let idSelect = document.getElementById("city");
    let newOption = document.createElement("option");
    newOption.text = newObject.name;
    idSelect.add(newOption);
}







// function searchName(){
//     let searchTravelName = document.querySelectorAll('.searchName');
//     let selectLine = document.querySelectorAll('.TabOfReg tr');
//     let Isearch = document.getElementById('inputSearchName').value;
//     let searchDestName = document.querySelector('.RegSearchByName tbody');
//     let amount_Custommer = document.getElementById('amountCustommer');
//     let tot = 0

//     searchDestName.innerHTML = ''
//     for(let i = 0; i<searchTravelName.length; i++){
//         if(searchTravelName[i].innerHTML == Isearch){
//             alert(selectLine[i].innerHTML)
//             searchDestName.innerHTML += selectLine[i+1].innerHTML.replace('class=\"searchName\"','')
//         }
//     }
//     amount_Custommer.innerHTML
//     let lineTab = document.querySelectorAll('.RegSearchByName tr');
//     let searchTotal = document.querySelectorAll('.RegSearchByName .tot');

//     for(let i=0; i<lineTab.length-1; i++){
//         tot += parseFloat(searchTotal[i].innerText)
//     }
//     amount_Custommer.innerHTML = tot+'$'
// }
    



// function searchCountry(){
//     let SelectCitySearch = document.getElementById('city').value;
//     let searchDestByCity = document.querySelector('.RegSearchByCountry tbody');
//     let selectLines = document.querySelectorAll('.TabOfReg tr');
//     let profitByCity = document.getElementById('profitCountry');
//     tots = 0;

//     searchDestByCity.innerHTML = ''
//     for (let i = 0; i < order_table.length; i++) {
//         if (order_table[i].travel_name == SelectCitySearch) {
//             searchDestByCity.innerHTML += selectLines[i+1].innerHTML
//             city_table.push(order_table[i])
//         }
//     }

//     for(let i=0; i<city_table.length; i++){
//         tots += city_table[i].total
//     }
//     profitByCity.innerHTML = tots+'$'
//     city_table.splice(0, city_table.length);
// }

// function searchCountry(){
//     let searchTravelCity = document.querySelectorAll('.ssearchCountry');
//     let selectline = document.querySelectorAll('.TabOfReg tr');
//     let citySearch = document.getElementById('city').value;
//     let searchDest = document.querySelector('.RegSearchByCountry tbody');
//     let amount_Country = document.getElementById('amountCountry');
//     let _tot = 0;

//     searchDest.innerHTML = ''
//     for(let i = 0; i<searchTravelCity.length; i++){
//         if(searchTravelCity[i].innerHTML == citySearch){
//             alert(selectline[i].innerHTML)
//             searchDest.innerHTML += selectline[i+1].innerHTML.replace('class=\"ssearchCountry\"','')
//         } 
//     }
//     amount_Country.innerHTML = ''
//     let lineTab = document.querySelectorAll('.RegSearchByCountry tr');
//     let searchTot = document.querySelectorAll('.RegSearchByCountry .tot');

//     for(let i=0; i<lineTab.length-1; i++){
//         _tot += parseFloat(searchTot[i].innerText)
//     }
//     amount_Country.innerHTML = _tot+'$'
// } 