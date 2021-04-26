
const konteineris = document.getElementById('str');
konteineris.style.display = "flex";
konteineris.style.flexWrap = "wrap";
konteineris.style.justifyContent ="center";
const masyvas = [];
const spalvos = [];
var spalvosNr=0;

async function paieska(){
  try {
    let promise = await fetch('https://api.nytimes.com/svc/topstories/v2/science.json?api-key=W5Ukw6inQxXXr9HF1GKKoHu30RxxNtQ4');

    const straipsniai = await promise.json();
    const pradzia = "All";
    kuriamStraipsnius(straipsniai, pradzia);
    kuriamMeniu();

    document.querySelector(".meniu").addEventListener("click", function (e) {
      document.getElementById("str").innerHTML = "";

      kuriamStraipsnius(straipsniai, e.target.textContent);
      
      console.log(e.target.textContent);
      //if (e.target && e.target.matches("li.item")) {
      // e.target.className = "foo"; // 
      //  }
    } );
  } //try
  catch (error) {
    console.log(error);
    
    //console.log(error.statusText);
  }
}

paieska();

function kuriamMasyva(straipsnis){
  if (masyvas.indexOf(straipsnis)==-1) { //jei masyve nera elemento, ji prideti
    masyvas.push(straipsnis); // masyvas rikiavimui pagal pavadinimus, ir meniu
    spalvos.push({   //masyvas spalvoms saugoti pagal section pavadinima. poromis rikiuoti nepavyko
          "Name": straipsnis,
          "Number": `fonas${spalvosNr}`
      });
     if (spalvosNr<7){ //sugeneruoju masyvui Number reiksme, nes css yra 8 spalvu klases 
      spalvosNr =spalvosNr+1;
     }
     else{
      spalvosNr=0;
    }
  }
  //console.log("masyvas1"+masyvas.length);
  //console.log("masyvas2"+spalvos.length);
  //console.log(spalvosNr);
}

function kuriamStraipsnius(straipsniai, pradzia){ //universali funkcija mygtuko paspaudimui ir pradzioje straipsniu isvedimui
  for (let i=0; i<straipsniai.results.length; i++){

    kuriamMasyva(straipsniai.results[i].section);

    if ((straipsniai.results[i].section==pradzia) || (pradzia=="All") ){
      const vienasStr = document.createElement('div');
      vienasStr.style.width = "440px";
      vienasStr.style.margin= "15px";
      vienasStr.style.height= "auto";

      konteineris.appendChild(vienasStr);

      const fotoDiv = document.createElement('div');
      vienasStr.appendChild(fotoDiv);
      vienasStr.classList.add("kont"); //priskiriama klase pavadinimu kont is css failo

      const nuotrauka = document.createElement('img');
      console.log(straipsniai.results[i].multimedia);
if (straipsniai.results[i].multimedia !== null ) {
  nuotrauka.src = straipsniai.results[i].multimedia[0].url; //priskiriamas pirmos foto adresas is foto masyvo. Pirma fotoadresas masyve yra [0]
  }else{
    nuotrauka.src = "404.jpg";
  }

      nuotrauka.width="440";
      nuotrauka.height="200";
      nuotrauka.style.objectFit="cover"; //foto sutalpinimas i div
      fotoDiv.appendChild(nuotrauka);

      const sekcija = document.createElement('div');
      const sekcijaText = document.createElement('p');
      sekcijaText.innerText=straipsniai.results[i].section; //priskiriamas sekcijos pavadinimas p elementui

      sekcija.appendChild(sekcijaText);
      sekcija.classList.add("pav"); //klases pav is ccs failo priskyrimas
      fotoDiv.appendChild(sekcija);

      suteikiamSpalvas (straipsniai.results[i].section, vienasStr, sekcija);

      const pavadinimas = document.createElement('h2');
      const linkas = document.createElement('a');

      linkas.innerText=straipsniai.results[i].title; //priskiriamas straipsnio pavadinimas

      linkas.href = straipsniai.results[i].url;
      linkas.target = "_blank"; //priskiriamas straipsnio pilnas adresas
      vienasStr.appendChild(pavadinimas);
      pavadinimas.style.margin = "10px 20px 10px 20px";
      pavadinimas.appendChild(linkas);

      const santrauka = document.createElement('p');

      santrauka.innerText=straipsniai.results[i].abstract; 
      santrauka.style.textAlign = "justify";
      santrauka.style.margin = "20px 20px 20px 20px";
      vienasStr.appendChild(santrauka);

      const linkas1 = document.createElement('a');
      linkas1.innerText= "Read more...";
      linkas1.href = straipsniai.results[i].short_url;
      linkas1.target = "_blank"; //priskiriamas straipsnio trumpas adresas
      linkas1.style.paddingBottom = "20px";
      vienasStr.appendChild(linkas1);
    }else{

    }
  } //for pabaiga
}

function suteikiamSpalvas(straipsnis, vienasStr, sekcija){
  //console.log(spalvos.length+"spalvu masyvo ilgis");
  for (i=0; i<spalvos.length; i++){
    if (straipsnis==spalvos[i].Name) {
      vienasStr.classList.add(spalvos[i].Number);
      sekcija.classList.add(spalvos[i].Number);
    }
  }
}

function kuriamMeniu(){
  masyvas.sort();
  console.log(masyvas);
  for (let i=0; i<masyvas.length; i++){
    const menuUl = document.querySelector(".meniu");
    const menuLi = document.createElement('li');
    const linkasM = document.createElement('a');
    linkasM.textContent = masyvas[i];
    menuLi.appendChild(linkasM);
    menuUl.appendChild(menuLi);
  }
}