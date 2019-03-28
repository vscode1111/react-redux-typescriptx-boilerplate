import { Builder, ThenableWebDriver, until, By, WebDriver, Capabilities } from 'selenium-webdriver';
import * as firefox from 'selenium-webdriver/firefox';
import * as path from 'path';

const getElementById = async (driver: ThenableWebDriver, id: string, timeout = 20000) => {
   // const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
   // return await driver.wait(until.elementIsVisible(el), timeout);
   return await driver.findElement(By.id(id));
};

describe('webdriver', () => {
   let drivers: ThenableWebDriver[] = [];

   beforeAll(async () => {
      jest.setTimeout(10000);

      const chromeDriver = new Builder().withCapabilities(Capabilities.chrome()).build();
      drivers.push(chromeDriver);

      const ieDriver = new Builder().withCapabilities(Capabilities.ie()).build();
      drivers.push(ieDriver);

      const options = new firefox.Options().setBinary('C:\\Program Files\\Mozilla Firefox\\firefox.exe');
      const firefoxDriver = new Builder().withCapabilities(Capabilities.firefox()).setFirefoxOptions(options).build();
      drivers.push(firefoxDriver);

      for (const driver of drivers) {
         await driver.get('file://' + path.join(__dirname, '../../build/index.html'));
      }
      // await driver.get('https://www.google.com/');
   });

   afterAll(async () => {
      for (const driver of drivers) {
         await driver.quit();
      }
   });

   const sleep = (ms: number) => {
      return new Promise(resolve => setTimeout(resolve, ms));
   };

   const clickCell = async (driver: ThenableWebDriver, id: string) => {
      const element = await getElementById(driver, id);
      await element.click();
      // await sleep(100);
   };

   const testByManyDrivers = async (fn: (driver: ThenableWebDriver) => void) => {
      for (const driver of drivers) {
         await fn(driver);
      }
   };

   it('test', async () => {
      await testByManyDrivers(async (driver) => {
         const cap = await driver.getCapabilities();
         console.log(`${cap.get('browserName')}`);
         const rootElement = await getElementById(driver, 'root');

         const rootText = await rootElement.getText();
         // console.log(rootText);
         expect(rootText).toContain('Hello World');

         await clickCell(driver, 'cell0');
         await clickCell(driver, 'cell1');
         await clickCell(driver, 'cell4');
         await clickCell(driver, 'cell5');
         await clickCell(driver, 'cell8');

         // await sleep(10);
         const statusElement = await getElementById(driver, 'status');
         const statusText = await statusElement.getText();
         // console.log(statusText);
         expect(statusText).toContain('Player 1 won');
      });
   });
});
