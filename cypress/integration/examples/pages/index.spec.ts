

beforeEach(() => {
    cy.visit('http://localhost:3000/');
})

describe('Search', () => {
    it('Should focus the text box on pressing S', () => {
        cy.get("body").type("S");
        cy.get('input[type="text"]').then($searchTextBox =>
            cy.focused().then($focused => {
                expect($focused[0]).to.eql($searchTextBox[0])
            }));

    });

    it("Should return results that match a search query", () => {
        cy
            .get('input[type="text"]').type("service");

        cy
            .get('[data-test]')
            .first()
            .should("have.attr", 'data-test')
            .and("match", /service/gi);
    });
});

describe('Load more', () => {
    it('Clicking load more load additional items', () => {
        cy.get('button[data-test="loadmore"]').click();
        cy.get("[data-test]").should("have.length.above", 10);
    });

});


