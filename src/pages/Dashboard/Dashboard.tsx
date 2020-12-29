import React from 'react';
import { useTranslation } from 'react-multi-lang';

// Components
import { SideNav, TopNav } from '../../components/Nav/Nav';
import Analytics from '../../containers/Analytics/Analytics';

// Stylesheet
import './Dashboard.css';

export default (props: any) => {
  const t = useTranslation();

  const navList = [
    {
      icon: 'icon-analysis',
      name: t('analytics'),
      link: '/analytics',
    },
    {
      icon: 'icon-username-1',
      name: t('dealers'),
      link: '/dealers',
    },
    {
      icon: 'icon-time-1',
      name: t('watches'),
      link: '/watches',
    },
    {
      icon: 'icon-users',
      name: t('users'),
      link: '/users',
    },
    {
      icon: 'icon-notification-1',
      name: t('notifications'),
      link: '/notifications',
    },
  ];

  const dashboardContent = () => {
    const section = props.match.params.section
      ? props.match.params.section.toLowerCase()
      : '';
    switch (section) {
      case 'analytics':
        return <Analytics />;
      case 'dealers':
        return <>Dealers!</>;
      case 'watches':
        return <>Watches!</>;
      case 'users':
        return <>Users!</>;
      case 'notifications':
        return <>Notifications!</>;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-page">
      <SideNav list={navList} active={props.match.params.section} />
      <div className="main-side">
        <TopNav />

        <div className="content">{dashboardContent()}</div>
      </div>
    </div>
  );
};
