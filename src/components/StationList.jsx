import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '../css/StationList.module.css';
import Bike from '../Icons/cargobike.svg';
import Trailer from '../Icons/trailer.svg';
import Checkbox from './Checkbox';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { ChevronCompactRight } from 'react-bootstrap-icons';

// Station list component
const StationList = ({ onStationSelected }) => {
  const stations = [
    {
      stationName: 'Ruskeasanta',
      cargoBike: true,
      trailer: true,
    },
    {
      stationName: 'Konala',
      cargoBike: false,
      trailer: true,
    },
    {
      stationName: 'Kivikko',
      cargoBike: true,
      trailer: false,
    },
    {
      stationName: 'Jorvas',
      cargoBike: false,
      trailer: true,
    },
    {
      stationName: 'Ämmässuo',
      cargoBike: true,
      trailer: true,
    },
    {
      stationName: 'Koivusuo',
      cargoBike: true,
      trailer: false,
    },
  ];

  // array of states to track checkbox status for each station
  const [isChecked, setIsChecked] = useState(stations.map(() => false));

  const navigate = useNavigate();

  // handle the button click for selecting a station
  const handleSubmit = () => {
    if (isChecked.some((checked) => checked)) {
      onStationSelected();
    } else {
      alert('Valitse vähintään yksi asema ennen kuin jatkat.');
    }
  };

  const frontPage = () => {
    if (confirm('Oletko varma?')) {
      navigate('/', { replace: true });
    }
  };

  // handling the checkbox changes for a specific station
  const handleCheckbox = (index) => {
    const updatedChecked = [...isChecked];
    updatedChecked[index] = !updatedChecked[index];
    setIsChecked(updatedChecked);
  };

  return (
    <div className={styles.listContainer}>
      <ListGroup variant="flush" className={styles.listElement}>
        {stations.map((station, index) => (
          <ListGroup.Item key={station.stationName}>
            <div className={styles.listitemContainer}>
              <p className={styles.stationName}>{station.stationName}</p>
              <div className={styles.rowContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                  style={{
                    marginRight: '4px',
                    width: '17px',
                    height: '24px',
                    fill: '#AF3F32',
                  }}
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
                <p id={styles.kilometers}>10km</p>
                {station.cargoBike && (
                  <img
                    src={Bike}
                    alt="cargo bike icon"
                    id={styles.cargobike}
                    draggable={false}
                  />
                )}
                {station.trailer && (
                  <img
                    src={Trailer}
                    alt="trailer icon"
                    id={styles.trailer}
                    draggable={false}
                  />
                )}
                <Checkbox
                  onChange={() => handleCheckbox(index)}
                  value="station"
                  checked={isChecked[index]}
                  isRequired={false}
                  id={styles.stationCheckbox}
                  className={styles.stationCheckboxContainer}
                ></Checkbox>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className={styles.buttonsContainer}>
        <Button variant="outline-danger" onClick={frontPage}>
          Peruuta
        </Button>
        <Button size="lg" id="date-button" onClick={handleSubmit}>
          Valitse päivämäärä
          <ChevronCompactRight />
        </Button>
      </div>
    </div>
  );
};

StationList.propTypes = {
  onStationSelected: PropTypes.func.isRequired,
};

export default StationList;
