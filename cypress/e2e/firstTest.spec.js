/// <reference types="cypress" />

const { first } = require("rxjs-compat/operator/first");

describe("First test suite", () => {
  it("first test", () => {
    cy.visit("/"); //// Atidaromas pagrindinis puslapis
    cy.contains("Forms").click(); // Pasirenkama "Forms" kategorija
    cy.contains("Form Layouts").click(); // Pasirenkama "Forms" kategorija

    //by Tag name
    cy.get("input");
    // by id
    cy.get("#inputEmail1");
    // by class value
    cy.get(".input-full-width");
    // by atribute name
    cy.get("[fullwidth]");
    // by atribute name and value
    cy.get('[placeholder="Email"]');
    // by entire class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');
    // by two atributes
    cy.get('[placeholder="Email"][fullwidth]');
    // by tag atribute id and class
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');
    // by cypress id
    cy.get('[data-cy="imputEmail1"]');
  });
  it("second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    //theory
    // get() - fined elements on the page by locator globaly
    // fined() fined chil elements by locator
    // conteins() - fined html text and locator iesko pirmo atitikimo

    cy.contains("Sign in"); //Ieškoma teksto "Sign in" puslapyje.
    cy.contains('[status="warning"]', "Sign in"); // Ieškoma teksto "Sign in", kuris yra elemento su atributu status="warning" viduje.
    cy.contains("nb-card", "Horizontal form").find("button"); // Ieškoma mygtuko elemento, kuris yra "nb-card" elemento su tekstu "Horizontal form" viduje.
    cy.contains("nb-card", "Horizontal form").contains("Sign in"); // Ieškoma teksto "Sign in", kuris yra "nb-card" elemento su tekstu "Horizontal form" viduje.
    cy.contains("nb-card", "Horizontal form").get("button"); // fined all buttons in the page eškoma visų mygtukų puslapyje, kurie yra "nb-card" elemento su tekstu "Horizontal form" viduje.

    // cypress chain and dom
    cy.get("#inputEmail3")
      .parents("form")
      .find("button") //: Ieškoma mygtuko elemento, kuris yra "form" elemento su id "inputEmail3" tėvinis.
      .should("contain", "Sign in") //Tikrinama, ar rastas mygtukas turi teksto "Sign in".
      .parents("form")
      .find("nb-checkbox")
      .click(); // Ieškoma checkbox elemento, kuris yra "form" elemento tėvinis, ir jis spaudžiamas.
  });
  it("third test", () => {
    //irasomas kodas
  });

  it("save subject of the command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[for="inputEmail1"]')
      .should("contain", "Email");
    cy.contains("nb-card", "Using the Grid")
      .find('[for="inputPassword2"]')
      .should("contain", "Password");

    // CANT DO LIKE THIS IT IS INCCORECT
    // const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
    // usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email')
    // usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password')

    // 1 cypress alieas,, as('usingTheGrid') yra globalus ir galima visur ji naudoti
    cy.contains("nb-card", "Using the Grid").as("usingTheGrid");
    cy.get("@usingTheGrid")
      .find('[for="inputEmail1"]')
      .should("contain", "Email");
    cy.get("@usingTheGrid")
      .find('[for="inputPassword2"]')
      .should("contain", "Password");

    // 2 cypress then() methods , cy.wrap negalima naudoti uz funkcijos ribu nes neveiks / then: single metod, function in the single place
    cy.contains("nb-card", "Using the Grid").then((usingTheGridForm) => {
      cy.wrap(usingTheGridForm)
        .find('[for="inputEmail1"]')
        .should("contain", "Email");
      cy.wrap(usingTheGridForm)
        .find('[for="inputPassword2"]')
        .should("contain", "Password");
    });
  });
  it("extract test values", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // 1
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address"); //Tikrinama, ar elemento su atributu for="exampleInputEmail1" tekste yra "Email address".

    //2
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      const labeltext = label.text(); // Gaunamas etiketės tekstas
      expect(labeltext).to.equal("Email address"); // Tikrinama, ar etiketės tekstas yra 'Email address'
      cy.wrap(labeltext).should("contain", "Email address"); // Patikrinama, ar etiketės tekstas turi 'Email address'
    });

    //3
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address"); // Tikrinama, ar etiketės tekstas yra 'Email address'
      });

    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .as("labeltext")
      .should("contain", "Email address"); // Etiketės tekstas yra iškviečiamas ir saugomas kaip 'labeltext'
    //4
    cy.get('[for="exampleInputEmail1"]')
      .invoke("attr", "class")
      .then((classValue) => {
        expect(classValue).to.equal("label"); // Tikrinama, ar etiketės klasė yra 'label'
      });

    //5 invoke proparty
    cy.get("#exampleInputEmail1").type("test@test.com"); // Įvedama tekstinė reikšmė į įvesties lauką su id 'exampleInputEmail1'
    //cy.get('#id="exampleInputEmail1"').should('cotntain', 'test@tes.com') // neveiks nes tai nera httml kodas
    cy.get("#exampleInputEmail1")
      .invoke("prop", "value")
      .should("contain", "test@test.com")
      .then((property) => {
        expect(property).to.equal("test@test.com"); // Tikrinama, ar įvesties lauko savybė 'value' yra 'test@test.com'
      });
  });

  it("radio button ", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons).eq(0).check({ force: true }).should("be.checked");
        cy.wrap(radioButtons).eq(1).check({ force: true }); // tikrinama jei yra pasleptas
        cy.wrap(radioButtons).eq(0).should("not.be.checked");
        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("checkbox ", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    cy.get('[type="checkbox"]').check({ force: true }); // Ieškoma visų puslapyje esančių varnelių (checkbox'ų) pagal jų tipą ir pažymima (pažymėjimas gali būti įvykdomas net jei varnelė yra paslėpta arba neįmanoma įvykdyti paprasto pažymėjimo).
    cy.get('[type="checkbox"]').uncheck({ force: true }); // nuima visur varneles
    cy.get('[type="checkbox"]').eq(0).click({ force: true }); //Pažymima pirma varnelė sąraše, nepriklausomai nuo to, ar ji yra jau pažymėta ar ne.
    cy.get('[type="checkbox"]').eq(1).check({ force: true }); //Pažymima antra varnelė sąraše, nepriklausomai nuo to, ar ji yra jau pažymėta ar ne.

    //Pastaba: {force: true} naudojimas yra opcionales, ir jis nurodo, kad cypress turėtų praleisti tam tikrus įvykius, kurie gali trukdyti įvykdyti pažymėjimą arba atžymėjimą
    //(pvz., jei varnelė yra paslėpta arba neaktyvuota). Tai kartais būtina, jei įvykiai yra užmaskuoti kitomis funkcijomis, ir tiesioginis pažymėjimas/arba atžymėjimas yra neįmanomas.
    // Tačiau, geriau būtų siekti rašyti testus, kurie būtų mažiau priklausomi nuo {force: true} parametro, nes tai gali sumažinti testų stabilumą.
  });

  it("date piker", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    //cy.contains('nb-card', 'Common Datepicker' ): Ieško elemento, kuris turi klasę 'nb-card' ir tekste turi frazę 'Common Datepicker'.
    //.find('input'): Randa viduje esantį input elementą šiame 'nb-card' elemente. Tai gali būti laukelis, skirtas datų pasirinkimui.
    //then(input => { cy.wrap(input).click() }): Pasirinktas input elementas (datų pasirinkimo laukelis) yra užgaubtas (wrap), ir įvykdomas click() veiksmas, t.y., jis bus paspaustas.
    //.find('input'): Randa viduje esantį input elementą šiame 'nb-card' elemente. Tai gali būti laukelis, skirtas datų pasirinkimui.

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        cy.get(".day-cell").not(".bounding-month").contains("21").click(); //Atrenkamos dienų langelės, kurios turi klasę 'day-cell', nepriskiriamos 'bounding-month' ir tekste turi '21'. Vykdomas click() veiksmas ant pasirinktos dienos.
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", "Jan 21, 2024"); //Iš naujo užgaubtas input elementas, iš kurio buvo paspausta, yra naudojamas, kad būtų gautas jo 'value' atributas per .invoke('prop', 'value'). Tada patikrinama, ar 'value' atributas turi teksto dalį 'Jan 21, 2024'.
        cy.wrap(input).should("have.value", "Jan 21, 2024"); // Čia dar kartą užgaubtas input elementas, ir naudojama .should('have.value','Jan 21, 2024'), patikrinant, ar 'value' atributas atitinka nurodytą tekstą 'Jan 21, 2024'.
      });
  });
  it("date piker + dienu skaicius", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    let date = new Date();
    date.setDate(date.getDate() + 4);
    let futureDate = date.getDate();
    let dateToAssert = `Jan ${futureDate}, 2024`;

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        cy.get(".day-cell").not(".bounding-month").contains(futureDate).click();
        cy.wrap(input).invoke("prop", "value").should("contain", dateToAssert);
        cy.wrap(input).should("have.value", dateToAssert);
      });
  });

  it("date piker + skirtingi menesiai ir metai", () => {
    function selectDayFromCurrent(day) {
      let date = new Date(); //Sukuriama nauja dabartinės datos objektas.
      date.setDate(date.getDate() + day); //Sukuriama nauja dabartinės datos objektas.
      let futureDay = date.getDate(); //Gaunama diena iš naujai sukurto datų objekto.
      let futureMoth = date.toLocaleDateString("en-US", { month: "short" }); //Gaunamas sutrumpintas (trumpasis) mėnesio pavadinimas (en-US šiuo atveju nurodo, kad naudosime anglų kalbą).
      let futureYear = date.getFullYear(); //Gaunamas metai iš naujai sukurto datų objekto.
      let dateToAssert = `${futureMoth} ${futureDay}, ${futureYear}`; //Sukuriama tekstą, kuris atitinka pageidaujamą datą.
  
      //Sukuriama funkcija, kuri leis pasirinkti dieną iš dabartinio mėnesio, ir, jei reikia, persijungti į kitą mėnesį.
      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          if (
            !dateAttribute.includes(futureMoth) ||
            !dateAttribute.includes(futureYear)
          ) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(day);
          } else {
            cy.get(".day-cell")
              .not(".bounding-month")
              .contains(futureDay)
              .click();
          }
        })
        return dateToAssert
    }
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();
    cy.contains("nb-card", "Common Datepicker").find("input").then((input) => {
        cy.wrap(input).click(); //Ieškoma input laukelio, kuris susijęs su datų pasirinkimu.Paspaudžiamas input laukelis, kad atidarytų datų pasirinkimo laukelį.
        let dateToassert = selectDayFromCurrent(5); //yra skirta užtikrinti, kad būtų pasirinkta teisinga diena, net jei ji yra kitoje mėnesio dalyje.
        cy.wrap(input).invoke("prop", "value").should("contain", dateToAssert); //Tikrinama, ar pasirinkta data yra atvaizduojama input laukelyje ir ar ji atitinka pageidaujamą rezultatą.
        cy.wrap(input).should("have.value", dateToAssert); //Tikrinama, ar input laukelio 'value' atributas yra toks pat kaip ir pageidaujama data.
      });

    // 26 PAMOKOJE YRA KODO PERTVARKYMAS
  });

  it("list ir drobdaowns meniu", () => {
    cy.visit("/");

    //identifikuoti  dropdown
    // cy.get('nav'). find('nb-select').click()
    // antras variantas
    cy.get("nav nb-select").click(); // // Gauname elementą pagal jo id
    cy.get(".options-list").contains("Dark").click(); //// Keičiame elemento teksto turinį
    cy.get("nav nb-select").should("contain", "Dark"); //// Pridedame naują klasę elemento savybei

    //2

    cy.get("nav nb-select").then((dropDown) => {
      cy.wrap(dropDown).click(); //Išplečiamas dropdown sąrašas.
      cy.get(".options-list nb-option").each((listItem, index) => {
        const itemText = listItem.text().trim(); // trim() metodas, kad pašalintų galimus tarpus iš pradžios ir pabaigos.
        cy.wrap(listItem).click(); //Pasirenkamas ir simuliuojamas paspaudimas ant sąrašo elemento.
        cy.wrap(dropDown).should("contain", itemText); //Tikrinama, ar pasirinktas dropdown elementas (dropDown) atitinka naujai pasirinkto sąrašo elemento tekstą.
        cy.wrap(dropDown).click();
        if (index < 3) {
          //Patikrinama, ar šiuo metu apdorojamas sąrašo elementas yra mažesnis nei trečiasis. Jei taip, vykdomas kodas viduje.
          cy.wrap(dropDown).click(); //Papildomas paspaudimas ant dropdown elemento (jei sąlyga tenkinama), siekiant išlaikyti dropdown atidarytą.
        }
      });
    });
  });
  it("table", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    // 1 how to get the row of table

    cy.get("tbody")
      .contains("tr", "Larry").then((tableRow) => { //Surandama lentelės eilutė (tr elementas), kurioje yra teksto "Larry". Rasta eilutė yra apvyniota ir perduodama į then funkciją kaip tableRow.
        cy.wrap(tableRow).find(".nb-edit").click(); //atidaromas redagavimo režimas.
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("34");// ieskomas ivesties laukas, jame pasalinama informacija ir ir irasoma nauja informacija
        cy.wrap(tableRow).find(".nb-checkmark").click()//  įvykdomas patvirtinimo veiksmas
        cy.wrap(tableRow).find("td").eq(6).should("contain", "34") //tikrinama ar teisingai atnaujinta reiksme
    });


        //2 get row by index

    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then(tableRow =>{
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("Ledi")
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type("birute")
        cy.wrap(tableRow).find(".nb-checkmark").click()
    })

    cy.get('tbody tr').first().find('td').then(tableCollumns => {
        cy.wrap(tableCollumns).eq(2).should('contain', 'Ledi')
        cy.wrap(tableCollumns).eq(3).should('contain', 'birute')
    })
    //3 delete

    const age = [20, 30, 40, 200]
    cy.get('thead [placeholder="Age"]').clear.type(age)
    cy.wait(500)
    cy.get('tbody tr').each( tableRow =>{
      if(age == 200){
        cy.wrap(tableRow).should('contain', 'No data found')
      }else{
        cy.wrap(tableRow).find('td').eq(6).should('contain', age)
      }
    })


  });


  it('pop up', () =>{

    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();

    cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
    cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    

  }) 
  it('dialog', () =>{
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    //1
    cy.get('tbody tr').first().find('.nb-trash').click()
    // paspaudus ant siuk.dezes islenda narsykles pranesimas. atliekant testa yra rodomas pranesimo tekstas taciau nera matoma pranesimo lentele
    cy.on('window:confirm', (confirm) =>{
        expect(confirm).to.equal('Are you sure you want to delete?')
    })

    //2
    const stub = cy.stub()
    cy.on('window:confirm', stub)
    cy.get('tbody tr').first().find('.nb-trash').click().then(() =>{
        expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    })

    //3
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', (confirm) => false)


  })




  
});



//pavyzdys
// describe('First test suite', ()=>{
//     describe('suite section', ()=>{
//         beforeEach('login', () =>{
//             //reapeat for every test
//         })

//         it('first test', () =>{
//             //irasomas kodas
//         })
//         it('second test', () =>{
//             //irasomas kodas
//         })
//         it('third test', () =>{
//             //irasomas kodas
//         })
//     })
//     // nebus naudojamas  apacioje pateiktam testui "beforeEach"
//     it('first test', () =>{
//         //irasomas kodas
//     })
//     it('second test', () =>{
//         //irasomas kodas
//     })
//     it('third test', () =>{
//         //irasomas kodas
//     })
// })
// describe('First test suite', ()=>{

//     it('first test', () =>{
//         //irasomas kodas
//     })
//     it('second test', () =>{
//         //irasomas kodas
//     })
//     it('third test', () =>{
//         //irasomas kodas
//     })
// })
