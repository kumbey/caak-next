// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { graphqlOperation } from "@aws-amplify/api-graphql"
import { withSSRContext } from "aws-amplify";
import { listGroupByUserAndRole } from "../../../src/graphql-custom/GroupUsers/queries";
import { getReturnData } from "../../../src/utility/Util";


export default async function handler(req, res) {
    const { Auth, API } = withSSRContext({ req });
    const user = await Auth.currentAuthenticatedUser()
    const { role } = req.query
    const groups = []

    let resp = await API.graphql(graphqlOperation(listGroupByUserAndRole, {user_id: user.attributes.sub, role: {eq: role}}))
    resp = getReturnData(resp).items
    
    resp.map((group) => {
        groups.push(group.group)
    })

    res.status(200).json(groups)
}
  