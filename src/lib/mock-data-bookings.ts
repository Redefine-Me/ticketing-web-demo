import type { Booking } from "./supabase/types";

export function findVenue(id: string) {
  return nonUniversityVenues.find((v) => v.id === id);
}

export function isUniversityBuilding(id: string): boolean {
  return universityBuildings.some((b) => b.id === id);
}

const universityBuildings = [
  { id: "b-001", name: "Students' Union" },
  { id: "b-002", name: "University Place" },
  { id: "b-003", name: "Samuel Alexander Building" },
  { id: "b-005", name: "Roscoe Building" },
  { id: "b-020", name: "Kilburn Building" },
  { id: "b-021", name: "Alan Turing Building" },
];

const nonUniversityVenues = [
  { id: "v-001", name: "Kro Bar", phone: "0161 274 3100", website: "https://www.kro.co.uk", description: "Independent bar and kitchen on Oxford Road." },
  { id: "v-006", name: "256 Wilmslow Road", phone: "0161 248 0256", website: "https://www.256.com", description: "Student bar and venue in Fallowfield." },
  { id: "v-009", name: "Armitage Sports Centre", phone: "0161 275 4960", website: "https://www.sport.manchester.ac.uk", description: "UoM sports centre in Fallowfield." },
  { id: "v-010", name: "Bierkeller Manchester", phone: "0161 839 0845", website: "https://www.bierkeller.com/manchester", description: "Bavarian-themed bar in The Printworks." },
  { id: "v-011", name: "Platt Fields Park", phone: "0161 224 2902", website: "https://www.manchester.gov.uk/plattfields", description: "Public park in Fallowfield with cricket pitches." },
];

export const mockBookings: Booking[] = [];

export const mockAvailability: Record<string, { date: string; startTime: string; endTime: string; status: string; bookedBy?: string }[]> = {};
