export const errormsg = {
    notFound: (id: string) => `Anime with id ${id} not found`,
    notFoundByQuery: (query: string) => `Anime with query ${query} not found`,
    notFoundByGenre: (genre: string) => `Anime with genre ${genre} not found`,
    notFoundByGenreAndPage: (genre: string, page: number) => `Anime with genre ${genre} and page ${page} not found`,
    notFoundByPage: (page: number) => `Anime with page ${page} not found`,
    notFoundByQueryAndPage: (query: string, page: number) => `Anime with query ${query} and page ${page} not found`,

}