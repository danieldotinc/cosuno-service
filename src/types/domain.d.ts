type Specialty = { _id: string; name: string };
type Company = { _id: string; name: string; city: string; specialties: Specialty[]; liked: boolean };
type User = { name: string; email: string; password: string };
