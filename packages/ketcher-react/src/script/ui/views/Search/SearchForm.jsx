import { Component } from 'react'
import { FormatterFactory, KetSerializer, SupportedFormat } from 'ketcher-core'
import './SearchForm.css'

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      structStr: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async updateInchiState() {
    const { server, options } = this.props
    const struct = this.props.editor.struct()
    const type = SupportedFormat.inChI

    const factory = new FormatterFactory(server)
    const service = factory.create(type, options)

    return service.getStructureFromStructAsync(struct).then(
      (structStr) => {
        this.setState({
          structStr
        })
      },
      (e) => {
        return e
      }
    )
  }

  async handleSubmit(event) {
    this.updateInchiState()

    if (this.state.structStr !== '') {
      alert("l'inchiKey est " + this.state.structStr)
      console.log(this.state.structStr)
    } else {
      alert('str null')
    }
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
