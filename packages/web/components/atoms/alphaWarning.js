export const AlphaWarning = () => (
  <nav className='is-inverted' style={{
    padding: '10px',
    backgroundColor: '#c00000',
    color: 'white',
    textAlign: 'center'
  }}>
    <strong style={{ color: 'white' }}>Warning!</strong> This is <a target="_blank" style={{color: 'white'}} href="https://medium.com/@currankelleher/introducing-vizhub-75644cb8bba6">alpha software</a>. Your data will <a style={{color: 'white'}} target="_blank" href="https://github.com/datavis-tech/vizhub-ui/issues/37">not be permanently saved</a>. See <a target="_blank" style={{color: 'white'}} href="https://github.com/datavis-tech/vizhub-ui/issues?q=is%3Aissue+is%3Aopen+sort%3Acomments-desc">open issues</a>.
  </nav>
)
