export interface AdminUser { id: string; name: string; email: string; role: 'Super Admin' | 'Administrateur' | 'Éditeur'; active: boolean }
export interface AdminDepartment { id: string; name: string; leader: string; members: number; active: boolean }
export interface AdminGalleryItem { id: string; title: string; album: string; type: 'photo' | 'video'; url: string; createdAt: string }
export interface AdminSermon { id: string; title: string; preacher: string; date: string; published: boolean }
export interface AdminLiveStream { id: string; title: string; platform: string; status: 'live' | 'offline' | 'scheduled'; startAt: string }
export interface AdminEvent { id: string; title: string; date: string; location: string; status: 'published' | 'draft' }
