import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as processesController from './utils'
import Processes from './Processes'

function mapStateToProps (state) {
  return {
    items: state.processes.items,
    isFetching: state.processes.isFetching,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    processesController: bindActionCreators(processesController, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Processes)
