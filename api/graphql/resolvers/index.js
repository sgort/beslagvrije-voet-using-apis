import { mergeResolvers } from "merge-graphql-schemas";

import Invordering_banken from "./Invordering_banken";
import Invordering_wehkamp from "./Invordering_wehkamp";
import Invordering from "./Invordering";

const resolvers = [Invordering_banken, Invordering_wehkamp, Invordering];

export default mergeResolvers(resolvers);