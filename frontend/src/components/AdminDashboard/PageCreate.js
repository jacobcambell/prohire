import styles from './css/Pages.module.css';

const PageCreate = () => {
    return (
        <div className={styles.page}>
            <p className={styles.title}>Create Professional</p>

            <p className={styles.label}>Full Name</p>
            <input type="text" className={styles.field} />

            <p className={styles.label}>Location</p>
            <input type="text" className={styles.field} />

            <p className={styles.label}>Profession</p>
            <input type="text" className={styles.field} />

            <p className={styles.label}>Bio</p>
            <textarea className={styles.field}></textarea>

            <p className={styles.label}>Slug</p>
            <input type="text" className={styles.field} />

            <button className={styles.addBtn}>Create</button>
        </div>
     );
}

export default PageCreate;