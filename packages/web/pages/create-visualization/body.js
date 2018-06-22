export const BodyAuthenticated = ({onFromScratchClick}) => {
  const fromScratchClick = e => {
    e.preventDefault()
    onFromScratchClick()
  }

  return (
    <React.Fragment>
      <h1>Create Visualization</h1>
      <div>
        <a href='#scratch' onClick={fromScratchClick}>Start from scratch</a>
      </div>
      <div>
        <a href='#template'>Choose a template (coming soon!)</a>
      </div>
    </React.Fragment>
  )
}

export const BodyNotAuthenticated = () => (
  <div>You must first log in to create a visualization.</div>
)
