import React from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { AdminCrudPage } from './AdminCrudPage';
import { AdminSettings } from './AdminSettings';

export const AdminApp: React.FC = () => {
  const path = window.location.pathname.replace(/\/$/, '') || '/admin';
  if (path === '/admin/login') return <AdminLogin />;
  if (!localStorage.getItem('sipec_admin_session')) {
    window.location.replace('/admin/login');
    return null;
  }

  const routes: Record<string, React.ReactNode> = {
    '/admin': <AdminDashboard />,
    '/admin/dashboard': <AdminDashboard />,
    '/admin/departments': <AdminCrudPage table="departments" title="Départements" description="Créer, modifier et organiser les ministères de l’église." columns={[{key:'name',label:'Nom'},{key:'leader',label:'Responsable'},{key:'members',label:'Membres'},{key:'active',label:'Statut'}]} />,
    '/admin/gallery': <AdminCrudPage table="gallery" title="Galerie" description="Gérez les photos, vidéos et albums SIPEC." columns={[{key:'title',label:'Titre'},{key:'album',label:'Album'},{key:'type',label:'Type'},{key:'createdAt',label:'Date'}]} />,
    '/admin/sermons': <AdminCrudPage table="sermons" title="Prédications" description="Publiez les prédications et ressources vidéo." columns={[{key:'title',label:'Titre'},{key:'preacher',label:'Prédicateur'},{key:'date',label:'Date'},{key:'published',label:'Publication'}]} />,
    '/admin/live': <AdminCrudPage table="live" title="Live TV" description="Configurez la diffusion et les plateformes connectées." columns={[{key:'title',label:'Diffusion'},{key:'platform',label:'Plateformes'},{key:'status',label:'Statut'},{key:'startAt',label:'Début'}]} />,
    '/admin/events': <AdminCrudPage table="events" title="Événements" description="Planifiez les événements et rassemblements SIPEC." columns={[{key:'title',label:'Événement'},{key:'date',label:'Date'},{key:'location',label:'Lieu'},{key:'status',label:'Statut'}]} />,
    '/admin/users': <AdminCrudPage table="users" title="Utilisateurs" description="Gérez les comptes et permissions administratives." columns={[{key:'name',label:'Nom'},{key:'email',label:'Email'},{key:'role',label:'Rôle'},{key:'active',label:'Statut'}]} />,
    '/admin/settings': <AdminSettings />,
  };
  return routes[path] ?? <AdminDashboard />;
};
