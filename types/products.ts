// export type Product = {
//   id: number
//   name: string
//   image: string
//   description: string
//   categories: number[]
//   variants: string[]
//   sizes: string[]
// }

import { z } from "zod";

import { productSchema } from "../schemas/productSchema";

// to get the type FROM the ZOD validation
type ProductDTO = z.infer<typeof productSchema>;

// we are adding an ID because, when we validate the data we don't care about the id. why?? because IDs are handled by the database
export type Product = ProductDTO & { _id: string };

export type Category = {
  name: string;
};

export type Size = {
  name: string;
};
