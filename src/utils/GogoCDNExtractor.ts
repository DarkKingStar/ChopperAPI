import axios from 'axios';
import * as cheerio from 'cheerio';
import { AES, enc } from 'crypto-js';

const keys = {
  key: enc.Utf8.parse('37911490979715163134003223491201'),
  secondKey: enc.Utf8.parse('54674138327930866480207815084989'),
  iv: enc.Utf8.parse('3134003223491201'),
};

const generateEncryptedAjaxParams = async ($, id) => {
  const encryptedKey = AES.encrypt(id, keys.key, {
    iv: keys.iv,
  });
  const scriptValue = $("script[data-name='episode']").attr('data-value');
  const decryptedToken = AES.decrypt(scriptValue, keys.key, {
    iv: keys.iv,
  }).toString(enc.Utf8);
  return `id=${encryptedKey}&alias=${id}&${decryptedToken}`;
};

const decryptAjaxData = async (encryptedData) => {
  const decryptedData = enc.Utf8.stringify(
    AES.decrypt(encryptedData, keys.secondKey, {
      iv: keys.iv,
    }),
  );
  return JSON.parse(decryptedData);
};

export const GogoCDNExtractor = async (videoUrl) => {
  let sources = [];
  var _a;
  let referer = videoUrl.href;
  try {
    const res = await axios.get(referer);
    const $ = (0, cheerio.load)(res.data);
    const encyptedParams = await generateEncryptedAjaxParams(
      $,
      (_a = videoUrl.searchParams.get('id')) !== null && _a !== void 0
        ? _a
        : '',
    );
    const encryptedData = await axios.get(
      `${videoUrl.protocol}//${videoUrl.hostname}/encrypt-ajax.php?${encyptedParams}`,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      },
    );
    const decryptedData = await decryptAjaxData(encryptedData.data.data);
    if (!decryptedData.source)
      throw new Error('No source found. Try a different server.');
    if (decryptedData.source[0].file.includes('.m3u8')) {
      const resResult = await axios.get(
        decryptedData.source[0].file.toString(),
      );
      const resolutions = resResult.data.match(
        /(RESOLUTION=)(.*)(\s*?)(\s*.*)/g,
      );
      resolutions === null || resolutions === void 0
        ? void 0
        : resolutions.forEach((res) => {
            const index = decryptedData.source[0].file.lastIndexOf('/');
            const quality = res.split('\n')[0].split('x')[1].split(',')[0];
            const url = decryptedData.source[0].file.slice(0, index);
            sources.push({
              url: url + '/' + res.split('\n')[1],
              isM3U8: (url + res.split('\n')[1]).includes('.m3u8'),
              quality: quality + 'p',
            });
          });
      decryptedData.source.forEach((source) => {
        sources.push({
          url: source.file,
          isM3U8: source.file.includes('.m3u8'),
          quality: 'default',
        });
      });
    } else
      decryptedData.source.forEach((source) => {
        sources.push({
          url: source.file,
          isM3U8: source.file.includes('.m3u8'),
          quality: source.label.split(' ')[0] + 'p',
        });
      });
    decryptedData.source_bk.forEach((source) => {
      sources.push({
        url: source.file,
        isM3U8: source.file.includes('.m3u8'),
        quality: 'backup',
      });
    });
    return sources;
  } catch (err) {
    console.log(err);
    return 'Episode not Found';
  }
};
