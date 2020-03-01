import './AppNavigator.scss';

import React from 'react';
import ExampleMenu from './appNavigator/ExampleMenu';
import { HamburgerMenuIcon } from '../Icons';
import ModalButton from '../ModalButton';

function AppNavigator() {
  return (
    <ModalButton
      className="menu-icon-button"
      icon={HamburgerMenuIcon}
      content={(modal) => <ExampleMenu onSelect={() => modal.hide()} />}
    />
  );
}

export default AppNavigator;
