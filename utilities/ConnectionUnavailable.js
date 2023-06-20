import React from 'react';
import Link from 'next/link';

const ConnectionUnavailable = () => {
  return (
    <>
      <p style={{ padding: '20px' }}>
        To get started connecting your Shopify store, please make sure your
        Headless Public Access Token and GraphQL URL are added as Atlas environment variables.
        For more information, see <Link href='https://developers.wpengine.com/docs/atlas-shopify-blueprint/introduction'>
          our documentation
        </Link>.
      </p>
    </>
  );
};

export default ConnectionUnavailable;
