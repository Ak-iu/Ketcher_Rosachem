import React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}
type State = { value: string }
class SearchForm extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    alert("l'inchiKey est " + 0)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <input
            type="radio"
            id="exact_search"
            name="search"
            value="exact_search"
            checked
          />
          <label htmlFor="exact_search">Recherche exacte</label>

          <input
            type="radio"
            id="approx_search"
            name="search"
            value="approx_search"
          />
          <label htmlFor="approx_search">Recherche approchée</label>
        </fieldset>

        <select name="precision" id="precision_select">
          <option value="100%">100%</option>
          <option value="90%">90%</option>
          <option value="80%">80%</option>
          <option value="70%">70%</option>
          <option value="60%">60%</option>
          <option value="50%">50%</option>
        </select>

        <input id="submit" type="submit" value="Rechercher" />
      </form>
    )
  }
}

export { SearchForm }
