/**
 * Render the FormatDate component.
 *
 * @param {Props} props The props object.
 * @param {Date} props.date The date input.
 *
 * @returns {React.ReactElement} The FormatDate component.
 */

export default function FormatDate({ date }) {
  let formattedDate = new Date(date);

  if (isNaN(formattedDate.valueOf())) {
    return null;
  }

  const timeformat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: false,
  };

  return <>{formattedDate.toLocaleDateString('en-US', timeformat)}</>;
}
