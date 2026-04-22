export default function BlockScreen({ show }) {
  if (!show) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <h3>Loading...</h3>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  box: {
    background: "#fff",
    padding: "20px 40px",
    borderRadius: "10px",
  },
};