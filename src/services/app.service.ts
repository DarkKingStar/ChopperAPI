import { Injectable } from '@nestjs/common';
import { HomeDto } from 'src/dto/home.dto';

@Injectable()
export class AppService {
  welcome(): HomeDto {
    return {
      title: 'Chopper Anime API',
      description: 'OpenSource API endpoints for an anime streaming service',
      author: 'DarkinStar',
      brand: 'Chopper.IO',
      routes: [
        {
          name: 'Get anime info',
          path: '/info/:animeid',
          method: 'GET',
          description: 'Get information about a specific anime',
          params: [
            {
              name: 'animeid',
              type: 'string',
              description: 'ID of the anime',
            },
          ],
        },
        {
          name: 'Get anime episodes',
          path: '/info/episodes/:animeid',
          method: 'GET',
          description: 'Get episodes of a specific anime',
          params: [
            {
              name: 'animeid',
              type: 'string',
              description: 'ID of the anime',
            },
          ],
          queries: [
            {
              name: 'page',
              type: 'number',
              description: 'Page number',
            },
            {
              name: 'rows',
              type: 'number',
              description: 'Number of rows per page',
            },
            {
              name: 'id',
              type: 'number',
              description: 'ID of the anime(SI no.)',
            },
          ],
        },
        {
          name: 'Search anime',
          path: '/search/:queries',
          method: 'GET',
          description: 'Search for anime',
          params: [
            {
              name: 'queries',
              type: 'string',
              description: 'Search queries',
            },
          ],
        },
        {
          name: 'Watch episode',
          path: '/watch/:episodeid',
          method: 'GET',
          description: 'Watch a specific episode',
          params: [
            {
              name: 'episodeid',
              type: 'string',
              description: 'ID of the episode',
            },
          ],
        },
        {
          name: 'Get latest anime',
          path: '/anime/latest',
          method: 'GET',
          description: 'Get the latest anime',
          queries: [
            {
              name: 'page',
              type: 'number',
              description: 'Page number',
            },
          ],
        },
        {
          name: 'Get popular anime',
          path: '/anime/popular',
          method: 'GET',
          description: 'Get the popular anime',
          queries: [
            {
              name: 'page',
              type: 'number',
              description: 'Page number',
            },
          ],
        },
        {
          name: 'Get new anime',
          path: '/anime/new',
          method: 'GET',
          description: 'Get the newly released anime',
          queries: [
            {
              name: 'page',
              type: 'number',
              description: 'Page number',
            },
          ],
        },
        {
          name: 'Get anime movies',
          path: '/anime/movies',
          method: 'GET',
          description: 'Get anime movies',
          queries: [
            {
              name: 'page',
              type: 'number',
              description: 'Page number',
            },
          ],
        },
        {
          name: 'Get anime genres',
          path: '/anime/genres',
          method: 'GET',
          description: 'Get anime genres',
          queries: [
            {
              name: 'page',
              type: 'number',
              description: 'Page number',
            },
          ],
        },
        {
          name: 'Get anime by genre',
          path: '/anime/genres/:genre',
          method: 'GET',
          description: 'Get anime by genre',
          params: [
            {
              name: 'genre',
              type: 'string',
              description: 'Genre of the anime',
            },
          ],
          queries: [
            {
              name: 'page',
              type: 'number',
              description: 'Page number',
            },
          ],
        },
      ],
    };
  }
}
