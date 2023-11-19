import { gql } from "../../deps.ts";

export const publish = gql`
  query publish($src: String, $token: String!) {
    publish(src: $src, token: $token)
  }
`;
