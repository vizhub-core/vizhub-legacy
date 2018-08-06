import { connect } from 'react-redux';
import { uiRedux } from 'vizhub-ui';
import { getShowForkInvitation } from '../../redux/selectors';

const {
  actionCreators: {
    forkVisualization
  }
} = uiRedux;

export const ForkInvitationPresentation = ({show, onFork}) => {
  if (!show) {
    return null;
  }
  const onForkLinkClick = event => {
    event.preventDefault();
    onFork();
  };
  return (
    <section className='hero is-dark is-bold'>
      <div className='hero-body'>
        <div className='container'>
          <h1 className='title'>
            <a href='#fork' onClick={onForkLinkClick}>
              Fork this visualization
            </a>
          </h1>
          <h2 className='subtitle'>
            if you want to save your changes.
          </h2>
        </div>
      </div>
    </section>
  );
}

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
