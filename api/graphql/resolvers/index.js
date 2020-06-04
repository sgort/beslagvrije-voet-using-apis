import { mergeResolvers } from "merge-graphql-schemas";

import Invordering from "./Invordering";

const resolvers = [Invordering];

export default mergeResolvers(resolvers);