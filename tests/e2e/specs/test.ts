// https://docs.cypress.io/api/commands/window#Arguments
// 테스팅 라이브러리 : https://testing-library.com/docs/cypress-testing-library/intro
// 테스팅 라이브러리 설치 npm install --save-dev cypress @testing-library/cypress

import "@testing-library/cypress/add-commands";

describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Welcome to Your Vue.js + TypeScript App");
  });
});

describe("테스팅 라이브러리 사용", () => {
  it("테스트로 접근", () => {
    cy.findByText("DOM 접근").click();
    cy.findByPlaceholderText("이메일 입력").type("입력방법");
  });
});
