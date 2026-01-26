import { z } from "zod";

export const paymentSchema = z
  .object({
    date: z.string("Please enter a date").min(1, "Please select a valid date"),
    time: z
      .string("Please select the start time")
      .min(1, "Please select the start time"),
    location: z.string("Please enter string").min(1, "please enter the data"),
    meetup_location: z.object({
      type: z.enum(["Point"]),
      coordinates: z.tuple(
        [z.number(), z.number()],
        "Meetup location not set properly!",
      ),
    }),
    duration: z.string("please enter duration data"),
  })
  .refine(
    (data) =>
      data.meetup_location.coordinates[0] !== 0 &&
      data.meetup_location.coordinates[1] !== 0,
    {
      message: "Please set a correct location!",
      path: ["meetup_location"],
    },
  );

//9806754495
