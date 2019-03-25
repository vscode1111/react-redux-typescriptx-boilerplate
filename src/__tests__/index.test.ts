import { Builder, ThenableWebDriver, until, By } from 'selenium-webdriver';
// import * as firefox from 'selenium-webdriver/firefox';
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
      driver = new Builder().forBrowser('chrome').build();
      // driver = new Builder().forBrowser('firefox').build();

      // eslint-disable-next-line no-undef
      await driver.get('file://' + path.join(__dirname, '../../build/index.html'));
      // await driver.get('https://www.google.com/');
   });

   afterAll(async () => {
      await driver.quit();
   });

   test('test', async () => {
      const root = await getElementById(driver, 'root');
      const text = await root.getText();
      // console.log(text);
      expect(text).toContain('Hello World');

      // const output = await getElementById(driver, 'output');
      // const outputVal = await output.getAttribute('value');
      // expect(outputVal).toEqual('Something');
   });
});
