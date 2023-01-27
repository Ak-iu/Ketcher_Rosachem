import { Component } from 'react'
import { FormatterFactory, KetSerializer } from 'ketcher-core'
import './SearchForm.css'

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  changeType = (type) => {
    const { struct, server, options, formState } = this.props

    const errorHandler = this.context.errorHandler
    if (this.isImageFormat(type)) {
      const ketSerialize = new KetSerializer()
      const structStr = ketSerialize.serialize(struct)
      this.setState({
        disableControls: true,
        tabIndex: 0,
        imageFormat: type,
        structStr,
        isLoading: true
      })
      const options = {}
      options.outputFormat = type

      return server
        .generateImageAsBase64(structStr, options)
        .then((base64) => {
          this.setState({
            disableControls: false,
            tabIndex: 0,
            imageSrc: base64,
            isLoading: false
          })
        })
        .catch((e) => {
          errorHandler(e)
          this.props.onResetForm(formState)
          return e
        })
    } else {
      this.setState({ disableControls: true, isLoading: true })
      const factory = new FormatterFactory(server)
      const service = factory.create(type, options)

      return service
        .getStructureFromStructAsync(struct)
        .then(
          (structStr) => {
            this.setState({
              tabIndex: 0,
              structStr
            })
          },
          (e) => {
            errorHandler(e.message)
            this.props.onResetForm(formState)
            return e
          }
        )
        .finally(() => {
          this.setState({
            disableControls: false,
            tabIndex: 0,
            isLoading: false
          })
        })
    }
  }

  handleSubmit(event) {
    // TODO not working
    const ketSerialize = new KetSerializer()
    const struct = this.props.editor.struct()
    const structStr = ketSerialize.serialize(struct)

    alert("l'inchiKey est " + structStr)

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
