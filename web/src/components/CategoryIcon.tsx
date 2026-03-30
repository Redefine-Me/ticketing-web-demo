'use client';

import {
  IoSchool,
  IoColorPalette,
  IoBriefcase,
  IoHeart,
  IoGlobe,
  IoFilm,
  IoRestaurant,
  IoLaptop,
  IoMusicalNotes,
  IoCompass,
  IoHelpCircle,
  IoPeople,
  IoFootball,
  IoLeaf,
  IoConstruct,
  IoAirplane,
  IoFitness,
  IoHammer,
} from 'react-icons/io5';
import { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
  IoSchool,
  IoColorPalette,
  IoBriefcase,
  IoHeart,
  IoGlobe,
  IoFilm,
  IoRestaurant,
  IoLaptop,
  IoMusicalNotes,
  IoCompass,
  IoHelpCircle,
  IoPeople,
  IoFootball,
  IoLeaf,
  IoConstruct,
  IoAirplane,
  IoFitness,
  IoHammer,
};

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}
