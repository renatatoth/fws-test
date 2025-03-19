import { Contact } from './Contact.model';

export interface Project {
  id?: string;
  name: string;
  description: string;
  status: 'fejlesztésre vár' | 'folyamatban' | 'kész';
  contacts?: Contact[];
}
