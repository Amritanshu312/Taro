import { Fragment } from "react"
import Categorys from "./Categorys"

const Statistics = ({ user, lists }) => {
  return (
    <div className="mt-4">
      <Categorys user={user} lists={lists} />

      
    </div>
  )
}

export default Statistics