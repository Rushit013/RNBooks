import client from './HttpClient';

export default class BookService {
  static async fetchBookList(page) {
    let result = {};

    try {
      let api_name = `books/${page || 1}`;
      result = await client.get(api_name);
      // console.log(result)
    } catch (error) {
      console.log('Book GET API: ', e);
    }

    return result;
  }
}
