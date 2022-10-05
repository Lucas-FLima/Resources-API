const puppeteer = require('puppeteer');

const DOFUS_ID = "104";

const DOFUS_URL = `https://www.dofus.com/pt/mmorpg/enciclopedia/recursos?text=&EFFECTMAIN_and_or=AND&object_level_min=1&object_level_max=200&type_id%5B%5D=${DOFUS_ID}&EFFECT_and_or=AND#jt_list`;

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  // Acessando o site
  await page.goto(DOFUS_URL, { waitUntil: `networkidle2` });

  // Fechando PopUp
  await page.click(`.btn.btn-primary.btn-lg.ak-accept`);

  // Pegando informações
  const data = await page.evaluate(() => {
    // Salvando informações dentro do Array
    const tds = Array.from(document.querySelectorAll('tbody tr td'))
    // Manipulando as informações
    return tds.map(td => td.innerText).filter(e => e !== "")
  });

  console.log(data);

  await browser.close();

})();