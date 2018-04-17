import puppeteer from 'puppeteer'
import { userStore } from '../__mocks__/static-data'

const isDebugging = () => {
  const debuggingMode = {
    headless: false,
    slowMo: 250,
    devtools: true
  }
  return process.env.NODE_ENV === 'debug' ? debuggingMode : {}
}

let browser
let page
beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging())
  page = await browser.newPage()
  const user = await page.evaluate(version => window.localStorage.setItem('user', userStore.user))
  await page.goto('http://localhost:3000/')
  page.setViewport({ width: 500, height: 2400 })
})

describe('Home page', () => {
  xtest('Page title should be correct', async () => {
    await page.screenshot({ path: '__tests__/home-page.png', fullPage: true });
    const html = await page.$eval('.page-title', e => e.innerHTML)
    expect(html).toBe('Login')
  }, 16000)

  xtest('nav loads correctly', async () => {
    const navbar = await page.$eval('.navbar', el => el ? true : false)
    const navItems = await page.$$('.nav-item')
    expect(navbar).toBe(true)
    expect(navItems.length).toBe(2)
  })
})

afterAll(() => {
  if (isDebugging()) {
    browser.close()
  }
})

