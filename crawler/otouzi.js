/**
 * TODO 捕获天标和月标
 */
const {requestMeothods, myLogger} = require('./lib/util.js');
const cheerio = require('cheerio');
const open = require('open');

let isOpen = [];

const config = {
  otouzi:{
    name:'otouzi',
    url:'https://www.otouzi.com/p2p',
    filter(html){

      const $ = cheerio.load(html,{decodeEntities: false});
      const mainBlocks = $('.list-detail');
      // console.log(mainBlocks.length);
      let listArr = [];
      if(mainBlocks.length){
        mainBlocks.each((i, elem)=>{
          let url = $(elem).find('h3 a[href*=product]').attr('href');
          let title = $(elem).find('h3 a[href*=product]').attr('title');
          let available = $(elem).find('.list-detail-balance span').text();
          let interestRate = $(elem).find('.list-detail-earnings span').text();
          let deadline = $(elem).find('.list-detail-deadline span').text();
          let test = $(elem).find('.list-detail-mess').eq(1).text();
          let test2 = $(elem).find('.list-detail-mess');
          let isFix = $(elem).find('.list-detail-mess').eq(0).find('.list-detail-right').text().includes('固定');// 固定 自愿
          let method = $(elem).find('.list-detail-mess').eq(1).find('.list-detail-earnings').text();
          let duration = '';
          if(isFix){
            duration = available;
          }else{
            duration = $(elem).find('.list-detail-mess').eq(1).find('.list-detail-deadline').text();
          }

          listArr[i]={
            url, available, title, interestRate, deadline, method, duration,isFix,
          };
        })
      }else{
        throw new Error('no list');
      };

      /**
       * url 地址
       * available 可投资金额
       * deadline 最短投资时间
       * duration 投资期限
       * intersetRate 利率
       * method 是否等本, ture, false
       * title 标题
       */
      const investlist = listArr.map(ele=>{
        const url = 'https://www.otouzi.com' + ele.url;
        const available = Number.parseFloat(ele.available.replace(',',''));
        const deadline = Number.parseInt(ele.deadline);
        const regex1 = /\d+/;
        const isFix = ele.isFix;
        // const test = regex1.exec(ele.duration);
        let regTest = regex1.exec(ele.duration.replace(/\n/g,''));
        let duration = null;
        if(regTest&&!isFix){
          duration = Number.parseInt(regTest[0]);
        }else if(isFix){
          duration = deadline;
        }else{
          console.log('ele.duration error:'+ele.title);
        }
        const interestRate = Number.parseFloat(ele.interestRate);
        const method = ele.method.includes('等本等息');
        const id = Number.parseInt(regex1.exec(ele.url)[0]);
        return {
          url, available, deadline, duration, interestRate, method, title:ele.title, id, isFix,
        };
      })
      return investlist;
    },
  },
}

async function queryData(url, callback) {
  let options = {
    resolveWithFullResponse: true,
    url,
  };
  resolveWithFullResponse: true;
  let data = await requestMeothods.pResopne(options)
  /* .catch(err=>{
    console.error(err);
  }); */
  if(!data.response){
    return '没有响应体';
  }
  const html = data.response.body;
  return callback(html);
  // console.log(data.response.body);
}

function main(){
  queryData(config.otouzi.url, config.otouzi.filter)
  .then(data=>{
    data.forEach(elem => {
      /* if(elem.method && elem.duration==12 && elem.deadline>=6
      && !isOpen.includes(elem.id) && elem.available>0){ */
      if(!isOpen.includes(elem.id) && elem.available>0){
        open(elem.url,'firefox');
        isOpen.push(elem.id);
        console.log((new Date()).toString()+'打开');
        console.log(elem);
      }else{
      };
    });
    // console.log('完成搜索');
  })
  .catch(err=>{console.log(err)});

  setTimeout(main, 5000);
}

main();


