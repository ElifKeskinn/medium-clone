import { signup } from '../login/actions'
import styles from '../login/page.css'

export default function SignupPage() {
  return (
    <form className={styles.form}>
      <label htmlFor="email" className={styles.label}>Email:</label>
      <input id="email" name="email" type="email" required className={styles.input} />
      
      <label htmlFor="username" className={styles.label}>Username:</label>
      <input id="username" name="username" type="text" required className={styles.input} />

      <label htmlFor="phone" className={styles.label}>Phone:</label>
      <input id="phone" name="phone" type="phone" required className={styles.input} />

      <label htmlFor="password" className={styles.label}>Password:</label>
      <input id="password" name="password" type="password" required className={styles.input} />
      
      <label htmlFor="confirmPassword" className={styles.label}>Confirm Password:</label>
      <input id="confirmPassword" name="confirmPassword" type="password" required className={styles.input} />

      <div>
    <legend class="legend">What are you interested in?</legend>
    <p class="subtitle">Choose three or more.</p>
    
    <div class="interest-container">
      <label class="checkbox-label">
        <input type="checkbox" name="interests" value="Programming" />
        <span>Programming</span>
      </label>

      <label class="checkbox-label">
        <input type="checkbox" name="interests" value="Data Science" />
        <span>Data Science</span>
      </label>

      <label class="checkbox-label">
        <input type="checkbox" name="interests" value="Technology" />
        <span>Technology</span>
      </label>

      <label class="checkbox-label">
        <input type="checkbox" name="interests" value="Self Improvement" />
        <span>Self Improvement</span>
      </label>

    </div>
  </div>


      <button formAction={signup} className={styles.button}>Sign up</button>
    </form>
  )
}
