export default class RosaService {
  static searchByInchi = async (inchi, similitude) => {
    if (similitude === 1) {
      try {
        await fetch('https://www.pcorp.games:8443/rosapi/search/exact', {
          method: 'POST',
          body: JSON.stringify({
            inchi: inchi
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
          .then((response) => response.json())
          .then((json) => console.log(json))
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        fetch('https://www.pcorp.games:8443/rosapi/search/similitude', {
          method: 'POST',
          body: JSON.stringify({
            inchi: inchi,
            similitude: similitude
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
          .then((response) => response.json())
          .then((json) => console.log(json))
      } catch (e) {
        console.log(e)
      }
    }
  }
}
