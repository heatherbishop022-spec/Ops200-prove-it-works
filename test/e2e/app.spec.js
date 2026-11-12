import express from "express";
import { expect } from "chai";
import path from "path";
import { chromium } from "playwright";

const app = express();
app.use(express.static(path.join(process.cwd(), "dist")));
app.use(express.static(path.join(process.cwd(), "public")));

const url = "http://localhost:3000";

describe("End to End Tests", function () {
  this.timeout(10000);

  let httpServer = null;
  let browser = null;
  let page = null;

  before(async () => {
    httpServer = app.listen(3000);
    browser = await chromium.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(url);
  });

  afterEach(async () => {
    await page.close();
  });

  after(async () => {
    await browser.close();
    httpServer.close();
  });

  it("should contain a <h1> element for the page title", async () => {
    await page.waitForSelector("h1", { timeout: 2000 });
    const header = await page.locator("h1").textContent();
    expect(header).to.not.be.null;
    expect(header.trim()).to.equal("Mortgage Calculator");
  });

  it("should contain a Calculate button", async () => {
    await page.waitForSelector("button#calculate", { timeout: 2000 });
    const text = await page.locator("button#calculate").textContent();
    expect(text.trim()).to.equal("Calculate");
  });

  it("should contain a principal input", async () => {
    await page.waitForSelector("input[name=principal]", { timeout: 2000 });
    const count = await page.locator("input[name=principal]").count();
    expect(count).to.equal(1);
  });

  it("should contain an interest rate input", async () => {
    await page.waitForSelector("input[name=interestRate]", { timeout: 2000 });
    const count = await page.locator("input[name=interestRate]").count();
    expect(count).to.equal(1);
  });

  it("should contain a loan term input", async () => {
    await page.waitForSelector("input[name=loanTerm]", { timeout: 2000 });
    const count = await page.locator("input[name=loanTerm]").count();
    expect(count).to.equal(1);
  });

  it("should have a Monthly option in the period dropdown", async () => {
    await page.waitForSelector("select[name=period]", { timeout: 2000 });
    const text = await page.locator("select[name=period] option[value='12']").textContent();
    expect(text.trim()).to.equal("Monthly");
  });

  it("should have a Quarterly option in the period dropdown", async () => {
    await page.waitForSelector("select[name=period]", { timeout: 2000 });
    const text = await page.locator("select[name=period] option[value='4']").textContent();
    expect(text.trim()).to.equal("Quarterly");
  });

  it("should have an empty output area before calculating", async () => {
    await page.waitForSelector("#output", { state: "attached", timeout: 2000 });
    const text = await page.locator("#output").textContent();
    expect(text.trim()).to.equal("");
  });

  it("should correctly calculate mortgage", async () => {
    await page.fill("input[name=principal]", "300000");
    await page.fill("input[name=interestRate]", "3.75");
    await page.fill("input[name=loanTerm]", "30");
    await page.selectOption("select[name=period]", "12");
    await page.click("button#calculate");
    await page.waitForSelector("#output", { timeout: 4000 });
    const outputText = await page.locator("#output").textContent();
    expect(outputText.trim()).to.equal("$1389.35");
  }).timeout(6500);
});