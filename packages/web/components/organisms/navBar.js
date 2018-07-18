import React from 'react';
import { UserMenu } from '../molecules/userMenu';
import { SlightMargin } from '../atoms/slightMargin';
import { AlphaWarning } from '../atoms/alphaWarning';

export const NavBar = ({user, csrfToken, dropUp}) => (
  <React.Fragment>
    <AlphaWarning />
    <SlightMargin>

      <nav className='level'>
      
        <div className='level-left'>
          <div className='level-item nav-brand'>
            vizhub.com
          </div>
        </div>

        <div className='level-item has-text-centered'>
          <div className='field has-addons'>
            <p className='control'>
              <input className='input' type='text' />
            </p>
            <p className='control'>
              <button className='button'>
                Search
              </button>
            </p>
          </div>
        </div>

        <div className='level-right'>
          <div className='level-item'>
            <UserMenu user={user} csrfToken={csrfToken} dropUp={dropUp} />
          </div>
        </div>

      </nav>
    </SlightMargin>
  </React.Fragment>
);
