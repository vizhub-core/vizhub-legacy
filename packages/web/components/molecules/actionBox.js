import { SlightMargin } from '../atoms/slightMargin';

export const ActionBox = ({title, children}) => (
  <div
    className='container section'
    style={{maxWidth: '600px'}}
  >
    <div className='box has-text-centered'>
      <h1 class='title'>{title}</h1>
      { children }
    </div>
  </div>
);
