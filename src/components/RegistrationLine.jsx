// A horizontal rule with registration marks at each end and a label on the right.
// Pass as="h2" when the label introduces the section that follows.
export default function RegistrationLine({ children, as: Label = 'span' }) {
  return (
    <div className="registration-line caption-2">
      <Label className="registration-line__label">{children}</Label>
    </div>
  );
}
