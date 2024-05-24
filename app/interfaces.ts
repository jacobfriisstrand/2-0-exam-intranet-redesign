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
    size: number;
    mimetype: string;
    lastModified: string;
  };
}

export interface SharedLoginItem {
  id: number;
  service: string;
  username: string;
  password: string;
  purpose: string;
}

export interface DiscountsAndOffersItem {
  id: number;
  company: string;
  discount_code: string;
  info: string;
  expires_at: Date;
  author_id: {
    full_name: string;
  };
}

export interface Absence {
  id: number;
  start_date: Date;
  end_date: Date;
  reason: string;
  created_at: Date;
  updated_at: Date;
  user_id: {
    full_name: string;
  };
}

export interface MenuItem {
  day: string;
  id: string;
  location: {
    mainDish: string;
    veganDish: string;
  };
}
