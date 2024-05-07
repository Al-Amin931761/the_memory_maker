import { Modal } from "react-bootstrap";

const ReusableModal = ({
  size = "",
  modalShow,
  setModalShow,
  modalTitle,
  modalBody,
}) => {
  return (
    <div>
      <Modal
        size={size}
        backdrop="static"
        keyboard={false}
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="common-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title
            data-aos="fade-down"
            data-aos-duration="1000"
            className="second-font"
            id="common-modal"
          >
            {modalTitle}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body data-aos="fade-down" data-aos-duration="1000">
          {modalBody}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReusableModal;
