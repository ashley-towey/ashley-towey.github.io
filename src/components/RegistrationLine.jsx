// A horizontal rule with registration marks at each end and a label on the right.
// Pass as="h2" when the label introduces the section that follows. The label
// can hold anything, e.g. the home page's GRID / LIST toggle.
export default function RegistrationLine({ children, as: Label = 'span', className = '' }) {
  return (
    <div className={`registration-line caption-2 ${className}`.trim()}>
      <Label className="registration-line__label">{children}</Label>
    </div>
  );
}
