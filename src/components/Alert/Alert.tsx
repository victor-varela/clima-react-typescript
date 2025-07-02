import type { ReactNode } from "react"
import styles from './Alert.module.css'

//recibe children como parametro, se declara el type en la misma funcion {children: ReactNode}

const Alert = ({children}: {children: ReactNode}) => {
  return (
    <div className={styles.alert}>{children}</div>
  )
}

export default Alert