const puppeteer = require("puppeteer");

const IDS = ["104", "108", "107", "63", "96"];

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function xp(site) {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0')

  // Acessando o site
  await page.goto(site, { waitUntil: `networkidle2` });

  // await page.select('body > div.ak-mobile-menu-scroller > div.container.ak-main-container > div > div > div.row > main > div.ak-container.ak-main-center > div.ak-container.ak-panel.main-object-list.ak-nocontentpadding > div.ak-panel-content > div.ak-list-options.ak-listoptions-actions.ak-ajaxloader > div.row > div.col-sm-5 > div > div.ak-displaycount.btn-group > select');

  // Pegando informações
  const data = await page.evaluate(() => {
    // Clicando em 96 itens por Páginas

    // Salvando informações dentro do Array
    const tds = Array.from(document.querySelectorAll("tbody tr td"));

    // Manipulando as informações
    return tds.map((td) => td.innerText).filter((e) => e !== "");
  });

  console.log(data);

  await browser.close();
}

IDS.forEach((e) => {
  const DOFUS_URL = `https://www.dofus.com/pt/mmorpg/enciclopedia/recursos?text=&EFFECTMAIN_and_or=AND&object_level_min=1&object_level_max=200&type_id%5B%5D=${e}&EFFECT_and_or=AND#jt_list`;
  delay(xp(DOFUS_URL), 6000);
});
