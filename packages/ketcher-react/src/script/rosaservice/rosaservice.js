export default class RosaService {
  static searchByInchi = async (inchi, similitude) => {
    var response
    if (similitude === 1) {
      try {
        response = fetch('https://www.pcorp.games:8443/rosapi/search/exact', {
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
          'https://www.pcorp.games:8443/rosapi/search/similitude',
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
