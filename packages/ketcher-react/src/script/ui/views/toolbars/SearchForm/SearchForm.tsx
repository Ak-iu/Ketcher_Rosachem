import React from 'react'
import './SearchForm.css'

class SearchForm extends React.Component {
  search = { value: 'exact_search' }

  handleSubmit(event) {
    alert('Search value: ' + this.search.value)
    console.log('form submitted ✅')
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <input type="radio" id="exact_search" name="exact_search" checked />
          <label htmlFor="exact_search">Recherche exacte</label>
          <input type="radio" id="approx_search" name="approx_search" />
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
