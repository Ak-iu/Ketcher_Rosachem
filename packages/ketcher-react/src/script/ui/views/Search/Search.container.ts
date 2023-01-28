import { connect } from 'react-redux'
import { SearchForm } from './SearchForm'

const mapStateToProps = (state) => ({
  server: state.options.app.server ? state.server : null,
  editor: state.editor,
  options: state.options.getServerSettings(),
  // formState: state.modal.form,
  // moleculeErrors: state.modal.form.moleculeErrors,
  checkState: state.options.check
})

const SearchContainer = connect(mapStateToProps, null)(SearchForm)

export default SearchContainer
