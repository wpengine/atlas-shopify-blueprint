import Link from 'next/link';

const CtaButton = ({ showCta = false, ctaLink = null, ctaLabel = null }) => {
  return showCta ? (
    <div className='buttonContainer'>
      <Link href={ctaLink}>
        <a className='button'>{`${ctaLabel}`}</a>
      </Link>
    </div>
  ) : null;
};

export default CtaButton;
