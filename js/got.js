//starting got site



async function fetchChar(){

    let page = 1;
    let charList = [];
    let lastResult = [];
do {
    try {
        const response = await fetch(`https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=50`);
        const charData = await response.json();
        lastResult = charData;
        // console.log(charData)
        charData.forEach(arr=>{
            const {name, aliases, allegiances} = arr;
            charList.push({name, aliases, allegiances});
        });
        page++;
    }catch(err){
        console.error(`Here's where it went wrong ${err}`);
    }
} while (lastResult.length !== 0);
console.log(charList)
// console.log(charList[15].allegiances[0])
let houses = []
for(let i = 0; i < charList.length;i++){
    if(charList[i].allegiances != ""){
        let url = charList[i].allegiances[0]
        const hData = await fetch(`${url}`);
        const house = await hData.json();
        const {name, region, words, coatOfArms} = house;
        houses.push({name, region, words, coatOfArms});
        console.log(houses)
    }
}

}

fetchChar();
