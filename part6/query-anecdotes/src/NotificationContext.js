import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch(action.type) {
    case "SET_NOTIFICATION":
      return action.payload
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const setNotification = (notification) => {
    notificationDispatch({type: 'SET_NOTIFICATION', payload: notification})
    setTimeout(() => {
      notificationDispatch({type: 'SET_NOTIFICATION', payload: null})
    }, 5000);
  }

  return(
    <NotificationContext.Provider value={[notification, notificationDispatch, setNotification]} >
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[2]
}

export default NotificationContext