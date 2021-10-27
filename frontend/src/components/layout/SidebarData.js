import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import InfoIcon from '@mui/icons-material/Info';

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
    title: 'Registrar información',
    path: '/información',
    icon: <InfoIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Gestión sectores',
    path: '/sector',
    icon: <AssignmentIcon/>,
    cName: 'nav-text'
  },
  {
    title: 'Gestión roles',
    path: '/rol',
    icon: <AssignmentIcon/>,
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
  {
    title: 'Graficar',
    path: '/graficar',
    icon: <AutoGraphIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Empresa',
    path: '/empresa',
    icon: <PersonIcon />,
    cName: 'nav-text'
  },
];