export const ChosenFileIndicator = ({chosenFile: {name, text}}) => (
  <div className='chosen-file-indicator'>
    <div>{name}</div>
    <pre>{text}</pre>
  </div>
);
