import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as jobsController from './utils'
import Jobs from './Jobs'

function mapStateToProps (state) {
  return {
    items: state.jobs.items,
    isFetching: state.jobs.isFetching,
    processId: state.jobs.processId,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    jobsController: bindActionCreators(jobsController, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Jobs)
