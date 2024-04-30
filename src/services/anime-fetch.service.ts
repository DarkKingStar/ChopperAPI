import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { baseUrl } from '../utils/constants';
import * as cheerio from 'cheerio';
import { errormsg } from '../utils/error';

@Injectable()
export class AnimeFetchService {
  async getAnimeByGenre(genre: string, page: number) {
    let genreType = [];
    try {
      const res = await axios.get(`${baseUrl}/genre/${genre}?page=${page}`);
      const $ = (0, cheerio.load)(res.data);
      $('div.last_episodes > ul > li').each((i, el) => {
        var _a;
        genreType.push({
          id:
            (_a = $(el).find('a:nth-child(1)').attr('href')) === null ||
            _a === void 0
              ? void 0
              : _a.split('/')[2],
          title: $(el).find('a:nth-child(1)').text().trim(),
          status: $(el).find('p.released').text().trim(),
          image: $(el).find('div > a > img').attr('src'),
          subOrDub: $(el)
            .find('p.name > a')
            .text()
            .toLowerCase()
            .includes('dub')
            ? 'dub'
            : 'sub',
        });
      });
      const hasNextPage =
        $('div.anime_name.anime_movies > div > div > ul > li.selected').next()
          .length > 0;
      return {
        currentPage: page,
        hasNextPage: hasNextPage,
        results: genreType,
      };
    } catch (err) {
      return {
        error: errormsg.notFoundByGenreAndPage(genre, page),
        results: [],
        status: err.response.status,
      };
    }
  }
  async getGenres() {
    let results = [];
    try {
      const res = await axios.get(`${baseUrl}/home.html`);
      const $ = (0, cheerio.load)(res?.data);
      $('nav.menu_series.genre.right > ul > li').each((i, el) => {
        results.push({
          title: $(el).find('a').text().trim(),
          id: $(el).find('a').attr('href').split('/')[2],
        });
      });
      return { results };
    } catch (err) {
      return {
        error: errormsg.notFoundByGenre(''),
        results: [],
        status: err.response.status,
      };
    }
  }
  async getNewAnime(page: number) {
    try {
      const res = await axios.get(
        `${baseUrl}/new-season.html?page=${page}&type=1`,
      );
      const $ = (0, cheerio.load)(res.data);
      const popularAnime = [];
      $('div.last_episodes > ul > li').each((i, el) => {
        var _a, _b, _c, _d;
        popularAnime.push({
          id:
            (_b =
              (_a = $(el).find('a').attr('href')) === null || _a === void 0
                ? void 0
                : _a.split('/')[2]) === null || _b === void 0
              ? void 0
              : _b.split('-episode')[0],
          released: $(el)
            .find('p.released')
            .text()
            .replace('Released: ', '')
            .replace('\n', '')
            .trim(),
          title: $(el).find('p.name > a').text().trim(),
          image: $(el).find('div > a > img').attr('src'),
        });
      });
      const hasNextPage =
        $('div.anime_name_pagination > div > ul > li.selected').next().length >
        0;
      return {
        currentPage: page,
        hasNextPage: hasNextPage,
        results: popularAnime,
      };
    } catch (err) {
      return {
        error: errormsg.notFoundByPage(page),
        results: [],
        status: err.response.status,
      };
    }
  }
  async getPopularAnime(page: number) {
    try {
      const res = await axios.get(
        `${baseUrl}/popular.html?page=${page}&type=1`,
      );
      const $ = (0, cheerio.load)(res.data);
      const popularAnime = [];
      $('div.last_episodes > ul > li').each((i, el) => {
        var _a, _b, _c, _d;
        popularAnime.push({
          id:
            (_b =
              (_a = $(el).find('a').attr('href')) === null || _a === void 0
                ? void 0
                : _a.split('/')[2]) === null || _b === void 0
              ? void 0
              : _b.split('-episode')[0],
          released: $(el)
            .find('p.released')
            .text()
            .replace('Released: ', '')
            .replace('\n', '')
            .trim(),
          title: $(el).find('p.name > a').text().trim(),
          image: $(el).find('div > a > img').attr('src'),
        });
      });
      const hasNextPage =
        $('div.anime_name_pagination > div > ul > li.selected').next().length >
        0;
      return {
        currentPage: page,
        hasNextPage: hasNextPage,
        results: popularAnime,
      };
    } catch (err) {
      return {
        error: errormsg.notFoundByPage(page),
        results: [],
        status: err.response.status,
      };
    }
  }
  async getLatestAnime(page: number) {
    try {
      const res = await axios.get(`${baseUrl}/home.html?page=${page}&type=1`);
      const $ = (0, cheerio.load)(res.data);
      const recentEpisodes = [];
      $('div.last_episodes.loaddub > ul > li').each((i, el) => {
        var _a, _b, _c, _d;
        recentEpisodes.push({
          id:
            (_b =
              (_a = $(el).find('a').attr('href')) === null || _a === void 0
                ? void 0
                : _a.split('/')[1]) === null || _b === void 0
              ? void 0
              : _b.split('-episode')[0],
          episodeId:
            (_c = $(el).find('a').attr('href')) === null || _c === void 0
              ? void 0
              : _c.split('/')[1],
          episodeNumber: parseInt(
            $(el).find('p.episode').text().replace('Episode ', ''),
          ),
          title: $(el).find('p.name > a').text().trim(),
          image: $(el).find('div > a > img').attr('src'),
        });
      });
      const hasNextPage =
        $('div.anime_name_pagination.intro > div > ul > li.selected').next()
          .length > 0;
      return {
        currentPage: page,
        hasNextPage: hasNextPage,
        results: recentEpisodes,
      };
    } catch (err) {
      return {
        error: errormsg.notFoundByPage(page),
        results: [],
        status: err.response.status,
      };
    }
  }
  async getMovies(page: number) {
    try {
      const res = await axios.get(
        `${baseUrl}/anime-movies.html?page=${page}&type=1`,
      );
      const $ = (0, cheerio.load)(res.data);
      const animeMovies = [];
      $('div.last_episodes > ul > li').each((i, el) => {
        var _a, _b, _c, _d;
        animeMovies.push({
          id:
            (_b =
              (_a = $(el).find('a').attr('href')) === null || _a === void 0
                ? void 0
                : _a.split('/')[2]) === null || _b === void 0
              ? void 0
              : _b.split('-episode')[0],
          released: $(el)
            .find('p.released')
            .text()
            .replace('Released: ', '')
            .replace('\n', '')
            .trim(),
          title: $(el).find('p.name > a').text().trim(),
          image: $(el).find('div > a > img').attr('src'),
        });
      });
      const hasNextPage =
        $('div.anime_name_pagination > div > ul > li.selected').next().length >
        0;
      return {
        currentPage: page,
        hasNextPage: hasNextPage,
        results: animeMovies,
      };
    } catch (err) {
      return {
        error: errormsg.notFoundByPage(page),
        results: [],
        status: err.response.status,
      };
    }
  }
}
