import { connect } from 'react-redux';
import { getShowForkInvitation } from '../../redux/selectors';
import { forkVisualization } from '../../redux/actionCreators';

export const ForkInvitationPresentation = ({show}) => 
  show
    ? (
      <section className='hero is-dark is-bold'>
        <div className='hero-body'>
          <div className='container'>
            <h1 className='title'>
              <a href='fork'>Fork this visualization</a>
            </h1>
            <h2 className='subtitle'>
              if you want to save your changes.
            </h2>
          </div>
        </div>
      </section>
    )
  : null;

const mapStateToProps = state => ({
  show: getShowForkInvitation(state)
});

const mapDispatchToProps = dispatch => ({
  onFork: () => dispatch(forkVisualization())
});

export const ForkInvitation = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForkInvitationPresentation);
