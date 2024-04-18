import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {baseUrl} from '../../utils/constants';
import * as cheerio from 'cheerio';
import { errormsg } from './error';

@Injectable()
export class AnimeFetchService {
  async getAnimeByGenre(genre: string, page: number) {
    let genreType = [];
    try{

      const res = await axios.get(`${baseUrl}/genre/${genre}?page=${page}`);
      const $ = (0, cheerio.load)(res.data);
      $("div.last_episodes > ul > li").each((i, el) => {
        var _a;
        genreType.push({
          id:
            (_a = $(el).find("a:nth-child(1)").attr("href")) === null ||
            _a === void 0
              ? void 0
              : _a.split("/")[2],
          title: $(el).find("a:nth-child(1)").text().trim(),
          status: $(el).find("p.released").text().trim(),
          image: $(el).find("div > a > img").attr("src"),
          subOrDub: $(el).find("p.name > a").text().toLowerCase().includes("dub")
            ? "dub"
            : "sub",
        });
      });
      const hasNextPage =
        $("div.anime_name.anime_movies > div > div > ul > li.selected").next()
          .length > 0;
      return {
        currentPage: page,
        hasNextPage: hasNextPage,
        results: genreType,
      };
    }catch(err){
      return {
        error: errormsg.notFoundByGenreAndPage(genre, page),
        results: [],
        status: err.response.status
      }
    }
  }
  async getGenres() {
    let results = [];
    try{
      const res = await axios.get(`${baseUrl}/home.html`);
      const $ = (0, cheerio.load)(res?.data);
      $("nav.menu_series.genre.right > ul > li").each((i, el) => {
        results.push({
          title: $(el).find("a").text().trim(),
          id: $(el).find("a").attr("href").split("/")[2],
        });
      });
      return { results };
    }catch(err){
      return {
        error: errormsg.notFoundByGenre(""),
        results: [],
        status: err.response.status
      }
    }
  }
  getMovies(){
    throw new Error('Method not implemented.');   
  }
  getNewAnime() {
    throw new Error('Method not implemented.');
  }
  getPopularAnime() {
    throw new Error('Method not implemented.');
  }
  getLatestAnime() {
    throw new Error('Method not implemented.');
  }
}
