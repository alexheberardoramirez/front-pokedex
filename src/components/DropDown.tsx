import Dropdown from 'react-bootstrap/Dropdown';

function DropDown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
        Skills
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>Action</Dropdown.Item>
        <Dropdown.Item>Another action</Dropdown.Item>
        <Dropdown.Item>Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;