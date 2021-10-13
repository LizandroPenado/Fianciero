import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Login',
    path: '/login',
    icon: <PersonIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Cuenta',
    path: '/cuenta',
    icon: <PersonIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Analisis vertical',
    path: '/analisisVertical',
    icon: <DescriptionIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Analisis horizontal',
    path: '/analisisHorizontal',
    icon: <DescriptionIcon />,
    cName: 'nav-text'
  },
];