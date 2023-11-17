export const ROLE = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const

type Resource = "USERS" | "PRODUCTS" | "ORDER"
type Action =
  | "DELETE"
  | "DELETE_ONE"
  | "UPDATE"
  | "UPDATE_ONE"
  | "CREATE"
  | "CREATE_ONE"
  | "READ"
  | "READ_ONE"

export type Permission = `${Resource}_${Action}`
