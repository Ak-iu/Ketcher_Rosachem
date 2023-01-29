import { Component } from 'react'
import { FormatterFactory, KetSerializer, SupportedFormat } from 'ketcher-core'
import './SearchForm.css'
import RosaService from '../../../rosaservice/rosaservice'

export class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inchi: null,
      option: 'exact_search',
      precision: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
  }

  updateInchiState() {
    const { server, options } = this.props
    const struct = this.props.editor.struct()
    const type = SupportedFormat.inChI
    const factory = new FormatterFactory(server)
    const service = factory.create(type, options)
    return service.getStructureFromStructAsync(struct).then(
      (inchi) => {
        this.setState({
          inchi
        })
      },
      (e) => {
        return e
      }
    )
  }

  handleSubmit(event) {
    this.updateInchiState()
    this.state.precision = parseInt(event.target.precision_select.value)

    if (this.state.inchi) {
      console.log(this.state.inchi)
      RosaService.searchByInchi(this.state.inchi, this.state.precision)
    } else {
      console.log('inchi null')
    }
    event.preventDefault()
  }

  onValueChange(event) {
    this.setState({
      option: event.target.value
    })
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
            checked={this.state.option === 'exact_search'}
            onChange={this.onValueChange}
          />
          <label htmlFor="exact_search">Recherche exacte </label>

          <input
            type="radio"
            id="approx_search"
            name="search"
            value="approx_search"
            checked={this.state.option === 'approx_search'}
            onChange={this.onValueChange}
          />
          <label htmlFor="approx_search">Recherche approchée</label>
        </fieldset>

        <select name="precision" id="precision_select">
          <option value="1">100%</option>
          <option value="0.9">90%</option>
          <option value="0.8">80%</option>
          <option value="0.7">70%</option>
          <option value="0.6">60%</option>
          <option value="0.5">50%</option>
        </select>

        <input id="submit" type="submit" value="Rechercher" />
      </form>
    )
  }
}
