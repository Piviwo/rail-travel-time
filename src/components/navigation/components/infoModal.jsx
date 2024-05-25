import "./infoModal.css";
import { Modal } from "antd";
import PropTypes from "prop-types";

export const InfoModal = ({ isOpened, onCancel }) => {
  return (
    <Modal
      footer={null}
      open={isOpened}
      onCancel={onCancel}
      destroyOnClose={true}
    >
      Here will be Information about our wonderful team
    </Modal>
  );
};

InfoModal.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};
