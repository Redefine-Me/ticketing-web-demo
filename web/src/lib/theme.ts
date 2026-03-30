export const colors = {
  primary: {
    100: '#FDEAE8',
    200: '#F9C5C1',
    300: '#F49F99',
    400: '#E06B62',
    500: '#C04138',
    600: '#9C332C',
    700: '#782620',
    800: '#541A16',
    900: '#300F0D',
  },
  secondary: {
    100: '#FFF0E8',
    200: '#FFD5BC',
    300: '#FFBA90',
    400: '#FE9364',
    500: '#FC6C38',
    600: '#E0561F',
    700: '#B84418',
    800: '#903311',
    900: '#68230B',
  },
  categoryColors: [
    '#F05247', // Red
    '#3B82F6', // Blue
    '#22C55E', // Green
    '#F59E0B', // Amber
    '#8B5CF6', // Purple
    '#14B8A6', // Teal
  ],
} as const;

export const categoryMeta: Record<string, { icon: string; color: string; description: string }> = {
  academic: { icon: 'IoSchool', color: '#F05247', description: 'Guest lectures, study groups, and intellectual discussions' },
  arts: { icon: 'IoColorPalette', color: '#3B82F6', description: 'Exhibitions, performances, and creative workshops' },
  career: { icon: 'IoBriefcase', color: '#22C55E', description: 'Networking, workshops, and industry talks' },
  charity: { icon: 'IoHeart', color: '#F59E0B', description: 'Fundraisers, volunteering, and community events' },
  cultural: { icon: 'IoGlobe', color: '#8B5CF6', description: 'Cultural showcases, food festivals, and heritage events' },
  film: { icon: 'IoFilm', color: '#14B8A6', description: 'Screenings, film festivals, and discussions' },
  'food & drink': { icon: 'IoRestaurant', color: '#F05247', description: 'Culinary adventures, tastings, and dining experiences' },
  hackathon: { icon: 'IoLaptop', color: '#3B82F6', description: 'Coding challenges and innovation sprints' },
  music: { icon: 'IoMusicalNotes', color: '#22C55E', description: 'Open-mic nights, live gigs, and concerts' },
  outdoor: { icon: 'IoCompass', color: '#F59E0B', description: 'Hikes, adventures, and outdoor activities' },
  quiz: { icon: 'IoHelpCircle', color: '#8B5CF6', description: 'Pub quizzes and trivia nights' },
  social: { icon: 'IoPeople', color: '#14B8A6', description: 'Meet friends, socials, and community gatherings' },
  sports: { icon: 'IoFootball', color: '#F05247', description: 'Intramural leagues, pick-up games, and fitness' },
  sustainability: { icon: 'IoLeaf', color: '#3B82F6', description: 'Eco events and green initiatives' },
  tech: { icon: 'IoConstruct', color: '#22C55E', description: 'Tech talks, product design, and industry meetups' },
  trip: { icon: 'IoAirplane', color: '#F59E0B', description: 'Day trips and weekend adventures' },
  wellbeing: { icon: 'IoFitness', color: '#8B5CF6', description: 'Mindfulness, wellness, and self-care events' },
  workshop: { icon: 'IoHammer', color: '#14B8A6', description: 'Hands-on sessions and skill-building workshops' },
};
