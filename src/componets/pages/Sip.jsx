import ExamPrep from "../SIP-UI/ExamPrep";
import Features from "../SIP-UI/Features";
import SipAdv from "../SIP-UI/SipAdv";
import "../../custom.css";
import { SrsEducare } from "../why-srs-educare/SrsEducare";
const Sip = () => {
  return (
    <>
      <section className="mb-center-section">
        <ExamPrep />
        <SipAdv />

        <Features />
        <section className="mt-5 pt-5 ">
          <SrsEducare />
        </section>
      </section>
    </>
  );
};

export default Sip;
