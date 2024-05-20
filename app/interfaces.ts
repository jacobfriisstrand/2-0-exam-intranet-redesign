export interface Page {
  title: string;
  subheadline: string;
  slug: string;
}

export interface Profile {
  id: number;
  full_name: string;
  current_position: string;
  studio_location: string;
  avatar_url: string;
  email: string;
  phone: string;
  skills?: string;
  birthday: Date;
}

export interface Article {
  id: number;
  created_at: Date;
  slug: string;
  author_id: {
    full_name: string;
    avatar_url: string;
  };
  title: string;
  content: string;
}

export interface File {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  metadata: {
    size: 1042157;
    mimetype: string;
    lastModified: string;
  };
}

export interface SingleLineItem {
  id: number;
  service: string;
  username: string;
  password: string;
  purpose: string;
}
