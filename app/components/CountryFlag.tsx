'use client';

import React, { useEffect, useState } from 'react';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

// Ensure the locale is registered once
if (!countries.getAlpha2Code('Germany', 'en')) {
  countries.registerLocale(enLocale);
}

type Props = {
  region: string; // e.g., "Germany"
};

export default function CountryFlag({ region }: Props) {
  const [countryCode, setCountryCode] = useState<string | null>(null);

  useEffect(() => {
    const code = countries.getAlpha2Code(region, 'en');
    setCountryCode(code || null);
  }, [region]);

  if (!countryCode) {
    return <span title={region}>🌐</span>; // fallback if region not found
  }

  const flagUrl = `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;

  return (
    <img
      src={flagUrl}
      alt={`${region} flag`}
      width={40}
      height={30}
      style={{ borderRadius: '4px' }}
      loading="lazy"
    />
  );
}
