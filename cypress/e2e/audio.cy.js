describe('Audio Player', () => {
    it('Plays Audio', () => {
      cy.visit("/");
      
      cy.get(".composition-name:first").click(); // click audio 
      cy.get("#play-btn").click(); //play audio 
      cy.wait(5000); // wait 5 sec
      cy.get("#player-play-btn").click(); //pause audio      
    })
  })