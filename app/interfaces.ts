// interfaces.ts
export interface Page {
  title: string;
  subheadline: string;
  slug: string;
}

// Define interfaces for your tables
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

// Add interfaces for other tables as needed
