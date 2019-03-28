import { Builder, ThenableWebDriver, until, By } from 'selenium-webdriver';
import * as path from 'path';

const getElementById = async (driver: ThenableWebDriver, id: string, timeout = 2000) => {
   const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
   return await driver.wait(until.elementIsVisible(el), timeout);
};

describe('webdriver', () => {
   let driver: ThenableWebDriver;

   beforeAll(async () => {
      // const options = new firefox.Options();
      // options.headless();
      // driver = new Builder()
      //    .forBrowser('firefox')
      //    .setFirefoxOptions(options)
      //    .build();

      // driver = new Builder().withCapabilities(Capabilities.chrome()).build();
      // driver = new Builder().forBrowser('chrome').build();
      // driver = new Builder().forBrowser('firefox').build();
      driver = new Builder().forBrowser('ie').build();

      // eslint-disable-next-line no-undef
      await driver.get('file://' + path.join(__dirname, '../../build/index.html'));
      // await driver.get('https://www.google.com/');
   });

   afterAll(async () => {
      // await driver.quit();
   });

   const sleep = (ms: number) => {
      return new Promise(resolve => setTimeout(resolve, ms));
   };

   const cellClick = async (id: string) => {
      (await getElementById(driver, id)).click();
      // await sleep(10);
   };

   test('test', async () => {
      const rootElement = await getElementById(driver, 'root');
      const rootText = await rootElement.getText();
      // console.log(text);
      expect(rootText).toContain('Hello World');

      await cellClick('cell0');
      await cellClick('cell1');
      await cellClick('cell4');
      await cellClick('cell5');
      await cellClick('cell8');

      // await sleep(10);
      const statusElement = await getElementById(driver, 'status');
      const statusText = await statusElement.getText();
      // console.log(statusText);
      expect(statusText).toContain('Player 1 won');

      // const output = await getElementById(driver, 'output');
      // const outputVal = await output.getAttribute('value');
      // expect(outputVal).toEqual('Something');
   });
});
