import { FormatDate } from '../../components';

/**
 * Render the PostInfo component.
 *
 * @param {Props} props The props object.
 * @param {Date} props.children The date input.
 * @param {string} props.author The author value.
 * @param {string} props.subTitle The subTitle value.
 * @param {string} props.className The css className value.
 *
 * @returns {React.ReactElement} The PostInfo component.
 */

export default function PostInfo({ date, author, subTitle, className }) {
  if (!date && !author && !subTitle) {
    return null;
  }

  return (
    <div className={className}>
      {date && (
        <time dateTime={date}>
          <FormatDate date={date} />
        </time>
      )}
      {date && author && <>&nbsp;</>}
      {author && <span>by {author}</span>}
      {subTitle && <span>{subTitle}</span>}
    </div>
  );
}
