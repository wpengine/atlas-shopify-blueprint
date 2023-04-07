import Link from 'next/link';

const CtaButton = ({ ctaLink = null, ctaLabel = null }) => {
  return (ctaLink && ctaLabel) ? (
    <div className='buttonContainer'>
      <Link href={ctaLink}>
        <a className='button'>{`${ctaLabel}`}</a>
      </Link>
    </div>
  ) : null;
};

export default CtaButton;
