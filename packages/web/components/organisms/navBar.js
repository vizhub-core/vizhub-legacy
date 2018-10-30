import React from 'react';
import { UserMenu } from '../molecules/userMenu';
import { SlightMargin } from '../atoms/slightMargin';
import { FaGithub } from 'react-icons/fa';

export const NavBar = ({user, csrfToken, dropUp}) => (
  <React.Fragment>
    <SlightMargin>

      <nav className='level'>
      
        <div className='level-left'>
          <div className='level-item nav-brand'>
            VizHub
          </div>
        </div>

        <div className='level-item has-text-centered'>
          <div className='field has-addons'>
            <p className='control'>
              <input className='input' type='text' />
            </p>
            <a
              target="_blank"
              href='https://github.com/datavis-tech/vizhub-ui/issues/36'
              className='control'
            >
              <button className='button'>
                Search
              </button>
            </a>
          </div>
        </div>

        <div className='level-right'>
          <div className='level-item'>
            <a href='https://github.com/datavis-tech/vizhub/'>
              <FaGithub />
            </a>
          </div>
          <div className='level-item'>
            <UserMenu user={user} csrfToken={csrfToken} dropUp={dropUp} />
          </div>
        </div>

      </nav>
    </SlightMargin>
  </React.Fragment>
);
