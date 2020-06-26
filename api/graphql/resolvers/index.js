import { mergeResolvers } from "merge-graphql-schemas";

import Invordering from "./Invordering";
import User from "./User";

const resolvers = [Invordering, User];

export default mergeResolvers(resolvers);