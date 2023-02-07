import { Component } from 'react'
import { FormatterFactory, KetSerializer, SupportedFormat } from 'ketcher-core'
import './SearchForm.css'
import RosaService from '../../../rosaservice/rosaservice'

export class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inchi: null,
      search_type: 'exact',
      precision: 1,
      moleculeList: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChangeSearchType = this.onChangeSearchType.bind(this)
    this.onChangePrecision = this.onChangePrecision.bind(this)
    this.renderMoleculeList = this.renderMoleculeList.bind(this)
  }

  async getInchi() {
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

  async updateMoleculeList() {
    let moleculeList = []

    console.log(
      'parameters :\n',
      this.state.search_type,
      '\n',
      this.state.inchi,
      '\n',
      this.state.precision
    )

    const response =
      this.state.search_type === 'exact'
        ? await RosaService.searchByInchi(this.state.inchi, 1)
        : await RosaService.searchByInchi(
            this.state.inchi,
            this.state.precision
          )

    if (response.status === 200) {
      try {
        moleculeList =
          this.state.search_type === 'exact' || this.state.precision === 1.0
            ? [await response.json()]
            : await response.json()
      } catch (e) {
        // bad json , why ?
      }
    } else {
      // bad inchi
    }

    this.setState({
      moleculeList: moleculeList
    })

    console.log('result =>\n', this.state.moleculeList)
  }

  handleSubmit(event) {
    // getInchi from struct ->  search mol in base -> update state of mol list
    this.getInchi().then(() => this.updateMoleculeList())
    event.preventDefault()
  }

  onChangeSearchType(event) {
    this.setState({
      search_type: event.target.value
    })
  }

  onChangePrecision(event) {
    this.setState({
      precision: parseFloat(event.target.value)
    })
  }

  renderMoleculeList() {
    if (this.state.moleculeList.length === 0)
      return <h3 className="no-result">Aucun Resultat.</h3>
    else {
      return (
        <div className="card_container">
          {this.state.moleculeList.map(
            ({
              id,
              label,
              casNumber,
              content,
              rawFormula,
              similitude,
              representation
            }) => (
              <div key={id} className="card">
                <div className="col1">
                  <img
                    className="card-img"
                    src={
                      'https://www.rosachem.com/img/upload/produit/' +
                      representation
                    }
                  />
                </div>

                <div className="col2">
                  <div className="card-body">
                    <h5 className="card-subtitle">
                      Numéro Cas : {casNumber} - Similitude : {similitude}
                    </h5>
                    <h2 className="card-title">{label}</h2>
                    <h5 className="card-subtitle">{content}</h5>

                    <a
                      href={
                        'https://www.rosachem.com/fiche-produit/' +
                        id +
                        '/' +
                        label.replace(' ', '-')
                      }
                      target="_blank"
                    >
                      <button className="btn">Voir la fiche</button>
                    </a>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )
    }
  }

  render() {
    const ok = <p> ok </p>
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <fieldset>
              <input
                type="radio"
                id="exact"
                name="search"
                value="exact"
                checked={this.state.search_type === 'exact'}
                onChange={this.onChangeSearchType}
              />
              <label htmlFor="exact">Recherche exacte </label>

              <input
                type="radio"
                id="similarity"
                name="search"
                value="similarity"
                checked={this.state.search_type === 'similarity'}
                onChange={this.onChangeSearchType}
              />
              <label htmlFor="similarity">Recherche approchée</label>
            </fieldset>

            <select
              id="precision_select"
              name="precision"
              onChange={this.onChangePrecision}
            >
              <option value="1.0">100%</option>
              <option value="0.9">90%</option>
              <option value="0.8">80%</option>
              <option value="0.7">70%</option>
              <option value="0.6">60%</option>
              <option value="0.5">50%</option>
            </select>
          </div>

          <div className="search-button-container">
            <input
              className="search-btn"
              id="search_btn"
              type="submit"
              value="Rechercher"
            />
          </div>
        </form>

        {this.renderMoleculeList()}
      </div>
    )
  }
}
