import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas, faFileAlt, faUsers, faCog } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, DropdownProps } from 'semantic-ui-react'
import LanguageSelector from '../sidebar/right-sidebar/LanguageSelector'
import { useMediaQuery } from 'react-responsive'
import { mobileDeviceOrTabletWidth } from '../../constants'
import MultiColorIcon from '../../assets/images/colored-icon.svg';
import Translate from '../../utils/translate/translateService'
import { Settings } from './Settings'


export const NavBar = () => {
  const [tab, setTab] = useState("");

  const getTabClass = (tabName: string) => {
    return tabName === tab ? 'bold col-auto h-100 flex center-item' : 'regular col-auto h-100 flex center-item';
  }

  const usePageViews = () => {
    let location = useLocation();
    useEffect(() => {
      setTab(location.pathname)
    }, [location]);
  }

  usePageViews()
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })
  return (
    <header className="App-header col-12 px-sm-2">
      <div className="App-title col-auto py-3 px-0 flex left">
        <Link to="/" className="flex">
          <img src={MultiColorIcon} width={23} height={23} alt="" />
          <div className="col-auto px-2" >SeroTracker</div>
        </Link>
      </div>
      <div className="App-tabs h-100 p-0 col-auto space-evenly">
        <div className={getTabClass('/Dashboard')}>
          <Link to="/Dashboard">
            {isMobileDeviceOrTablet ?
              <FontAwesomeIcon icon={faGlobeAmericas} size="lg" /> :
              Translate('Dashboard')}
          </Link>
        </div>
        <div className={getTabClass('/Data')}>
          <Link to="/Data">
            {isMobileDeviceOrTablet ?
              <FontAwesomeIcon icon={faFileAlt} size="lg" /> :
              Translate('Data')}
          </Link>
        </div>
        <div className={getTabClass('/About')}>
          <Link to="/About">
            {isMobileDeviceOrTablet ?
              <FontAwesomeIcon icon={faUsers} size="lg" /> :
              Translate('About')}
          </Link>
        </div>
        <div className={getTabClass('')}>
          <Settings />
        </div>
      </div>
    </header >
  )
}