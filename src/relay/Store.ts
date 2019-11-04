import { commitLocalUpdate } from "react-relay"
import { Environment } from 'relay-runtime'

export default function (modernEnvironment: Environment): Environment {
  commitLocalUpdate(modernEnvironment, store => {
    const
      fieldKey = "localUser",
      __typename = "LocalUser",
      dataID = `client:${__typename}`,
      record = store.create(dataID, __typename);

    record.setValue('123233', 'id')

    modernEnvironment.retain({
      dataID,
      // @ts-ignore
      node: { selections: [] },
      variables: {},
    })

    store.getRoot().setLinkedRecord(record, fieldKey)
  })

  return modernEnvironment;
}