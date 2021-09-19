import styles from './css/Schedule.module.css';
import { useParams } from 'react-router-dom';

const Schedule = () => {

    const {id} = useParams();

    return (
        <div className={styles.schedule}>
            <p className={styles.title}>Schedule</p>
        </div>
     );
}

export default Schedule;