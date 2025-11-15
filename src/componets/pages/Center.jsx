import FeaturesCenter from "../Center-UI/FeaturesCenter";
import Ias from "../Center-UI/Ias";
import { SrsEducare } from "../why-srs-educare/SrsEducare";
import "../../custom.css";
function Center() {
  return (
    <div>
      <section className="mb-center-section">
        <FeaturesCenter />
        <Ias />
        <section className="mt-center-why-choose">
          <SrsEducare />
        </section>
      </section>
    </div>
  );
}

export default Center;
