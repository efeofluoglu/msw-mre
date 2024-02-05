import { HttpResponse, graphql } from "msw";
import { GET_PRODUCTS } from "../gql";
import { mockProducts } from "./data";

export const productsResponseHandler = graphql.query(GET_PRODUCTS, () =>
  HttpResponse.json(mockProducts)
);