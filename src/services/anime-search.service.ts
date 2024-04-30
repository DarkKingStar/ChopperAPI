import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

import { baseUrl } from 'src/utils/constants';
import { errormsg } from 'src/utils/error';

@Injectable()
export class AnimeSearchService {
  async findByQuery(query : string) {
    const searchResult = {
      results: [],
  };
  try {
      const res = await axios.get(`${baseUrl}/search.html?keyword=${encodeURIComponent(query)}&page=1`);
      const $ = (0, cheerio.load)(res.data);
    
      $('div.last_episodes > ul > li').each(async(i, el) => {
          var _a;
          searchResult.results.push({
              id: (_a = $(el).find('p.name > a').attr('href')) === null || _a === void 0 ? void 0 : _a.split('/')[2],
              title: $(el).find('p.name > a').text().trim(),
              url: `${baseUrl}/${$(el).find('p.name > a').attr('href')}`,
              image: $(el).find('div > a > img').attr('src'),
              status: $(el).find('p.released').text().trim(),
              subOrDub: $(el).find('p.name > a').text().toLowerCase().includes('dub')
                  ? 'dub'
                  : 'sub',
          });
      });
      if(searchResult.results.length == 0) {
        return {
          error: errormsg.notFoundByQuery(query),
          results: [],
          status: 404,
        };
      }
      return searchResult;
  }
  catch (err) {
    return {
      error: errormsg.notFoundByQuery(query),
      results: [],
      status: err.response.status,
    };
  }
  }
}
