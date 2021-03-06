import { useParams } from 'react-router-dom';
import styles from './Schedule.module.scss';

const Schedule = () => {

    const { id } = useParams();

    return (
        <div className={styles.schedule}>
            <p className={styles.title}>Schedule</p>
        </div>
    );
}

export default Schedule;