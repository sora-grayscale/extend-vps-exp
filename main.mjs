import puppeteer from 'puppeteer'
import { setTimeout } from 'node:timers/promises'
import { sendGotifyNotification } from './gotify.mjs'

const browser = await puppeteer.launch({
    defaultViewport: { width: 1080, height: 1024 },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const [page] = await browser.pages()
const recorder = await page.screencast({ path: 'recording.webm' })

try {
    await page.goto('https://secure.xserver.ne.jp/xapanel/login/xserver/', { waitUntil: 'networkidle2' })
    await page.locator('#memberid').fill(process.env.EMAIL)
    await page.locator('#user_password').fill(process.env.PASSWORD)
    await page.locator('text=ログインする').click()
    await page.waitForNavigation({ waitUntil: 'networkidle2' })
    await page.goto('https://secure.xserver.ne.jp/xapanel/xvps/index', { waitUntil: 'networkidle2' })
    await page.locator('.contract__menuIcon').click()
    await page.locator('text=契約情報').click()
    await page.locator('text=更新する').click()
    await page.locator('text=引き続き無料VPSの利用を継続する').click()
    await page.waitForNavigation({ waitUntil: 'networkidle2' })
    await page.locator('text=無料VPSの利用を継続する').click()
    console.log("VPS処理が正常に完了しました");
    await sendGotifyNotification("VPS処理完了", "VPS処理が正常に完了しました");
} catch (e) {
    console.error(e)
    await sendGotifyNotification("VPS処理エラー", `VPS処理でエラーが発生しました: ${e.message}`, 8);
} finally {
    await setTimeout(5000)
    await recorder.stop()
    await browser.close()
}
