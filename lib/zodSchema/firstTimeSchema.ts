import { z } from "zod";

export const firstTimeGuideSchema = z.object({
  profileURL: z.string().min(1, "Please provide a valid image"),
  phone: z
    .string()
    .length(10, "Must be exactly 10 digits")
    .regex(/^\d+$/, "Must only contain numbers"),
  hourlyRate: z
    .string()
    .length(2, "Must be exactly 2 digits")
    .regex(/^\d+$/, "Must only contain numbers"),
  bio: z.string().min(5, "Please write at least 5 character about yourself"),
  speciality: z
    .array(
      z.enum([
        "trekking",
        "climbing",
        "mountaineering",
        "culture",
        "wildlife",
        "first_aid",
        "rescue",
        "photography",
        "cycling",
        "rafting",
      ])
    )
    .min(1, "Please select at least one speciality"),
  languages: z
    .array(
      z.enum([
        "english",
        "nepali",
        "hindi",
        "spanish",
        "french",
        "german",
        "chinese",
        "japanese",
      ])
    )
    .min(1, "Please select at least one language"),
  certifications: z
    .array(
      z.enum([
        "wfa",
        "wfr",
        "nmga",
        "nma",
        "uiagm",
        "lnt",
        "cpr",
        "rock_instructor",
      ])
    )
    .min(1, "Please select at least one certifications"),
  experience: z.enum(
    ["0-1", "1-3", "3-5", "5-10", "10+"],
    "Please select one of the option for experience"
  ),
});

export const firstTimeCustomerSchema = firstTimeGuideSchema.omit({
  hourlyRate: true,
  speciality: true,
  certifications: true,
  experience: true,
});
