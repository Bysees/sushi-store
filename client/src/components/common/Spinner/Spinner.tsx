import styles from './spinner.module.css'
import appStyles from './../../../styles/app.module.scss'

const circles = [...Array(15).keys()].map((i) => i + 1)

const Spinner = () => (
  <div className={appStyles.spinner}>
    <div className={styles.circles}>
      {circles.map((num) => (
        <div key={num} className={styles[`circle${num}`]} />
      ))}
    </div>
  </div>
)

export default Spinner
