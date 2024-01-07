function selectDayFromCurrent(day) {
    let date = new Date(); 
    date.setDate(date.getDate() + day); 
    let futureDay = date.getDate();
    let futureMoth = date.toLocaleDateString("en-US", { month: "short" }); 
    let futureYear = date.getFullYear(); 
    let dateToAssert = `${futureMoth} ${futureDay}, ${futureYear}`; 
    cy.get("nb-calendar-navigation").invoke("attr", "ng-reflect-date").then((dateAttribute) => {
        if (!dateAttribute.includes(futureMoth) || !dateAttribute.includes(futureYear)) {
          cy.get('[data-name="chevron-right"]').click();
          selectDayFromCurrent(day);
        } else {
          cy.get(".day-cell").not(".bounding-month").contains(futureDay).click();
        }
      })
      return dateToAssert
    }

export class DatepickerPage{

    sellectCommonDatepickerDatefromToday(dayFromToday){
        cy.contains("nb-card", "Common Datepicker").find("input").then((input) => {
            cy.wrap(input).click(); 
            let dateToAssert = selectDayFromCurrent(dayFromToday); 
            cy.wrap(input).invoke("prop", "value").should("contain", dateToAssert);
            cy.wrap(input).should("have.value", dateToAssert); 
         });
    }

    selectDatepickerWithrangeFromToday(firstDay, secondDay){
        cy.contains('nb-card',  'Datepicker With Range').find("input").then((input) => {
            cy.wrap(input).click(); 
            let dateToAssertFirst = selectDayFromCurrent(firstDay); 
            let dateToAssertSecond = selectDayFromCurrent(secondDay);
            const finalDate = dateToAssertFirst+ '-'+ dateToAssertSecond
            cy.wrap(input).invoke("prop", "value").should("contain", dateToAssert);
            cy.wrap(input).should("have.value", dateToAssert); 
        });
    }
}

export const onDataPickerPage = new DatepickerPage()