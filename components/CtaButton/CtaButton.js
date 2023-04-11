import Link from 'next/link';

const CtaButton = ({ctaLink = null, ctaLabel = null }) => {
  return (
    <div className='buttonContainer'>
      <Link href={ctaLink}>
        <a className='button'>{ctaLabel}</a>
      </Link>
    </div>
  );
};

export default CtaButton;
