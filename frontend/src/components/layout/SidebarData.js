import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import LoginIcon from '@mui/icons-material/Login';
import BusinessIcon from '@mui/icons-material/Business';

export const SidebarData = [
  {
    title: 'Inicio',
    path: '/',
    icon: <HomeIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Login',
    path: '/login',
    icon: <LoginIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Empresa',
    path: '/empresa',
    icon: <BusinessIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Gestión sectores',
    path: '/sector',
    icon: <AssignmentIcon/>,
    cName: 'nav-text'
  },
  {
    title: 'Analisis horizontal',
    path: '/analisisHorizontal',
    icon: <DescriptionIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Analisis vertical',
    path: '/analisisVertical',
    icon: <DescriptionIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Informe ratios',
    path: '/informeRatios',
    icon: <DescriptionIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Graficar',
    path: '/graficar',
    icon: <AutoGraphIcon />,
    cName: 'nav-text'
  },
];