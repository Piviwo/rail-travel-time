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
      <div className="info-content">
        <h2>Dear traveller,</h2>
        <p>You have found your way to the "European Train Travel Times Map"! Travelling by train is one of the most
          sunstainable modes of travelling and we are happy to offer you this interactive map to efficiently explore your next
          travel possibilities. Simply choose your city of departure and city of destination from the drop-down menu on the 
          left and you will be shown the average travel time between both. As another option, choose your preferred travel time 
          durancy and you will be shown travel connections across Europe. <br />Happy and safe travels!</p>

        <h2>Authors</h2>
        <p>This interactive webmap was created in a group project in the framework of the lectures "Web Mapping" and "Multimedia Technqiues"
          in the summer semester 2024 at TU Wien. The members of the wonderful team are following:</p>
        <div className="image-container">
          <div className="image-wrapper">
            <img src="female-superhero-bicycle-cartoon-flat-vector-illustration-objects-background-69145396-809233407.jpg" alt="Pia - The Biking Webmap Hero" className="round-image" />
            <div className="caption"><b>Pia</b><br/>Biking Webmapper</div>
          </div>
          <div className="image-wrapper">
            <img src="confused-woman-working-laptop-cartoon-icon-illustration-people-technology-icon-concept_138676-2125-2135980697.jpg" alt="Bella - The GIS Queen" className="round-image" />
            <div className="caption"><b>Bella</b><br/>GIS Queen</div>
          </div>
          <div className="image-wrapper">
            <img src="2ea957492aef572e279447dc4855d675-3141371370.jpg" alt="Rica - The Creative Investigator" className="round-image" />
            <div className="caption"><b>Rica</b><br/>Smart Investigator</div>
          </div>
          <div className="image-wrapper">
            <img src="309-3092841_perry-the-platypus-song-perry-the-platypus-thumbs.jpeg" alt="Stef - The Platypus" className="round-image" />
            <div className="caption"><b>Stef</b><br/>The Platypus</div>
          </div>
        </div>

        <h2>Data source & license</h2>
        <p>
        <ul className="info-list">
          <li>Basemap: MapTiler API (License: OdbL)</li>
          <li>Train travel times:</li>
          <li>Train travel API:</li>
        </ul>

        </p>
      </div>

    </Modal>
  );
};

InfoModal.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};
