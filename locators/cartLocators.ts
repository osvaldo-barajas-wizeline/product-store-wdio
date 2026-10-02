export const cartLocators = {
  navCartButton: "#cartur",
  // WDIO text selector: `a=text` matches <a> with exact text content
  productLink: (productName: string) => `a=${productName}`,
  addToCartButton: "a=Add to cart",
  cartTableRows: "#tbodyid tr",
  // XPath to find the full <tr> that contains a <td> with the product name
  cartTableRow: (productName: string) =>
    `//tr[.//td[normalize-space()="${productName}"]]`,
  deleteButton: "a=Delete",
  placeOrderButton: ".btn-success",
  // Place Order modal form fields
  orderNameInput: "#name",
  orderCountryInput: "#country",
  orderCityInput: "#city",
  orderCreditCardInput: "#card",
  orderMonthInput: "#month",
  orderYearInput: "#year",
  purchaseButton: 'button[onclick="purchaseOrder()"]',
  // Confirmation alert
  confirmationModal: ".sweet-alert",
  confirmationTitle: ".sweet-alert h2",
  confirmationOkButton: ".sweet-alert .confirm",
};
