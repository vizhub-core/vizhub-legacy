import { UserMenu } from './userMenu'

export const NavBar = ({user, csrfToken}) => (
  <React.Fragment>

    <style jsx>{`
      nav {
        margin: 10px;
      }
    `}</style>

    <nav className="level">
    
      <div className="level-left">
        <div className="level-item">
          VizHub.io
        </div>
      </div>

      <div className="level-item has-text-centered">
        <div className="field has-addons">
          <p className="control">
            <input className="input" type="text" />
          </p>
          <p className="control">
            <button className="button">
              Search
            </button>
          </p>
        </div>
      </div>

      <div className="level-right">
        <div className="level-item">
          <UserMenu user={user} csrfToken={csrfToken} />
        </div>
      </div>

    </nav>
  </React.Fragment>
);
