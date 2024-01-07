

function selectGroupMeniuItem(groupName) {
    cy.contains('a', groupName).then( menu =>{
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr =>{
            if(attr.includes('left')){
                cy.wrap(menu).click()
            }
        })
    })
}

export class NavigationPage{

    formLayoutsPage(){
        selectGroupMeniuItem('Form')
        cy.contains("Form Layouts").click()
    }

    datePickerPage(){
        selectGroupMeniuItem('Form')
        cy.contains('Datepicker').click()
    }
    toasterPage(){
        selectGroupMeniuItem('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    smartTablePage(){
        selectGroupMeniuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }
    tooltipPage(){
        selectGroupMeniuItem('Modal & Overlays')
        cy.contains("Tooltip").click()
    }
        
}

export const navigateTo = new NavigationPage()
