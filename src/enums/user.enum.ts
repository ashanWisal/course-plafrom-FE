export const UserRole = {
  LEARNER: "learner",
  MENTOR: "mentor",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];