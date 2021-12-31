import { graphqlOperation } from "aws-amplify";
import API from "@aws-amplify/api";
import {
  createReaction,
  deleteReaction,
} from "../../graphql-custom/post/mutation";

const updateReaction = async ({
  item,
  setIsReacted,
  isReacted,
  createReactionInput,
  deleteReactionInput,
}) => {
  if (!isReacted) {
    item.totals.reactions += 1;
  } else {
    item.totals.reactions -= 1;
  }
  setIsReacted(!isReacted);
  if (!isReacted) {
    await API.graphql(
      graphqlOperation(createReaction, {
        input: {
          ...createReactionInput,
        },
      })
    );
  } else {
    await API.graphql(
      graphqlOperation(deleteReaction, {
        input: {
          ...deleteReactionInput,
        },
      })
    );
  }
};
export default updateReaction;
