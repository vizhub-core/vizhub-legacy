export const FullPage = ({children}) => (
  <div
    style={{
      position: 'fixed',
      top: '0px',
      bottom: '0px',
      left: '0px',
      right: '0px'
    }}
  >
    {children}
  </div>
);
