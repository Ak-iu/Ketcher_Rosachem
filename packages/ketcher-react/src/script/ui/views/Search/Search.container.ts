import { connect } from 'react-redux'
import { SearchForm } from './SearchForm'

const mapStateToProps = () => ({
  // server: state.options.app.server ? state.server : null,
  // struct: state.editor.struct(),
  // options: state.options.getServerSettings(),
  // formState: state.modal.form,
  // moleculeErrors: state.modal.form.moleculeErrors,
  // checkState: state.options.check
})

const mapDispatchToProps = () => ({
  // onCheck: (checkOptions) => dispatch(check(checkOptions)),
  // onTmplSave: (struct) => dispatch(saveUserTmpl(struct)),
  // onResetForm: (prevState) => dispatch(updateFormState(prevState))
})

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchForm)

export default SearchContainer
