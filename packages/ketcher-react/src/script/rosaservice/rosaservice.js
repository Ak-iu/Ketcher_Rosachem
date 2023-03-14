export default class RosaService {
  static searchByInchi = async (inchi, similitude) => {
    const baseUrl = 'https://www.rosachem.com:8443/rosapi/';
    let response;
    if (similitude === 1) {
      try {
        response = fetch(
            baseUrl+'search/exact', {
          method: 'POST',
          body: JSON.stringify({
            inchi: inchi
          }),
          headers: {
            'Content-type': 'application/json'
          }
        })
      } catch (e) {
        response = e
      }
    } else {
      try {
        response = fetch(
          baseUrl+'search/similitude',
          {
            method: 'POST',
            body: JSON.stringify({
              inchi: inchi,
              similitude:similitude
            }),
            headers: {
              'Content-type': 'application/json'
            }
          }
        )
      } catch (e) {
        response = e
      }
    }
    return response
  }
}
