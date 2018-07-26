export const AlphaWarning = () => (
  <nav className='is-inverted' style={{
    padding: '10px',
    backgroundColor: '#c00000',
    color: 'white',
    textAlign: 'center'
  }}>
    <strong style={{ color: 'white' }}>Warning!</strong> This is <a style={{color: 'white'}} href="https://en.wikipedia.org/wiki/Software_release_life_cycle#Alpha">alpha software</a>. Your data will not be permanently saved. See <a style={{color: 'white'}} href="https://github.com/datavis-tech/vizhub-ui/issues?q=is%3Aissue+is%3Aopen+sort%3Acomments-desc">open issues</a>.
  </nav>
)
