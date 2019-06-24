import React from 'react';
import { UserMenu } from '../molecules/userMenu';
import { FaGithub } from 'react-icons/fa';

export const NavBar = ({user, csrfToken, dropUp}) => (
  <React.Fragment>
    <div style={{ margin: '5px' }}>

      <nav className='level'>
      
        <div className='level-left'>
          <a href='/' className='level-item nav-brand'>
            <img src='/static/logo.svg' />
          </a>
        </div>

        <div className='level-right'>
          <div className='level-item'>
            <UserMenu user={user} csrfToken={csrfToken} dropUp={dropUp} />
          </div>
        </div>

      </nav>
    </div>
  </React.Fragment>
);
