export const BodyAuthenticated = ({onFromScratchClick}) => {
  const fromScratchClick = e => {
    e.preventDefault()
    onFromScratchClick()
  }

  return (
    <React.Fragment>
      <div>
        <a className='button' href='#scratch' onClick={fromScratchClick}>Start from scratch</a>
      </div>
      <div style={{ marginTop: '1.25rem' }} >
        <a className='button' href='#template'>Choose a template (coming soon!)</a>
      </div>
    </React.Fragment>
  )
}

export const BodyNotAuthenticated = () => (
  <div>You must first log in to create a visualization.</div>
)
