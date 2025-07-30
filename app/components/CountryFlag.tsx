// components/CountryFlag.tsx
'use client';

import React from 'react';
import countries from 'i18n-iso-countries';
import 'i18n-iso-countries/langs/en.json';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

type Props = {
    region: string; // e.g., "Germany"
};

export default function CountryFlag({ region }: Props) {
    const countryCode = countries.getAlpha2Code(region, 'en');

    if (!countryCode) return <span>🌐 Unknown Region</span>;

    const flagUrl = `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`; // flagcdn.com requires lowercase

    return (

        <img
            src={flagUrl}
            alt={`${region} flag`}
            width={40}
            height={30}
            style={{ borderRadius: '4px' }}
        />

    );
}
