const download = require('image-downloader');
const fs = require('fs');
const Scraper = require('images-scraper')
  , bing = new Scraper.Bing();

const obj = JSON.parse(fs.readFileSync('input.json', 'utf8'));
const originalDir = '/home/luongvo/DOG_PHOTOS';



async function downloadIMG(options) {
  for (let option of options) {
    try {
      if (!fs.existsSync(option['dest'])) {
        fs.mkdirSync(option['dest']);
      }
      const { filename, image } = await download.image(option);
      console.log("Done !! " + filename);// => /path/to/dest/image.jpg
    } catch (e) {
      throw e
    }
  };
}


async function main() {
  let options = [];
  for (let item of obj.table) {
    res = await bing.list({
      keyword: item['breed'],
      num: 10,
      detail: true,
      // nightmare: {
      //   show: true
      // }
    });
    options.push({
      url: res['url'],
      dest: originalDir + '/' + item['breed']
    });

  }
  downloadIMG(options);
}

main();
