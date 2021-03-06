import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const poptes = [

      {
        id: 0, name: 'bibiri', label: ['煽り', 'ヘイ', 'ビビって', 'オェーイ'],
        rate: 3,
        localPath: '../assets/images/poptes/popte1.jpg',
        imageUrl: 'http://imgcc.naver.jp/kaze/mission/USER/20160514/72/7255212/210/320x215x9f360c5ab7736510df54c882.jpg',
      },
      {
        id: 1, name: 'aymf', label: ['Are', 'you', 'mother', 'fucker', '英語'],
        rate: 3,
        localPath: '../assets/images/poptes/popte2.jpg',
        imageUrl: 'http://imgcc.naver.jp/kaze/mission/USER/20160514/72/7255212/209/444x299x9f360c5ab7736510df54c882.jpg'
      },
      {
        id: 2, name: 'baka', label: ['意味わかんねーよ', '死ね', 'バーカ'],
        rate: 3,
        localPath: '../assets/images/poptes/popte3.jpg',
        imageUrl: 'http://imgcc.naver.jp/kaze/mission/USER/20160514/72/7255212/207/928x620x9f360c5ab7736510df54c882.jpg'
      },
      {
        id: 3, name: 'pride', label: ['君さぁ', 'プライド', 'なさすぎちゃう'],
        rate: 3,
        localPath: '../assets/images/poptes/popte4.jpg',
        imageUrl: 'http://imgcc.naver.jp/kaze/mission/USER/20160514/72/7255212/217/428x290x9f360c5ab7736510df54c882.jpg'
      },
      {
        id: 4, name: 'sagasu', label: ['お前はよぉ', '自分で探す', 'できねぇのかよ'],
        rate: 3,
        localPath: '../assets/images/poptes/popte5.jpg',
        imageUrl: 'http://imgcc.naver.jp/kaze/mission/USER/20160514/72/7255212/219/451x326x9f360c5ab7736510df54c882.jpg'
      },
      {
        id: 5, name: 'dokyou', label: ['オッテメー', 'いい度胸'],
        rate: 3,
        localPath: '../assets/images/poptes/popte6.jpg',
        imageUrl: 'http://imgcc.naver.jp/kaze/mission/USER/20160514/72/7255212/205/1024x689x9f360c5ab7736510df54c88.jpg'
      },
      {
        id: 6, name: 'byouki', label: ['病気', 'じゃん'],
        rate: 3,
        localPath: '../assets/images/poptes/popte7.jpg',
        imageUrl: 'http://imgcc.naver.jp/kaze/mission/USER/20160514/72/7255212/221/320x213x9f360c5ab7736510df54c882.jpg'
      },
      {
        id: 7, name: 'ha', label: ['は？'],
        rate: 3,
        localPath: '../assets/images/poptes/popte8.jpg',
        imageUrl: 'http://imgcc.naver.jp/kaze/mission/USER/20160514/72/7255212/220/412x266x9f360c5ab7736510df54c882.jpg'
      },
      {
        id: 8, name: 'kusorep', label: ['ここだけ', '話', 'はなし', 'お前', 'クソリプ', 'くそりぷ', '送ってるで'],
        rate: 3,
        localPath: '../assets/images/poptes/popte9.jpg',
        imageUrl: '../assets/images/poptes/popte9.jpg'
      },
    ];
    return { poptes };
  }
}
