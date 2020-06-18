import { mergeResolvers } from "merge-graphql-schemas";

import Invordering_banken from "./Invordering_banken";
import Invordering_wehkamp from "./Invordering_wehkamp";

const resolvers = [Invordering_banken, Invordering_wehkamp];

export default mergeResolvers(resolvers);