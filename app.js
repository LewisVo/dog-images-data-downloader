const download = require('image-downloader');
const fs = require('fs');
const Scraper = require('images-scraper')
  , bing = new Scraper.Bing();

const obj = JSON.parse(fs.readFileSync('input.json', 'utf8'));
const originalDir = '/mnt/L/DOG_PHOTOS/';

let options = {
  url: '',
  dest: ''                  // Save to /path/to/dest/image.jpg 
}


async function downloadIMG() {
  try {
    options['dest'] = originalDir + dogBreed;
    if (!fs.existsSync(options['dest'])) {
      fs.mkdirSync(options['dest']);
    }
    const { filename, image } =  await download.image(options);
    console.log("Done !! " + filename);// => /path/to/dest/image.jpg
  } catch (e) {
    throw e
  }
}


function main () {
  for(let item of obj.table) {
    async function startProc() {
      try {
        let res = await bing.list({
          keyword: item['breed'],
          num: 40,
          detail: true,
        });
        onEachRes(res);
      }
      catch (e) {
        throw e
      }
      function onEachRes(res) {
        for (let link of res) {
          options['url'] = link['url'];
          dogBreed = item['breed'];
          downloadIMG();
        }
      }
      
    }
    startProc();
  }
}

main();
