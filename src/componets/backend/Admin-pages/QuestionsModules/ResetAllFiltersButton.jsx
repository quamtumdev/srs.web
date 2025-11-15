/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";

const ResetAllFiltersButton = ({ onResetFilters }) => {
  return (
    <Button variant="secondary" onClick={onResetFilters}>
      Reset All Filters
    </Button>
  );
};

export default ResetAllFiltersButton;
