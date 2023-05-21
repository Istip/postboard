import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className="w-100 h-96 overflow-hidden flex flex-wrap flex-col items-center justify-center">
      <div className="text-yellow-500 font-bold text-2xl">POSTBOARD</div>
      <div className={styles.loading}>
        <div />
      </div>
      <div className="text-yellow-500 font-bold text-sm">Loading</div>
    </div>
  );
}
