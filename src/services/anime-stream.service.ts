import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { GogoCDNExtractor } from 'src/utils/GogoCDNExtractor';
import { baseUrl } from 'src/utils/constants';

@Injectable()
export class AnimeStreamService {
  async getAnimeStream(episodeid: string) {
      try {
        const res = await axios.get(`${baseUrl}/${episodeid}`);
        const $ = (0, cheerio.load)(res.data);
        let serverUrl = new URL(`${$('#load_anime > div > div > iframe').attr('src')}`);
        return {
            headers: { Referer: serverUrl.href, watch: 'GogoCDN' },
            sources: await GogoCDNExtractor(serverUrl),
            download: `https://gogohd.net/download${serverUrl.search}`,
        };
    }
    catch (err) {
        return {
            error: "true",
            message: "Episode not found"
        }
    }
  }
}
