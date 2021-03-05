const http = require('http')
const https = require('https');
const fs = require('fs');

const baseRoot = '../comic/test/'
let maxPageNum = 200
const fileType = ".html"
const comicMark = '739'
const chapterReqUrl = "https://www.manhuadb.com/manhua/" + comicMark
const chapterFile = baseRoot + 'chapter.json'
const imagesJsonFileName = 'images.json'
const emptyJsonFileName = 'empty.json'

const defaultHttpsOptions = {
  method: 'GET',
  timeout: 1 * 60 * 1000,
  // hostname: 'www.baidu.com',
  // port: 80,
  // path: '/',
};
function request(url, options = defaultHttpsOptions) {
  return new Promise((resolve, reject) => {
    https.get(url, options, (res) => {
      // console.log('状态码:', res.statusCode);
      const { statusCode } = res

      let error;
      // 任何 2xx 状态码都表示成功的响应，但是这里只检查 200。
      if (statusCode !== 200) {
        error = new Error('请求失败\n' +
          `状态码: ${statusCode}`);
      }
      if (error) {
        reject(error.message);
        // 消费响应的数据来释放内存。
        res.resume();
        return;
      }

      res.setEncoding('utf8');
      let backData = '';
      res.on('data', (data) => {
        backData = data;
      });
      res.on('end', () => {
        console.log('end data', backData)
      })

    }).on('error', (e) => {
      reject(e);
    });
  }).catch(e => {
    console.error('request error', e)
  })
}




// 获取所有章节数据，并存放到本地
async function getChaptersData() {
  const result = await request(chapterReqUrl)
  // const result = await request()
  console.info('result', result)

}

// 单独获取图片并存放到本地 json 文件
function getImagesData() {
  // with open(chapterFile, "r", encoding = "utf-8") as f:
  // content = f.read()
  // chapterList = json.loads(content)
  // chapterNum = len(chapterList)
  // startDire = 1
  // while startDire <= chapterNum:
  //   startDownChapter = chapterList[startDire - 1]
  // utils.createFold(baseRoot, str(startDire))
  // get_every_img_address_html(str(startDire), str(startDownChapter))
  // startDire += 1
}

getChaptersData()