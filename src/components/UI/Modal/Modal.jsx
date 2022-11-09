import Button from "../Button/Button";
import styles from "./Modal.module.css";

const Backdrop = ({ dismissModalHandler }) => {
  return <div className={styles["backdrop"]} onClick={dismissModalHandler} />;
};

const ModalOverlay = ({ title, message, dismissModalHandler }) => {
  return (
    <div className={`${styles["card"]} ${styles["modal"]}`}>
      <header className={styles["header"]}>
        <h2 className="text-2xl">{title}</h2>
      </header>
      <div className={`max-h-80 overflow-auto  ${styles["content"]}`}>
        <div>{message}</div>
      </div>
      <footer className={styles["actions"]}>
        <Button onClick={dismissModalHandler} autoFocus={true}>
          Dismiss
        </Button>
      </footer>
    </div>
  );
};

const Modal = ({ dismissModal, title, children }) => {
  const dismissHandler = () => {
    dismissModal(undefined);
  };
  return (
    <>
      <Backdrop dismissModalHandler={dismissHandler} />

      <ModalOverlay
        title={title}
        message={children}
        dismissModalHandler={dismissHandler}
      />
    </>
  );
};

export default Modal;
