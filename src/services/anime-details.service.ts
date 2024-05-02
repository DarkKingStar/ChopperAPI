import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ajaxUrl, baseUrl } from '../utils/constants';
import * as cheerio from 'cheerio';

@Injectable()
export class AnimeDetailsService {
  async getAnimeDetails(animeid: string) {
    const animeInfo = {
      animeid: '',
      id: '',
      title: '',
      image: '',
      releaseDate: '',
      description: '',
      subOrDub: '',
      type: '',
      status: '',
      otherName: '',
      genres: [],
      totalEpisodes: 0,
    };
    try {
      const res = await axios.get(`${baseUrl}/category/${animeid}`);
      const $ = (0, cheerio.load)(res.data);
      animeInfo.animeid = animeid;
      animeInfo.title = $(
        'section.content_left > div.main_body > div:nth-child(2) > div.anime_info_body_bg > h1',
      )
        .text()
        .trim();
      animeInfo.image = $('div.anime_info_body_bg > img').attr('src');
      animeInfo.releaseDate = $('div.anime_info_body_bg > p:nth-child(8)')
        .text()
        .trim()
        .split('Released: ')[1];
      animeInfo.description = $(
        'div.anime_info_body_bg > div.description',
      ).text();
      animeInfo.subOrDub = animeInfo.title.toLowerCase().includes('dub')
        ? 'dub'
        : 'sub';
      animeInfo.type = $('div.anime_info_body_bg > p:nth-child(4) > a')
        .text()
        .trim()
        .toUpperCase();
      animeInfo.status = $('div.anime_info_body_bg > p:nth-child(9) > a')
        .text()
        .trim();
      animeInfo.otherName = $('div.anime_info_body_bg > p:nth-child(10) > a')
        .text()
        .replace('Other name: ', '')
        .trim()
        .replace(/;/g, ',');
      $('div.anime_info_body_bg > p:nth-child(7) > a').each((i, el) => {
        var _a;
        (_a = animeInfo.genres) === null || _a === void 0
          ? void 0
          : _a.push($(el).attr('title').toString());
      });
      animeInfo.id = $('#movie_id').attr('value');
      animeInfo.totalEpisodes = parseInt(
        $('#episode_page > li').last().find('a').attr('ep_end'),
      );
      return {
        error: 'false',
        results: animeInfo,
        message: 'Anime details fetch success',
      };
    } catch (err) {
      return {
        error: 'true',
        results: {},
        message: err.message,
        status: err.response.status,
      };
    }
  }

  async getAnimeEpisodes(
    animeid: string,
    page: number,
    rows: number,
    id?: number,
  ) {
    try {
      const ep_start = (page - 1) * rows + 1;
      const ep_end = page * rows;
      if(id===0 || id === undefined || id === null){
        const res = await axios.get(`${baseUrl}/category/${animeid}`);
        const $$ = (0, cheerio.load)(res.data);
        id = parseInt($$('#movie_id').attr('value'));
      }
      const html = await axios.get(
        `${ajaxUrl}/load-list-episode?ep_start=${ep_start}&ep_end=${ep_end}&id=${id}&default_ep=${0}&alias=${animeid}`,
      );
      const $ = (0, cheerio.load)(html.data);
      const episodes = [];
      $('#episode_related > li').each((i, el) => {
        var _a, _b, _c;
        (_a = episodes) === null || _a === void 0
          ? void 0
          : _a.push({
              id:
                (_b = $(el).find('a').attr('href')) === null || _b === void 0
                  ? void 0
                  : _b.split('/')[1],
              number: parseFloat(
                $(el).find(`div.name`).text().replace('EP ', ''),
              ),
            });
      });
      episodes.reverse();
      if (episodes.length == 0) {
        return {
          error: 'true',
          animeId: animeid,
          results: [],
          status: 404,
          message: 'No episodes found',
        };
      }
      return {
        error: 'false',
        animeId: animeid,
        results: episodes,
        message: 'Anime episodes fetch success',
      };
    } catch (err) {
      return {
        error: 'true',
        results: [],
        message: err.message,
        status: err.response.status,
      };
    }
  }
}
