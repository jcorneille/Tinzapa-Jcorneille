import React from 'react';
import { Banknote, Check, Sparkles } from 'lucide-react';
import { PaymentMethod, PaymentMethodConfig } from '../types';

export type PaymentCurrencyChoice = 'CDF' | 'USD';

export interface PaymentMethodButtonsProps {
  selectedMethod: PaymentMethod;
  selectedCurrency: PaymentCurrencyChoice;
  onSelect: (method: PaymentMethod, currency: PaymentCurrencyChoice) => void;
  paymentMethodsConfig?: Partial<Record<PaymentMethod, PaymentMethodConfig>>;
  includeCash?: boolean;
  includeLoyalty?: boolean;
  loyaltyPointsCost?: number;
  loyaltyDisabled?: boolean;
  loyaltyHint?: string;
}

interface MobileMoneyProviderMeta {
  method: 'AIRTEL_MONEY' | 'MPESA' | 'ORANGE_MONEY';
  label: string;
  logoSrc: string;
  logoBgClass: string;
  imgClass: string;
}

const MOBILE_MONEY_PROVIDERS: MobileMoneyProviderMeta[] = [
  {
    method: 'AIRTEL_MONEY',
    label: 'Airtel Money',
    logoSrc: '/assets/aistudio/airtel-money_43269716.png',
    logoBgClass: 'bg-white p-0.5',
    imgClass: 'w-full h-full object-contain',
  },
  {
    method: 'MPESA',
    label: 'M-Pesa',
    logoSrc: '/assets/aistudio/M-pesa-logo_a0e3823e.png',
    logoBgClass: 'bg-white p-0.5',
    imgClass: 'w-full h-full object-contain',
  },
  {
    method: 'ORANGE_MONEY',
    label: 'Orange Money',
    logoSrc: '/assets/aistudio/orange-money_b6e691a6.png',
    logoBgClass: 'bg-[#151c24]',
    imgClass: 'w-full h-full object-cover scale-110',
  },
];

const CurrencyPill: React.FC<{ currency: PaymentCurrencyChoice }> = ({ currency }) =>
  currency === 'USD' ? (
    <span className="absolute -top-1.5 -right-2 z-20 px-1 py-0.25 rounded-full text-[8px] font-bold leading-none tracking-tight bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-xs whitespace-nowrap">
      USD
    </span>
  ) : (
    <span className="absolute -top-1.5 -right-2 z-20 px-1 py-0.25 rounded-full text-[8px] font-bold leading-none tracking-tight bg-sky-100 text-sky-700 border border-sky-200 shadow-xs whitespace-nowrap">
      CDF
    </span>
  );

export const PaymentMethodButtons: React.FC<PaymentMethodButtonsProps> = ({
  selectedMethod,
  selectedCurrency,
  onSelect,
  paymentMethodsConfig,
  includeCash = false,
  includeLoyalty = false,
  loyaltyPointsCost = 0,
  loyaltyDisabled = false,
  loyaltyHint,
}) => {
  const isEnabled = (method: PaymentMethod) =>
    paymentMethodsConfig?.[method]?.enabled !== false;

  const visibleMomoProviders = MOBILE_MONEY_PROVIDERS.filter((p) => isEnabled(p.method));
  const showCashCDF = includeCash && isEnabled('CASH_CDF');
  const showCashUSD = includeCash && isEnabled('CASH_USD');
  const showLoyalty = includeLoyalty;

  const renderBareButtonClasses = (disabled = false) =>
    `group relative shrink-0 bg-transparent border-0 p-0 flex items-center justify-center transition-transform select-none ${
      disabled ? 'opacity-45 cursor-not-allowed' : 'cursor-pointer hover:scale-105'
    }`;

  const renderIconRing = (active: boolean) =>
    active
      ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-900 shadow-md shadow-cyan-500/30'
      : 'ring-1 ring-white/15 group-hover:ring-cyan-400/70 shadow-sm';

  return (
    <div className="flex items-center flex-nowrap gap-2.5 overflow-x-auto py-2 px-1">
      {showCashCDF && (
        <button
          type="button"
          aria-label="Espèces FC"
          title="Espèces FC"
          aria-pressed={selectedMethod === 'CASH_CDF'}
          onClick={() => onSelect('CASH_CDF', 'CDF')}
          className={renderBareButtonClasses()}
        >
          <div
            className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 ${renderIconRing(
              selectedMethod === 'CASH_CDF'
            )}`}
          >
            {selectedMethod === 'CASH_CDF' && (
              <span className="absolute -top-1.5 -left-1.5 z-20 w-3.5 h-3.5 rounded-full bg-cyan-600 text-white flex items-center justify-center shadow">
                <Check className="w-2 h-2" strokeWidth={3} />
              </span>
            )}
            <CurrencyPill currency="CDF" />
            <Banknote className="w-5 h-5" />
          </div>
        </button>
      )}

      {showCashUSD && (
        <button
          type="button"
          aria-label="Espèces USD"
          title="Espèces USD"
          aria-pressed={selectedMethod === 'CASH_USD'}
          onClick={() => onSelect('CASH_USD', 'USD')}
          className={renderBareButtonClasses()}
        >
          <div
            className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 ${renderIconRing(
              selectedMethod === 'CASH_USD'
            )}`}
          >
            {selectedMethod === 'CASH_USD' && (
              <span className="absolute -top-1.5 -left-1.5 z-20 w-3.5 h-3.5 rounded-full bg-cyan-600 text-white flex items-center justify-center shadow">
                <Check className="w-2 h-2" strokeWidth={3} />
              </span>
            )}
            <CurrencyPill currency="USD" />
            <Banknote className="w-5 h-5" />
          </div>
        </button>
      )}

      {visibleMomoProviders.map((provider) => {
        const isSelected =
          selectedMethod === provider.method && selectedCurrency === 'USD';
        return (
          <button
            key={`${provider.method}-USD`}
            type="button"
            aria-label={`${provider.label} USD`}
            title={`${provider.label} USD`}
            aria-pressed={isSelected}
            onClick={() => onSelect(provider.method, 'USD')}
            className={renderBareButtonClasses()}
          >
            <div className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${renderIconRing(isSelected)}`}>
              {isSelected && (
                <span className="absolute -top-1.5 -left-1.5 z-20 w-3.5 h-3.5 rounded-full bg-cyan-600 text-white flex items-center justify-center shadow">
                  <Check className="w-2 h-2" strokeWidth={3} />
                </span>
              )}
              <CurrencyPill currency="USD" />
              <div className={`w-full h-full rounded-xl overflow-hidden flex items-center justify-center ${provider.logoBgClass}`}>
                <img
                  src={provider.logoSrc}
                  alt={`${provider.label} USD`}
                  className={provider.imgClass}
                />
              </div>
            </div>
          </button>
        );
      })}

      {visibleMomoProviders.map((provider) => {
        const isSelected =
          selectedMethod === provider.method && selectedCurrency === 'CDF';
        return (
          <button
            key={`${provider.method}-CDF`}
            type="button"
            aria-label={`${provider.label} FC`}
            title={`${provider.label} FC`}
            aria-pressed={isSelected}
            onClick={() => onSelect(provider.method, 'CDF')}
            className={renderBareButtonClasses()}
          >
            <div className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${renderIconRing(isSelected)}`}>
              {isSelected && (
                <span className="absolute -top-1.5 -left-1.5 z-20 w-3.5 h-3.5 rounded-full bg-cyan-600 text-white flex items-center justify-center shadow">
                  <Check className="w-2 h-2" strokeWidth={3} />
                </span>
              )}
              <CurrencyPill currency="CDF" />
              <div className={`w-full h-full rounded-xl overflow-hidden flex items-center justify-center ${provider.logoBgClass}`}>
                <img
                  src={provider.logoSrc}
                  alt={`${provider.label} FC`}
                  className={provider.imgClass}
                />
              </div>
            </div>
          </button>
        );
      })}

      {showLoyalty && (
        <button
          type="button"
          disabled={loyaltyDisabled}
          aria-label="Points Fidélité"
          aria-pressed={selectedMethod === 'LOYALTY_POINTS'}
          onClick={() => {
            if (!loyaltyDisabled) onSelect('LOYALTY_POINTS', 'CDF');
          }}
          className={renderBareButtonClasses(loyaltyDisabled)}
          title={loyaltyHint || 'Points Fidélité'}
        >
          <div
            className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 ${renderIconRing(
              selectedMethod === 'LOYALTY_POINTS'
            )}`}
          >
            {selectedMethod === 'LOYALTY_POINTS' && (
              <span className="absolute -top-1.5 -left-1.5 z-20 w-3.5 h-3.5 rounded-full bg-cyan-600 text-white flex items-center justify-center shadow">
                <Check className="w-2 h-2" strokeWidth={3} />
              </span>
            )}
            <span className="absolute -top-1.5 -right-2 z-20 px-1 py-0.25 rounded-full text-[8px] font-bold leading-none bg-amber-100 text-amber-800 border border-amber-200 shadow-xs whitespace-nowrap">
              {loyaltyPointsCost}p
            </span>
            <Sparkles className="w-5 h-5" />
          </div>
        </button>
      )}
    </div>
  );
};
