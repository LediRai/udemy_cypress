import { onDataPickerPage } from "../support/page_objects/datePickerPage"
import { onFormLayoutPage } from "../support/page_objects/formLayoutPage"
import { navigateTo } from "../support/page_objects/navigationPages"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe('Test with Page Objects', () =>{

    beforeEach('open  application', () =>{
        cy.visit('/')
    })

    // it('verify navigation across the pages', () =>{
    //     navigateTo.formLayoutsPage()
    //     navigateTo.datePickerPage()
    //     navigateTo.smartTablePage()
    //     navigateTo.tooltipPage()
    //     navigateTo.toasterPage()
        
    // })

    it('should submit Inline and Basic form select tomortow date in the calander', () =>{
        navigateTo.formLayoutsPage()
        onFormLayoutPage.submitInlineFormWithNameAndEmail('Birute', 'test@test.com')
        onFormLayoutPage.fillSecondForm('test@test.com', 'tratatata')
        navigateTo.datePickerPage()
        onDataPickerPage.sellectCommonDatepickerDatefromToday(1)
        onDataPickerPage.sellectCommonDatepickerDatefromToday(7, 14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstNameAndLastName('birute', 'vanduo')
        onSmartTablePage.updateAgeByFirstName('birute','29'),
        onSmartTablePage.deleteRowByIndex(1)
    })

})
