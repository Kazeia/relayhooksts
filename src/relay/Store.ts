import { commitLocalUpdate } from "react-relay"
import { Environment } from 'relay-runtime'

// TODO: Should we extend it from serverschema?
export default function (modernEnvironment: Environment): Environment {
  commitLocalUpdate(modernEnvironment, store => {
    const root = store.getRoot(),
      localUser = store.create('ID0001', 'LocalUser')
    localUser.setValue(null, 'id')
      .setValue(null, 'fullName')
      .setValue(null, 'email')
      .setValue(null, 'dateOfBirth')
      .setValue(null, 'gender')
      .setValue(null, 'profileURL')
      .setValue(null, 'biography')
      .setValue(null, 'role')
      .setValue(null, 'cartQty')
      .setValue(null, 'coursesIdInCart')
      .setValue(null, 'acquiredIdCourses')
    root.setLinkedRecord(localUser, 'localUser')
  })

  modernEnvironment.retain({
    dataID: 'ID0001',
    variables: {},
    // @ts-ignore
    node: { selections: [] },
  })

  return modernEnvironment
}