let page = 0;
let Characters = [];
function getChar(page){
    //makes call and converts to json
    fetch(`https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=50`)
    .then(data => data.json())
    //sets up the recursive loop
    .then((data)=>{
        if(data.length > 0){
            page += 1;
            Characters = [...Characters,...data];
            getChar(page);
        }else{
            let charDisp = document.querySelector("#charDisp");
            let charUl = document.createElement("ul");
            //loop through characters
            for( let i = 0; i < Characters.length;i++){
                let li = document.createElement("li");
                //pull out their name or alias if no name
                if(Characters[i].name != ""){
                    let cName = Characters[i].name;
                    li.innerHTML = `<a href ="#">${cName}</a>` ;
                } else {
                    let cName = Characters[i].aliases[0];
                    li.innerHTML = `<a href ="#">${cName}</a>` ;
                }
                if(Characters[i].allegiances != ""){
                    let cHUrl = Characters[i].allegiances
                    fetch(`${cHUrl}`)
                    .then(response=>response.json())
                    .then(house=>{
                        const {name} = house
                        return name
                    })
                }
                charUl.append(li);
            }
            charDisp.append(charUl);
        } // eo else block
    }) //eo .then
} //eo getChar
getChar(page)

















