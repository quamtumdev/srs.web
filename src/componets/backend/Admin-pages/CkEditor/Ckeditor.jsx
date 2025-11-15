const Ckeditor = () => {
  return (
    <>
      <div className="header-wrapper">
        <h1>MathType editor</h1>
      </div>
      <div className="editor-wrapper">
        <div id="cke5-mathtype-demo">
          <p>
            In elementary algebra, the
            <strong>quadratic formula</strong>
            is the solution of the quadratic equation.
          </p>
          <p>
            <span
              className="ck-math-widget ck-widget"
              contentEditable="false"
            ></span>
          </p>
          <p>
            <strong>Water is made from two elements</strong>- Hydrogen and
            Oxygen. If you put the two gases together, along with energy, you
            can make water.
          </p>
          <p>
            <span
              className="ck-math-widget ck-widget"
              contentEditable="false"
            ></span>
          </p>
          <p>
            The entire formula for the surface area of a cylinder is&nbsp;
            <span
              className="ck-math-widget ck-widget ck-widget_selected"
              contentEditable="false"
            ></span>
          </p>
          <p>&nbsp;</p>
        </div>
      </div>
    </>
  );
};
export default Ckeditor;
